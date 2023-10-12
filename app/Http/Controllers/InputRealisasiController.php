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
use Illuminate\Support\Facades\DB;

class InputRealisasiController extends Controller //implements ICrud
{
    //
    public function create() {
        return Inertia::render('InputRealisasi/FormRealisasi',[
            'triwulan' => \App\Models\Triwulan::all(),
            'periode' => \App\Models\Periode::all(),
            'pics' => \App\Models\PIC::all()
        ]);
        
    }

    public function destroy() {
        
    }

    public function edit() {
        return Inertia::render('',[
            
        ]);
    }

    public function index(\App\Models\LaporanCapaian $laporancapaian) {
        return Inertia::render('InputRealisasi/ListInputRealisasi',[
            'indikator' => DB::table('laporan_capaian')
                ->join('indikator_periode', 'laporan_capaian.indikator_periode_id', '=', 'indikator_periode.id')
                ->join('indikator', 'indikator_periode.indikator_id', '=', 'indikator.id')
                ->where('laporan_capaian.id', $laporancapaian->id)->get(),
                
            'input_realisasis' => InputRealisasi::query()
                ->join('indikator_kompositor', 'input_realisasi.indikator_kompositor_id', '=', 'indikator_kompositor.id')
                ->join('indikator', 'indikator_kompositor.indikator_id', '=', 'indikator.id')
                ->join('indikator_periode', 'indikator.id', '=', 'indikator_periode.indikator_id')
                ->join('laporan_capaian','indikator_periode.id', '=', 'laporan_capaian.indikator_periode_id')
                ->where('laporan_capaian.id',$laporancapaian->id)
                ->get()
        ]);
    }
    
    public function indexIndikator(\App\Models\LaporanCapaian $laporancapaian) {
        return Inertia::render('InputRealisasi/ListInputRealisasi',[
            'indikator' => DB::table('laporan_capaian')
                ->join('indikator_periode', 'laporan_capaian.indikator_periode_id', '=', 'indikator_periode.id')
                ->join('indikator', 'indikator_periode.indikator_id', '=', 'indikator.id')
                ->where('laporan_capaian.id', $laporancapaian->id)->get(),
                
            'input_realisasis' => InputRealisasi::query()
                ->join('indikator_kompositor', 'input_realisasi.indikator_kompositor_id', '=', 'indikator_kompositor.id')
                ->join('indikator', 'indikator_kompositor.indikator_id', '=', 'indikator.id')
                ->join('indikator_periode', 'indikator.id', '=', 'indikator_periode.indikator_id')
                ->join('laporan_capaian','indikator_periode.id', '=', 'laporan_capaian.indikator_periode_id')
                ->where('laporan_capaian.id',$laporancapaian->id)
                ->get()
        ]);
    }

    public function store(InputRealisasiRequest $request) {
        $validated = $request->validated();
        $object = InputRealisasi::create($validated);
        return Redirect::back();
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
