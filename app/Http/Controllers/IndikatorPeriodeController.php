<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Request;
use App\Models\IndikatorPeriode;
use App\Http\Resources\IndikatorPeriodeCollection;
use App\Http\Requests\IndikatorPeriodeRequest;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Redirect;

class IndikatorPeriodeController extends Controller //implements ICrud
{
    //
    public function create() {
        return Inertia::render('IndikatorPeriode/FormIndikatorPeriode',[
            'periodes' => \App\Models\Periode::all(),
            'indikators' => \App\Models\Indikator::all(),
            'pics' => \App\Models\PIC::all(),
            
        ]);
    }

    public function destroy() {
        
    }

    public function edit() {
        
    }

    public function index() {
        return Inertia::render('IndikatorPeriode/ListIndikatorPeriode', [
            'filter' => Request::all('search', 'trashed'),            
            'indikator_periodes' => new IndikatorPeriodeCollection(
                    IndikatorPeriode::query()
                    ->when(Request::input('search'), function($query, $search){
                        $query->where('nama_indikator','like', "%{$search}%");
                    })
                    ->addSelect(['periode' => \App\Models\Periode::select('periode')
                            ->whereColumn('id','indikator_periode.periode_id')])     
                    ->addSelect(['nama_indikator' => \App\Models\Indikator::select('nama_indikator')
                            ->whereColumn('id','indikator_periode.indikator_id')])
                    ->addSelect(['nama_pic' => \App\Models\PIC::select('nama_pic')
                            ->whereColumn('id','indikator_periode.pic_id')])
                    ->paginate(10)
                    ->withQueryString()
            )
                ]);
        //return 'Indikator periode';
    }

    public function store(IndikatorPeriodeRequest $request) {
        $validRequest = $request->validated();
        $object = new IndikatorPeriode();        
        $object->create($validRequest);
        return Redirect::route('indikator-periode.index')->with('success', 'Indikator Periode created.');
    }

    public function update() {
        
    }
}
