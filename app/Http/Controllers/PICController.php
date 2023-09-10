<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PIC;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class PICController extends Controller //implements ICrud
{
    //
    public function create() {
        return Inertia::render('Pic/FormPic');
    }

    public function delete($id) {
        
    }

    public function index(): Response {
        return Inertia::render('Pic/ListPic', [
            'pics' => PIC::all()
                ]);
    }

    public function update($id) {
        
    }
}
