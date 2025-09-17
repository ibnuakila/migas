<?php

namespace App\Http\Controllers;

//use Illuminate\Support\Facades\Request;
use App\Models\IndikatorFormula;
use Illuminate\Http\Request;
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
use App\Models\Kompositor;
use Illuminate\Support\Facades\DB;

class IndikatorController extends Controller
{

    //
    public function create(Request $request)
    {
        $this->authorize('indikator-create');

        return Inertia::render('Indikator/FormIndikator', [
            'satuans' => \App\Models\Satuan::all(),
            'levels' => \App\Models\Level::all(),
            //'indikator_kompositors' => \App\Models\IndikatorKompositor::all(),
            'parents' => Indikator::query()
                ->whereIn('level_id', ['1', '2', '3'])
                ->get(),
            'pics' => \App\Models\PIC::all()
        ]);
    }

    public function index(Request $request): Response
    {
        $this->authorize('indikator-list');

        return Inertia::render('Indikator/ListIndikator', [
            'indikators' =>
                Indikator::query()
                    ->join('level', 'indikator.level_id', '=', 'level.id')
                    ->join('satuan', 'indikator.satuan_id', '=', 'satuan.id')
                    ->with('indikatorPics')
                    ->with('indikatorKompositors')
                    ->with('indikatorFormula')
                    ->when(\Illuminate\Support\Facades\Request::input('flevel'), function ($query, $search) {
                        if ($search != '') {
                            $query->where('level.nama_level', 'ilike', "%{$search}%");
                        }
                    })
                    ->when(\Illuminate\Support\Facades\Request::input('fpic'), function ($query, $search) {
                        if ($search != '') {
                            $query->join('indikator_pic', 'indikator.id', '=', 'indikator_pic.indikator_id');
                            $query->where('indikator_pic.nama_pic', 'ilike', "%{$search}%");
                        }
                    })
                    ->when(\Illuminate\Support\Facades\Request::input('findikator'), function ($query, $search) {
                        if ($search != '') {
                            $query->where('indikator.nama_indikator', 'ilike', "%{$search}%");
                        }
                    })
                    ->when($request->user(), function ($query) use ($request) {
                        $roles = $request->user()->getRoleNames();
                        $user = $request->user();

                        if (!$roles->contains('Administrator')) {   
                            $query->join('indikator_pic', 'indikator.id', '=', 'indikator_pic.indikator_id');
                            $query->where('indikator_pic.pic_id', '=', $user->pic_id);
                        }
                    })
                    ->select(
                        'indikator.*',
                        'level.nama_level',
                        'satuan.nama_satuan'
                    )
                    ->orderBy('indikator.id', 'asc')
                    ->paginate(),
        ]);

    }

    public function update(Indikator $indikator, IndikatorRequest $request)
    {
        $this->authorize('indikator-edit');
        try {
            DB::beginTransaction();
            $request->validate(['pics' => ['required']]);
            $indikator->update(
                $request->validated()
            );
            $pics = $request->input('pics');
            if (is_array($pics) && count($pics) > 0) {
                DB::table('indikator_pic')
                    ->where('indikator_id', '=', $indikator->id)
                    ->delete();
                foreach ($pics as $pic) {
                    $data = [
                        'indikator_id' => $indikator->id,
                        'pic_id' => $pic['value'],
                        'nama_pic' => $pic['label']
                    ];
                    DB::table('indikator_pic')->insert($data);
                }
            }
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            //$message = ['Message' => $e];
            return $e;
        }
        return Redirect::route('indikator.index')->with('success', 'Indikator updated.');
    }

    public function destroy(Indikator $indikator, Request $request)
    {
        $this->authorize('indikator-delete');

        //$ind_pic = $indikator->indikatorPics();
        foreach ($indikator->indikatorPics as $pic) {
            $pic->delete();
        }
        $indikator->delete();
        return Redirect::route('indikator.index')->with('success', 'Indikator deleted!');
    }

