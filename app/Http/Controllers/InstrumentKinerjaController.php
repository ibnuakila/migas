<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Komponen;
use App\Models\SubKomponen;
use App\Models\Kriteria;
use App\Http\Requests\KomponenRequest;
use App\Http\Requests\SubKomponenRequest;
use App\Http\Resources\KomponenCollection;

class InstrumentKinerjaController extends Controller //implements ICrud
{
    //
    public function createKomponen() {
        return Inertia::render('InstrumentKinerja/FormKomponen');
    }

    public function destroyKomponen() {
        
    }

    public function editKomponen(Komponen $komponen) {
        return "Edit komponen";
    }

    public function index() {
        return Inertia::render('InstrumentKinerja/ListKomponen',[
            'komponens' => new KomponenCollection(
                    Komponen::with('subKomponen')                    
                    ->paginate(10)
            )
        ]);
    }

    public function storeKomponen(KomponenRequest $request) {
        $komponen = Komponen::create($request->validated());
        return Redirect::route('instrument-kinerja.index');
    }

    public function updateKomponen() {
        
    }
    
    public function createSubKomponen(Komponen $komponen) {
        return Inertia::render('InstrumentKinerja/FormSubKomponen',[
            'komponen' => new \App\Http\Resources\KomponenResource($komponen)
        ]);
    }
    
    public function storeSubKomponen(SubKomponenRequest $request) {
        $komponen = SubKomponen::create($request->validated());
        return Redirect::route('instrument-kinerja.index');
    }
    
}
