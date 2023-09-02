<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Periode;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\PeriodeStoreRequest;

class PeriodeController extends Controller 
{
    // 

    public function create(Request $request): RedirectResponse {
        $validPeriode = $request->validate([
            'Periode' => 'required|string',
            'Status' => 'required|string'
        ]);
        $objPeriode = new Periode();        
        $objPeriode->create($validPeriode);
        return Redirect::route('periode.index')->with('success', 'Periode created.');
    }

    public function delete($id) {
        
    }

    public function update(Periode $periode,Request $request) {
        
        $validPeriode = $request->validate([    
            'Id' => 'required',
            'Periode' => 'required',
            'Status' => 'required'
        ]);
        $objPeriode = Periode::find($request->Id);
        $objPeriode->Periode = $request->Periode;
        $objPeriode->Status = $request->Status;
        $objPeriode->save();
        $data = ['Id' => $request->Id, 'Periode' => $request->Periode];
        echo json_encode($data);
        //return Redirect::route('periode.index')->with('success', 'Periode Updated.');
    }

    public function index():Response {
        return Inertia::render('Periode/ListPeriode', [
            'periodes' => Periode::all()
                ]);
    }
}
