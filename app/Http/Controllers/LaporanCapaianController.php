<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\LaporanCapaian;
use App\Http\Resources\LaporanCapaianCollection;

class LaporanCapaianController extends Controller //implements ICrud
{
    //
    public function create() {
        return Inertia::render('LaporanCapaian/FormLaporanCapaian');
    }

    public function destroy() {
        
    }

    public function edit() {
        
    }

    public function index() {
        return Inertia::render('LaporanCapaian/ListLaporanCapaian', [
            'filter' => Request::all('search', 'trashed'),
            'laporan_capaian' => new LaporanCapaianCollection(
                    LaporanCapaian::
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
