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
use App\Http\Resources\IndikatorResource;
use App\Http\Requests\IndikatorKompositorRequest;
use App\Models\IndikatorKompositor;

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
                ->get()
        ]);
    }

    public function delete($id) {
        
    }

    public function index():Response {
        
        return Inertia::render('Indikator/ListIndikator', [
            'filter' => Request::all('search'),
            'indikators' => 
                /*Indikator::query()                
                    ->when(Request::input('search'), function($query, $search){
                        $query->where('nama_indikator','like', "%{$search}%");
                    })                    
                    ->paginate(10)
                    ->withQueryString()*/
                Indikator::query()                
                    ->when(Request::input('search'), function($query, $search){
                        $query->where('nama_indikator','like', "%{$search}%");
                    })
                    ->addSelect(['nama_satuan' => Satuan::select('nama_satuan')
                            ->whereColumn('id','indikator.satuan_id')])
                    ->addSelect(['nama_level' => Level::select('nama_level')
                            ->whereColumn('id','indikator.level_id')])
                    ->paginate(10)
                    ->withQueryString()
                ]);
    }

    public function update(Indikator $indikator, IndikatorRequest $request) {
        $indikator->update(
            $request->validated()
        );
        return Redirect::route('indikator.index')->with('success', 'Indikator updated.');
    }

    public function destroy(Indikator $indikator) {
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
        ]);
    }

    public function store(IndikatorRequest $request) {
        $validIndikator = $request->validated();
        $object = Indikator::create($validIndikator);        
        //$object->create($validIndikator);
        //return Redirect::route('indikator.index')->with('success', 'Periode created.');
        /*return Inertia::render('Indikator/FormIndikator', [
            'indikator' => new IndikatorResource($object),
            'satuans' => \App\Models\Satuan::all(),
            'levels' => \App\Models\Level::all(),
            //'indikator_kompositors' => \App\Models\IndikatorKompositor::all(),
            'parents' => Indikator::query()
                ->whereIn('level_id',['1','2','3'])
                ->get(),
            'message' => 'Indikator Created!'
        ]);*/
        return Redirect::back()->with('indikator', $object);
        //return ['indikator' => new IndikatorResource($object)];
    }
    
    public function storeIndikatorKompositor(IndikatorKompositorRequest $request){
        $validated = $request->validated();
        $object = new IndikatorKompositor();
        $object->create($validated);
        $indikator_kompositors = $object->query()->where('indikator_id', '=' ,$request->indikator_id)->get();
        return Redirect::back()->with('indikator_kompositor', $indikator_kompositors);
    }
}
