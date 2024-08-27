<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Level;
use App\Http\Resources\LevelCollection;
use App\Http\Requests\LevelRequest;
use Illuminate\Support\Facades\Redirect;
use App\Http\Resources\LevelResource;

class LevelController extends Controller //implements ICrud
{
    //
    public function create() {
        return Inertia::render('Level/FormLevel');
    }

    public function destroy() {
        
    }

    public function edit(Level $level) {
        return Inertia::render('Level/EditLevel', [
            'level' => new LevelResource($level)            
        ]);
    }

    public function index() {
        return Inertia::render('Level/ListLevel', [
            'filter' => Request::all('search', 'trashed'),
            'levels' => new \App\Http\Resources\LevelCollection(
                    Level::query()
                    ->when(Request::input('search'), function($query, $search){
                        $query->where('Periode','like', "%{$search}%");
                    })
                    ->paginate(10)
                    ->withQueryString()
            )
        ]);
    }

    public function store(LevelRequest $request) {
        $valid = $request->validated();
        $obj = new Level();        
        $obj->create($valid);
        return Redirect::route('level.index')->with('success', 'Periode created.');
    }

    public function update(Level $level, LevelRequest $request) {
        $level->update(
            $request->validated()
        );
        return Redirect::route('level.index')->with('success', 'Level updated.'); 
    }
}
