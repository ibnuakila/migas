<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Indikator;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class IndikatorController extends Controller //implements ICrud
{
    //
    public function create(Request $request) {
        
    }

    public function delete($id) {
        
    }

    public function index():Response {
        return Inertia::render('Indikator/ListIndikator', [
            'indikators' => Indikator::all()
                ]);
    }

    public function update($id) {
        
    }

    public function destroy() {
        
    }

    public function edit() {
        
    }

    public function store() {
        
    }
}
