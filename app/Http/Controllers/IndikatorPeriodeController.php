<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Request;
use App\Models\IndikatorPeriode;
use App\Http\Resources\IndikatorPeriodeCollection;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Redirect;

class IndikatorPeriodeController extends Controller //implements ICrud
{
    //
    public function create() {
        return Inertia::render('IndikatorPeriode/FormIndikatorPeriode');
    }

    public function destroy() {
        
    }

    public function edit() {
        
    }

    public function index() {
        return Inertia::render('IndikatorPeriode/ListIndikatorPeriode', [
            'filter' => Request::all('search', 'trashed'),
            'indikator_periodes' => new IndikatorPeriodeCollection(
                    IndikatorPeriode::
                    //->filter(Request::only('search', 'trashed'))
                    paginate(10)
                    ->appends(Request::all())
            )
                ]);
        //return 'Indikator periode';
    }

    public function store() {
        
    }

    public function update() {
        
    }
}