    public function edit(Indikator $indikator, Request $request)
    {
        $this->authorize('indikator-edit');

        return Inertia::render('Indikator/EditIndikator', [
            'indikator' => new IndikatorResource($indikator),
            'satuans' => \App\Models\Satuan::all(),
            'levels' => \App\Models\Level::all(),
            'parents' => Indikator::query()
                ->whereIn('level_id', ['1', '2', '3'])
                ->get(),
            'indikator_kompositors' => IndikatorKompositor::query()
                ->where('indikator_id', '=', $indikator->id)
                ->get(),
            'pics' => \App\Models\PIC::all(),
            'def_pics' => ($this->getPics($indikator))
        ]);
    }

    function getPics($indikator)
    {
        //$indikator_kompositor = \App\Models\Indikator::where('id', $indikator->indikator_kompositor_id)->first();
        $temp_res = DB::table('indikator')
            ->join('indikator_pic', 'indikator.id', '=', 'indikator_pic.indikator_id')
            ->where('indikator.id', '=', $indikator->id)
            ->select('indikator_pic.*')
            ->get();
        $def_pics = [];
        $i = 0;
        foreach ($temp_res as $row) {
            $def_pics[$i] = ['value' => $row->pic_id, 'label' => $row->nama_pic];
            $i++;
        }
        return $def_pics;
    }

    public function store(IndikatorRequest $request)
    {
        $this->authorize('indikator-create');

        $request->validate(['pics' => ['required']]);
        $validIndikator = $request->validated();
        $indikator = Indikator::create($validIndikator);
        $pics = $request->input('pics');
        if (is_array($pics)) {
            DB::table('indikator_pic')
                ->where('indikator_id', '=', $indikator->id)
                ->delete();
            foreach ($pics as $pic) {
                $data = [
                    'indikator_id' => $indikator->id,
                    'pic_id' => $pic['value'],
                    'nama_pic' => $pic['label']
                ];
                DB::table('indikator_pic')->insert($data);
            }
        }
        return Redirect::route('indikator.index');
    }

    public function storeIndikatorKompositor(IndikatorKompositorRequest $request)
    {
        $validated = $request->validated();
        $object = IndikatorKompositor::create($validated);
        //$object->create($validated);
        //$indikator_kompositors = $object->query()->where('indikator_id', '=' ,$request->indikator_id)->get();
        return Redirect::back()->with('indikator_kompositor', $object);
    }

    public function createKompositor(Indikator $indikator)
    {
        return Inertia::render('Indikator/FormKompositor', [
            'indikator' => new IndikatorResource($indikator),
            'indeks' => \App\Models\Indeks::all(),
            'jenis_kompositor' => \App\Models\JenisKompositor::all()
        ]);
    }

    public function createFormula(Indikator $indikator)
    {
        return Inertia::render('Indikator/FormFormula', [
            'indikator' => new IndikatorResource($indikator),
            'formula' => function()use($indikator){
                $indikator_formula = IndikatorFormula::where('indikator_id', $indikator->id)->first();
                if(is_object($indikator_formula)){
                    return $indikator_formula;
                }else{
                    return null;
                }
            } ,
            'kompositors' => Kompositor::query()
                ->join('indikator_kompositor', 'kompositor.id', '=', 'indikator_kompositor.kompositor_id')
                ->join('indikator', 'indikator.id', '=', 'indikator_kompositor.indikator_id')
                ->join('jenis_kompositor', 'kompositor.jenis_kompositor_id', '=', 'jenis_kompositor.id')
                ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                ->select(
                    'kompositor.*',
                    'indikator.nama_indikator',
                    'jenis_kompositor.nama_jenis_kompositor',
                    //'indeks.id as _indeks_id',
                    'indeks.nama_indeks'
                )
                ->where('indikator.id', '=', $indikator->id)
                //->where('kompositor.jenis_kompositor_id', '=', 2)
                ->orderBy('indeks.id', 'asc')
                ->get(),
        ]);
    }

    public function storeFormula(\App\Http\Requests\IndikatorFormula $request)
    {
        $valid_request = $request->validated();
        $indikator_formula = IndikatorFormula::find($request['id']);
        if(is_object($indikator_formula)){
            $indikator_formula = $indikator_formula->update($valid_request);
        }else{
            $indikator_formula = IndikatorFormula::create($valid_request);
        }
        
        return Redirect::route('indikator.index');
    }
}
