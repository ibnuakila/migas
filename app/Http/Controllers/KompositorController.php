<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Requests\KompositorRequest;
use App\Models\Kompositor;
use Illuminate\Support\Facades\DB;

class KompositorController extends Controller
{
    public function create(\App\Models\Indikator $indikator) {
        return Inertia::render('IndikatorKompositor/FormKompositor',[
            'indikator' => new \App\Http\Resources\IndikatorResource($indikator),
            'indeks' => \App\Models\Indeks::all(),
            'jenis_kompositor' => \App\Models\JenisKompositor::all()
        ]);
    }

    public function destroy(Kompositor $kompositor) {
        $kompositor->delete();
        return Redirect::route('kompositor.index');
    }

    public function edit(Kompositor $kompositor) {
        //return new \App\Http\Resources\IndikatorKompositorResource($indikatorkompositor);
        return Inertia::render('IndikatorKompositor/EditKompositor',[
            'kompositor' => new \App\Http\Resources\KomponenResource($kompositor),
            'indikator' => new \App\Http\Resources\IndikatorResource(\App\Models\Indikator::where('id',$kompositor->indikator_id)->get()),
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
                         'jenis_indikator.nama_jenis_kompositor',
                         'indeks.nama_indeks')
                 ->get(),
             /*'indikator_kompositors' => Kompositor::query()
                ->where('indikator_id', '=', $indikator->id)
                ->addSelect(['nama_indikator' => \App\Models\Indikator::select('nama_indikator')
                            ->whereColumn('id','indikator_kompositor.indikator_id')])
                ->addSelect(['nama_indeks' => \App\Models\Indeks::select('nama_indeks')
                            ->whereColumn('id','indikator_kompositor.indeks_id')])
                ->addSelect(['nama_jenis_kompositor' => \App\Models\JenisKompositor::select('nama_jenis_kompositor')
                            ->whereColumn('id','indikator_kompositor.jenis_kompositor_id')])
                ->get(),*/
             'indikator' => $indikator,
         ]);
    }

    public function store(IndikatorKompositorRequest $request) {
        $validated = $request->validated();
        $object = IndikatorKompositor::create($validated);        
        return Redirect::route('indikator-kompositor.index-indikator',$object->indikator_id);
    }

    public function update(IndikatorKompositor $indikator, IndikatorKompositorRequest $request) {
        $indikator->update($request->validated());
        return Redirect::route('indikator-kompositor.index-indikator', $indikator);
    }
}
