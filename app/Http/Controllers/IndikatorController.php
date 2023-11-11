<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Request;
use App\Models\Indikator;
use App\Models\Satuan;
use App\Models\Level;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\IndikatorRequest;
use App\Http\Requests\IndikatorPicRequest;
use App\Http\Resources\IndikatorResource;
use App\Http\Requests\IndikatorKompositorRequest;
use App\Models\IndikatorKompositor;
use Illuminate\Support\Facades\DB;

class IndikatorController extends Controller //implements ICrud
{
    //
    public function create(Request $request) {
        return Inertia::render('Indikator/FormIndikator', [
            'satuans' => \App\Models\Satuan::all(),
            'levels' => \App\Models\Level::all(),
            //'indikator_kompositors' => \App\Models\IndikatorKompositor::all(),
            'parents' => Indikator::query()
                ->whereIn('level_id',['1','2','3'])
                ->get(),
            'pics' => \App\Models\PIC::all()
        ]);
    }

    
    public function index():Response {
        
        return Inertia::render('Indikator/ListIndikator', [
            'filter' => Request::all('search', 'level'),
            'indikators' => 
                /*Indikator::query()                
                    ->when(Request::input('search'), function($query, $search){
                        $query->where('nama_indikator','like', "%{$search}%");
                    })                    
                    ->paginate(10)
                    ->withQueryString()*/
                Indikator::query()->with('indikatorPics')                
                    ->when(Request::input('search'), function($query, $search){
                        $query->where('nama_indikator','like', "%{$search}%");
                    })
                    ->addSelect(['nama_satuan' => Satuan::select('nama_satuan')
                            ->whereColumn('id','indikator.satuan_id')])
                    ->addSelect(['nama_level' => Level::select('nama_level')
                            ->whereColumn('id','indikator.level_id')])                            
                    ->paginate(10),
                    //->withQueryString(),
                'opt_filter' => ['1' => 'Nama', '2' => 'Level']
                ]);
    }

    public function update(Indikator $indikator, IndikatorRequest $request) {
        $request->validate(['pics' => ['required']]);
        $indikator->update(
            $request->validated()
        );
        $pics = $request->input('pics');
        if(is_array($pics)){
            DB::table('indikator_pic')
                    ->where('indikator_id', '=', $indikator->id)
                    ->delete();
            foreach($pics as $pic){
                $data = ['indikator_id' => $indikator->id,
                    'pic_id' => $pic['value'],
                    'nama_pic' => $pic['label']];
                DB::table('indikator_pic')->insert($data);
            }        
        }
        return Redirect::route('indikator.index')->with('success', 'Indikator updated.');
    }

    public function destroy(Indikator $indikator) {
        //$ind_pic = $indikator->indikatorPics();
        foreach ($indikator->indikatorPics as $pic) {
            $pic->delete();
        }
        $indikator->delete();
        return Redirect::route('indikator.index')->with('success', 'Indikator deleted!');
    }

    public function edit(Indikator $indikator) {
        return Inertia::render('Indikator/EditIndikator', [
            'indikator' => new IndikatorResource($indikator),
            'satuans' => \App\Models\Satuan::all(),
            'levels' => \App\Models\Level::all(),
            'parents' => Indikator::query()
                ->whereIn('level_id',['1','2','3'])
                ->get(),
            'indikator_kompositors' => IndikatorKompositor::query()
                ->where('indikator_id', '=', $indikator->id)
                ->get(),
            'pics' => \App\Models\PIC::all(),
            'def_pics' => ($this->getPics($indikator))
        ]);
    }
    
    function getPics($indikator) {
        //$indikator_kompositor = \App\Models\Indikator::where('id', $indikator->indikator_kompositor_id)->first();
        $temp_res = DB::table('indikator')
                ->join('indikator_pic', 'indikator.id', '=', 'indikator_pic.indikator_id')
                ->where('indikator.id', '=', $indikator->id)
                ->select('indikator_pic.*')
                ->get();
        $def_pics = []; $i=0;
        foreach ($temp_res as $row) {
            $def_pics[$i] = ['value' => $row->pic_id, 'label' => $row->nama_pic];
            $i++;
        }
        return $def_pics;
    }

    public function store(IndikatorRequest $request) {
        $request->validate(['pics' => ['required']]);
        $validIndikator = $request->validated();
        $indikator = Indikator::create($validIndikator);        
        $pics = $request->input('pics');
        if(is_array($pics)){
            DB::table('indikator_pic')
                    ->where('indikator_id', '=', $indikator->id)
                    ->delete();
            foreach($pics as $pic){
                $data = ['indikator_id' => $indikator->id,
                    'pic_id' => $pic['value'],
                    'nama_pic' => $pic['label']];
                DB::table('indikator_pic')->insert($data);
            }        
        }
        return Redirect::route('indikator.index');        
    }
    
    public function storeIndikatorKompositor(IndikatorKompositorRequest $request){
        $validated = $request->validated();
        $object = IndikatorKompositor::create($validated);
        //$object->create($validated);
        //$indikator_kompositors = $object->query()->where('indikator_id', '=' ,$request->indikator_id)->get();
        return Redirect::back()->with('indikator_kompositor', $object);
    }
    
    public function createKompositor(Indikator $indikator)
    {
        return Inertia::render('Indikator/FormKompositor',[
            'indikator' => new IndikatorResource($indikator),
            'indeks' => \App\Models\Indeks::all(),
            'jenis_kompositor' => \App\Models\JenisKompositor::all()
        ]);
    }
}
