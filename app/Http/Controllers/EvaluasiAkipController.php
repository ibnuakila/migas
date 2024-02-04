<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\EvaluasiAkip;
use App\Models\UploadFile;
use App\Http\Resources\EvaluasiAkipCollection;
use App\Http\Resources\UploadFileCollection;

class EvaluasiAkipController extends Controller //implements ICrud
{
    //
    public function create() {
        return Inertia::render('EvaluasiAkip/FormEvaluasiAkip', [
            'upload_files' => new UploadFileCollection(
                    UploadFile::
                    //->filter(Request::only('search', 'trashed'))
                    paginate()
                    ->appends(Request::all())
            ),
            'periodes' => \App\Models\Periode::all()
        ]);
    }

    public function destroy() {
        
    }

    public function edit() {
        
    }

    public function index() {
        return Inertia::render('EvaluasiAkip/ListEvaluasiAkip', [
            'filter' => Request::all('search', 'trashed'),
            'evaluasi_akips' => new EvaluasiAkipCollection(
                    EvaluasiAkip::
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
