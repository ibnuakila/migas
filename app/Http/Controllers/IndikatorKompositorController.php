<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\IndikatorKompositorRequest;
use App\Models\IndikatorKompositor;
use Inertia\Inertia;
use Inertia\Response;

class IndikatorKompositorController extends Controller //implements ICrud
{
    //
    public function create(\App\Models\Indikator $indikator) {
        return Inertia::render('IndikatorKompositor/FormKompositor',[
            'indikator' => new \App\Http\Resources\IndikatorResource($indikator),
            'indeks' => \App\Models\Indeks::all(),
            'jenis_kompositor' => \App\Models\JenisKompositor::all()
        ]);
    }

    public function destroy(IndikatorKompositor $indikator_kompositor) {
        $indikator_kompositor->delete();
        return Redirect::route('indikator-kompositor.index');
    }

    public function edit(IndikatorKompositor $indikator_kompositor) {
        return Inertia::render('IndikatorKompositor/EditKompositor',[
             'indikator_kompositor' => $indikator_kompositor                
         ]);
    }

    public function index() {
         return Inertia::render('IndikatorKompositor/ListIndikatorKompositor',[
             'indikator_kompositors' => IndikatorKompositor::all()                
         ]);
    }
    
    public function indexIndikator(\App\Models\Indikator $indikator) {
         return Inertia::render('IndikatorKompositor/ListIndikatorKompositor',[
             'indikator_kompositors' => IndikatorKompositor::query()
                ->where('indikator_id', '=', $indikator->id)
                ->addSelect(['nama_indikator' => \App\Models\Indikator::select('nama_indikator')
                            ->whereColumn('id','indikator_kompositor.indikator_id')])
                ->addSelect(['nama_indeks' => \App\Models\Indeks::select('nama_indeks')
                            ->whereColumn('id','indikator_kompositor.indeks_id')])
                ->addSelect(['nama_jenis_kompositor' => \App\Models\JenisKompositor::select('nama_jenis_kompositor')
                            ->whereColumn('id','indikator_kompositor.jenis_kompositor_id')])
                ->get(),
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
        return Redirect::route('indikator-kompositor.index');
    }
}
