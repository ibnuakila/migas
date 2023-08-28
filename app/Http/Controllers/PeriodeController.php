<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Periode;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class PeriodeController extends Controller implements ICrud
{
    // 

    public function create(Request $request): RedirectResponse {
        
    }

    public function delete($id) {
        
    }

    public function update($id) {
        
    }

    public function index():Response {
        return Inertia::render('Periode/ListPeriode', [
            'periodes' => Periode::all()
                ]);
    }
}
