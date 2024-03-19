<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Models\KategoriDokumen;
use App\Http\Resources\KategoriDokumenCollection;
use App\Http\Resources\KategoriDokumenResource;
use App\Http\Requests\KategoriDokumenRequest;

class KategoriDokumenController extends Controller //implements ICrud
{
    //
    public function create() {
        return Inertia::render('KategoriDokumen/FormKategoriDokumen');
    }

    public function destroy() {
        
    }

    public function edit() {
        
    }

    public function index() {
        return Inertia::render('KategoriDokumen/ListKategoriDokumen', [
            //'filter' => Request::all('search', 'trashed'),
            'kategori_dokumens' => new KategoriDokumenCollection(
                    KategoriDokumen::
                    //->filter(Request::only('search', 'trashed'))
                    paginate(10)
                    ->appends(Request::all()),            
            ),
            
        ]);
    }

    public function store() {
        
    }

    public function update() {
        
    }
}
