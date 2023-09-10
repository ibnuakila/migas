<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Satuan;
use App\Http\Resources\SatuanCollection;

class SatuanController extends Controller //implements ICrud
{
    //
    public function create() {
        return Inertia::render('Satuan/FormSatuan');
    }

    public function destroy() {
        
    }

    public function edit() {
        
    }

    public function index() {
        return Inertia::render('Satuan/ListSatuan', [
            'filter' => Request::all('search', 'trashed'),
            'satuans' => new SatuanCollection(
                    Satuan::
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
