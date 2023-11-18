<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Requests\KompositorRequest;
use App\Models\Kompositor;
use App\Models\IndikatorKompositor;
use Illuminate\Support\Facades\DB;

class KompositorController extends Controller
{
    public function create(\App\Models\Indikator $indikator) {
        return Inertia::render('IndikatorKompositor/FormKompositor',[
            'indikator' => new \App\Http\Resources\IndikatorResource($indikator),
            'indeks' => \App\Models\Indeks::all(),
            'jenis_kompositor' => \App\Models\JenisKompositor::all(),
            'kompositors' => Kompositor::all()
        ]);
    }

    public function destroy(Kompositor $kompositor) {
        if($kompositor->jenis_kompositor_id == 2){
            $indeks = \App\Models\Indeks::find($kompositor->indeks_id);
            $kompositors = Kompositor::where('indeks_id', $indeks->id)->get();
            foreach ($kompositors as $komp) {
                $indikator_kompositor = IndikatorKompositor::where('kompositor_id', $komp->id)->get();
                foreach ($indikator_kompositor as $idk_kom) {
                    $idk_kom->delete();
                }
                $komp->delete();
            }
            $indeks_child = \App\Models\Indeks::where('parent_id', $indeks->id)->get();
            foreach ($indeks_child as $value) {
                $value->delete();
            }
        }
        $kompositor->delete();
        return Redirect::route('kompositor.index');
    }

    public function edit(Kompositor $kompositor) {
        //$ind_kompositor = IndikatorKompositor::where()
        $indikator_kompositor = $kompositor->indikatorKompositor()->firstOrNew();
        return Inertia::render('IndikatorKompositor/EditKompositor',[
            'kompositor' => new \App\Http\Resources\KompositorResource($kompositor),
            'indikator' => new \App\Http\Resources\IndikatorResource(\App\Models\Indikator::where('id',$indikator_kompositor->indikator_id)->get()),
            'indeks' => \App\Models\Indeks::all(),
            'jenis_kompositor' => \App\Models\JenisKompositor::all()
         ]);
    }

    public function index() {
         return Inertia::render('IndikatorKompositor/ListIndikatorKompositor',[
             'kompositors' => Kompositor::all()                
         ]);
    }
    
    public function indexIndikator(\App\Models\Indikator $indikator) {
         return Inertia::render('IndikatorKompositor/ListIndikatorKompositor',[
             'kompositors' => DB::table('kompositor')
                 ->join('indikator_kompositor', 'kompositor.id', '=', 'indikator_kompositor.kompositor_id')
                 ->join('indikator', 'indikator.id', '=', 'indikator_kompositor.indikator_id')
                 ->join('jenis_kompositor', 'kompositor.jenis_kompositor_id', '=', 'jenis_kompositor.id')
                 ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                 ->select(
                         'kompositor.*',
                         'indikator.nama_indikator',
                         'jenis_kompositor.nama_jenis_kompositor',
                         'indeks.nama_indeks')
                 ->where('indikator.id', '=', $indikator->id)
                 ->get(),             
             'indikator' => $indikator,
         ]);
    }

    public function store(KompositorRequest $request) {
        $validated = $request->validated();
        if($request->input('type_kompositor') == 'New'){
            $object = Kompositor::create($validated);
            $data = ['indikator_id' => $request->input('indikator_id'),
                'kompositor_id' => $object->id];
            IndikatorKompositor::create($data);
            if($request->input('jenis_kompositor_id')==2){
                $data_indeks = ['nama_indeks' => $request->input('nama_kompositor'),
                    'parent_id' => $request->input('indeks_id')];
                \App\Models\Indeks::create($data_indeks);
            }
        }else{
            
        }
        
        return Redirect::route('kompositor.index-indikator',$request->input('indikator_id'));
    }

    public function update(Kompositor $kompositor, KompositorRequest $request) {
        $kompositor->update($request->validated());
        /*$data = ['indikator_id' => $request->input('indikator_id'),
            'kompositor_id' => $object->id];
        IndikatorKompositor::create($data);*/
        return Redirect::route('kompositor.index-indikator', $request->input('indikator_id'));
    }
}
