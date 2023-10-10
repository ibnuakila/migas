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

    public function destroy() {
        
    }

    public function edit() {
        
    }

    public function index(\App\Models\Indikator $indikator) {
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
        //$object->create($validated);
        //$indikator_kompositors = $object->query()->where('indikator_id', '=' ,$request->indikator_id)->get();
        return Redirect::route('indikator-kompositor.index')->with('indikator_kompositor', $object);
    }

    public function update() {
        
    }
}
