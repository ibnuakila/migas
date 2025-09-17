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
use Illuminate\Support\Facades\DB;

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
        if($request['status']=='Active'){
            DB::table('periode')->update(['status'=>'Closed']);
        }
        $periode->update(
            $request->validated()
        );
        
        return Redirect::route('periode.index')->with('success', 'Periode updated.');      
    }

    

    public function destroy(Periode $periode) {
        $periode->delete();
        return Redirect::route('periode.index')->with('success', 'Periode deleted!');
    }

    public function store(PeriodeStoreRequest $request) {
        if($request['status']=='Active'){
            DB::table('periode')->update(['status'=>'Closed']);
        }
        $validPeriode = $request->validated();
        $objPeriode = new Periode();        
        $objPeriode->create($validPeriode);
        return Redirect::route('periode.index')->with('success', 'Periode created.');
    }

    
}
