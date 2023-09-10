<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\KategoriKinerja;
use App\Http\Resources\KategoriKinerjaCollection;

class KategoriKinerjaController extends Controller //implements ICrud
{
    //
    public function create() {
        return Inertia::render('KategoriKinerja/FormKategoriKinerja');
    }

    public function destroy() {
        
    }

    public function edit() {
        
    }

    public function index() {
        return Inertia::render('KategoriKinerja/ListKategoriKinerja', [
            'filter' => Request::all('search', 'trashed'),
            'kategori_kinerjas' => new KategoriKinerjaCollection(
                    KategoriKinerja::
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
