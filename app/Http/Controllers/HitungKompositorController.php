<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\HitungKompositor;
use App\Http\Requests\HitungKompositorRequest;
use App\Http\Resources\HitungKompositorResource;
use App\Http\Resources\HitungKompositorCollection;

class HitungKompositorController extends Controller //implements ICrud
{
    //
    public function create(\App\Models\IndikatorKompositor $indikatorkompositor) {
        return Inertia::render('HitungKompositor/FormHitungKompositor',[
            'indikator_kompositor' => new \App\Http\Resources\IndikatorKompositorResource($indikatorkompositor),
            'indikator_kompositors' => \App\Models\IndikatorKompositor::query()
                ->where('indikator_id', '=', $indikatorkompositor->indikator_id)
                ->where('jenis_kompositor_id','=',1)->get(),
            'hitung_kompositors' => HitungKompositor::query()
                ->where('indikator_kompositor_id', '=', $indikatorkompositor->id)->get()
        ]);
    }

    public function destroy() {
        
    }

    public function edit() {
        
    }

    public function index(\App\Models\IndikatorKompositor $indikatorkompositor) {
        return Inertia::render('HitungKompositor/ListHitungKompositor',[
            'hitung_kompositors' => HitungKompositor::query()
                ->where('indikator_kompositor_id', '=', $indikatorkompositor->id)
                ->addSelect(['nama_kompositor' => \App\Models\IndikatorKompositor::select('nama_kompositor')
                            ->whereColumn('id','hitung_kompositor.indikator_kompositor_id')])      
                /*->addSelect(['nama_field' => \App\Models\IndikatorKompositor::select('nama_kompositor')
                            ->whereColumn('id','hitung_kompositor.field')])*/
                ->get(),
            'indikator_kompositor' => $indikatorkompositor
         ]);
    }

    public function store(HitungKompositorRequest $request) {
        $validated = $request->validated();
        $object = HitungKompositor::create($validated);
        return Redirect::route('hitung-kompositor.index',$request->indikator_kompositor_id);
    }

    public function update() {
        
    }
}
