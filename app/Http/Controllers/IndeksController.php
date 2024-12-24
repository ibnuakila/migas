<?php

namespace App\Http\Controllers;

//use Illuminate\Http\Request;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Indeks;
use App\Http\Requests\IndeksRequest;
use App\Http\Resources\IndeksResource;
use App\Http\Resources\IndeksCollection;
use Illuminate\Support\Facades\DB;

class IndeksController extends Controller //implements ICrud
{
    //
    public function create() {
        return Inertia::render('Indeks/FormIndeks',[
            'parents' => Indeks::all()
        ]);
    }

    public function destroy(Indeks $indeks) {
        $indeks->delete();
        return Redirect::route('indeks.index');
    }

    public function edit(Indeks $indeks) {
        return Inertia::render('Indeks/EditIndeks',[
            'indeks' => new IndeksResource($indeks),
            'parents' => Indeks::all()
        ]);
    }

    public function index() {
        return Inertia::render('Indeks/ListIndeks', [
            'filter' => Request::all('search', 'level'),
            'indeks' => Indeks::query()
                ->when(Request::input('search'), function($query, $search){
                        $query->where('nama_indikator','like', "%{$search}%");
                    })
                ->paginate(10)
                //->withQueryString()
                ]);
    }

    public function store(IndeksRequest $request) {
        $valid = $request->validated();
               
        Indeks::create($valid);
        return Redirect::route('indeks.index');
    }

    public function update(Indeks $indeks, IndeksRequest $request) {
        $indeks->update(
            $request->validated()
        );
        return Redirect::route('indeks.index');
    }
}
