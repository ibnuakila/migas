<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Request;
use Inertia\Inertia;
use App\Models\Periode;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\PeriodeStoreRequest;
use App\Http\Resources\PeriodeCollection;
use App\Http\Resources\PeriodeResource;

class PeriodeController extends Controller //implements ICrud
{
    // 
    public function index() {
        return Inertia::render('Periode/ListPeriode', [
            'filter' => Request::all('search', 'trashed'),
            'periodes' => /*new PeriodeCollection(
                    Periode::
                    //filter(Request::only('search', 'trashed'))
                    paginate(10)
                    ->appends(Request::all())*/
                    Periode::query()
                    ->when(Request::input('search'), function($query, $search){
                        $query->where('Periode','like', "%{$search}%");
                    })
                    ->paginate(10)
                    ->withQueryString()
            //)
                ]);
    }

    public function create() {
        return Inertia::render('Periode/FormPeriode');
    }

    public function edit(Periode $periode) {
        return Inertia::render('Periode/EditPeriode', [
            'periode' => new PeriodeResource($periode)            
        ]);
    }

    public function update(Periode $periode, PeriodeStoreRequest $request) {
        $periode->update(
            $request->validated()
        );

        return Redirect::back()->with('success', 'Contact updated.');        
    }

    

    public function destroy() {
        
    }

    public function store(PeriodeStoreRequest $request) {
        $validPeriode = $request->validated();
        $objPeriode = new Periode();        
        $objPeriode->create($validPeriode);
        return Redirect::route('periode.index')->with('success', 'Periode created.');
    }

    
}
