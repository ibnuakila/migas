<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\InputRealisasi;
use App\Http\Requests\InputRealisasiRequest;
use App\Http\Resources\InputRealisasiResource;
use App\Http\Resources\InputRealisasiCollection;

class InputRealisasiController extends Controller //implements ICrud
{
    //
    public function create() {
        //return Inertia::render('InputRealisasi/FormRealisasi');
        return "Hello world";
    }

    public function destroy() {
        
    }

    public function edit() {
        return Inertia::render('',[
            
        ]);
    }

    public function index(\App\Models\LaporanCapaian $laporancapaian) {
        return Inertia::render('InputRealisasi/ListInputRealisasi',[
            'input_realisasis' => InputRealisasi::query()
                ->join('indikator_kompositor', 'input_realisasi.indikator_kompositor_id', '=', 'indikator_kompositor.id')
            ->join('indikator', 'indikator_kompositor.indikator_id', '=', 'indikator.id')
            ->join('indikator_periode', 'indikator.id', '=', 'indikator_periode.indikator_id')
            ->join('laporan_capaian','indikator_periode.id', '=', 'laporan_capaian.indikator_periode_id')
            ->where('laporan_capaian.id',$laporancapaian->id)
            ->get()
        ]);
    }

    public function store() {
        
    }

    public function update() {
        
    }
    
    public function importKompositor(){
        //check active periode
        $periode = DB::table('periode')
                ->where('status', '=', 'Active')
                ->get();

        
    }
}
