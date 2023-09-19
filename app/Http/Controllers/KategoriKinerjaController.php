<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\KategoriKinerja;
use App\Http\Resources\KategoriKinerjaCollection;
use App\Http\Resources\KategoriKinerjaResource;
use App\Http\Requests\KategoriKinerjaRequest;

class KategoriKinerjaController extends Controller //implements ICrud
{
    //
    public function create() {
        return Inertia::render('KategoriKinerja/FormKategoriKinerja');
    }

    public function destroy(KategoriKinerja $kategori_kinerja) {
        $kategori_kinerja->delete();
        return Redirect::route('kategori-kinerja.index');
    }

    public function edit() {
        return Inertia::render('KategoriKinerja/EditKategoriKinerja', [
            'kategori_kinerja' => new KategoriKinerjaResource($periode)            
        ]);
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

    public function store(KategoriKinerjaRequest $request) {
        $valid = $request->validated();
        $obj = new KategoriKinerja();        
        $obj->create($valid);
        return Redirect::route('kategori-kinerja.index');
    }

    public function update(KategoriKinerja $kategori_kinerja, KategoriKinerjaRequest $request) {
        $kategori_kinerja->update(
            $request->validated()
        );
        return Redirect::route('kategori-kinerja.index');
    }
}
