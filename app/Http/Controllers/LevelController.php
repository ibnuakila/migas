<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Level;
use App\Http\Resources\LevelCollection;

class LevelController extends Controller //implements ICrud
{
    //
    public function create() {
        return Inertia::render('Level/FormLevel');
    }

    public function destroy() {
        
    }

    public function edit() {
        
    }

    public function index() {
        return Inertia::render('Level/ListLevel', [
            'filter' => Request::all('search', 'trashed'),
            'levels' => new \App\Http\Resources\LevelCollection(
                    Level::
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
