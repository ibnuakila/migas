<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\HasilEvaluasi;
use App\Http\Resources\HasilEvaluasiCollection;


class HasilEvaluasiController extends Controller //implements ICrud
{
    //
    public function create() {
        return Inertia::render('HasilEvaluasi/FormHasilEvaluasi');
    }

    public function destroy() {
        
    }

    public function edit() {
        
    }

    public function index() {
        return Inertia::render('HasilEvaluasi/ListHasilEvaluasi', [
            'filter' => Request::all('search', 'trashed'),
            'hasil_evaluasis' => new HasilEvaluasiCollection(
                    HasilEvaluasi::
                    //->filter(Request::only('search', 'trashed'))
                    paginate(10)
                    ->appends(Request::all())
            )
        ]);
    }

    public function store() {
        
    }

    public function update() {
        
    }
}
