<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Satuan;
use App\Http\Resources\SatuanCollection;
use App\Http\Requests\SatuanRequest;
use App\Http\Resources\SatuanResource;

class SatuanController extends Controller //implements ICrud
{
    //
    public function create() {
        return Inertia::render('Satuan/FormSatuan');
    }

    public function destroy(Satuan $satuan) {
        $satuan->delete();
        return Redirect::route('satuan.index');
    }

    public function edit(Satuan $satuan) {
        return Inertia::render('Satuan/EditSatuan', [
            'satuan' => new SatuanResource($satuan)]);
    }

    public function index() {
        return Inertia::render('Satuan/ListSatuan', [
            'filter' => Request::all('search', 'trashed'),
            'satuans' => Satuan::query()
                    ->paginate()                    
            
        ]);
    }

    public function store(SatuanRequest $request) {
        $valid = $request->validated();
        $obj = new Satuan();        
        $obj->create($valid);
        return Redirect::route('satuan.index');
    }

    public function update(Satuan $satuan, SatuanRequest $request) {
        $satuan->update(
            $request->validated()
        );
        return Redirect::route('satuan.index'); 
    }
}
