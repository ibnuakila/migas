<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Request;
use App\Models\Indikator;
use App\Models\Satuan;
use App\Models\Level;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\IndikatorRequest;
use App\Http\Resources\IndikatorResource;

class IndikatorController extends Controller //implements ICrud
{
    //
    public function create(Request $request) {
        return Inertia::render('Indikator/FormIndikator', [
            'satuans' => \App\Models\Satuan::all(),
            'levels' => \App\Models\Level::all(),
            'parents' => Indikator::query()
                ->where('level_id','=','1')
                ->get()
        ]);
    }

    public function delete($id) {
        
    }

    public function index():Response {
        
        return Inertia::render('Indikator/ListIndikator', [
            'filter' => Request::all('search'),
            'indikators' => 
                /*Indikator::query()                
                    ->when(Request::input('search'), function($query, $search){
                        $query->where('nama_indikator','like', "%{$search}%");
                    })                    
                    ->paginate(10)
                    ->withQueryString()*/
                Indikator::query()                
                    ->when(Request::input('search'), function($query, $search){
                        $query->where('nama_indikator','like', "%{$search}%");
                    })
                    ->addSelect(['nama_satuan' => Satuan::select('nama_satuan')
                            ->whereColumn('id','indikator.satuan_id')])
                    ->addSelect(['nama_level' => Level::select('nama_level')
                            ->whereColumn('id','indikator.level_id')])
                    ->paginate(10)
                    ->withQueryString()
                ]);
    }

    public function update(Indikator $indikator, IndikatorRequest $request) {
        $indikator->update(
            $request->validated()
        );
        return Redirect::route('indikator.index')->with('success', 'Indikator updated.');
    }

    public function destroy(Indikator $indikator) {
        $indikator->delete();
        return Redirect::route('indikator.index')->with('success', 'Indikator deleted!');
    }

    public function edit(Indikator $indikator) {
        return Inertia::render('Indikator/EditIndikator', [
            'indikator' => new IndikatorResource($indikator),
            'satuans' => \App\Models\Satuan::all(),
            'levels' => \App\Models\Level::all(),
            'parents' => Indikator::query()
                ->where('level_id','=','1')
                ->get()
        ]);
    }

    public function store(IndikatorRequest $request) {
        $validIndikator = $request->validated();
        $object = new Indikator();        
        $object->create($validIndikator);
        return Redirect::route('indikator.index')->with('success', 'Periode created.');
    }
}
