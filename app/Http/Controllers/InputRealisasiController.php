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
        $indikator_periode = \App\Models\IndikatorPeriode::where('id', $laporancapaian->indikator_periode_id)->first();
        $indikator = \App\Models\Indikator::where('id',$indikator_periode->indikator_id)->first();
        return Inertia::render('InputRealisasi/ListInputRealisasi',[
            'laporan_capaian' => $laporancapaian,
            'indikator' => $indikator,                
            'input_realisasis' => InputRealisasi::query()
                ->join('indikator_kompositor', 'input_realisasi.indikator_kompositor_id', '=', 'indikator_kompositor.id')
                ->join('indikator', 'indikator_kompositor.indikator_id', '=', 'indikator.id')
                ->join('indikator_periode', 'indikator.id', '=', 'indikator_periode.indikator_id')
                ->join('laporan_capaian','indikator_periode.id', '=', 'laporan_capaian.indikator_periode_id')
                ->join('triwulan', 'input_realisasi.triwulan_id', '=', 'triwulan.id')
                ->join('periode', 'input_realisasi.periode_id', '=', 'periode.id')
                ->where('laporan_capaian.id', $laporancapaian->id)
                ->where('input_realisasi.triwulan_id', $laporancapaian->triwulan_id)
                ->select('input_realisasi.*', 
                        'indikator_kompositor.nama_kompositor',
                        'indikator_kompositor.satuan',
                        'triwulan.triwulan',
                        'periode.periode'
                        )
                ->get()
        ]);
        //return \App\Http\Resources\IndikatorPeriodeCollection::collection($indikator_periode);
    }

    public function store(InputRealisasiRequest $request) {
        $validated = $request->validated();
        $object = InputRealisasi::create($validated);
        return Redirect::back();
    }

    public function update() {
        
    }
    
    public function importKompositor(\App\Models\LaporanCapaian $laporan_capaian){
        //check active periode
        $periode = DB::table('periode')
                ->where('status', '=', 'Active')
                ->get();
        $indikator_periode = $laporan_capaian->indikatorPeriode();
        $indikator = $indikator_periode->indikator();
        $data['message'] = 'Undefined message';
        if ($periode->count() == 1) {
            $result = DB::table('indikator_kompositor')
                        ->where('indikator_id', '=', $indikator->id)
                        ->get();
            if($result->count() > 0){
                foreach ($result as $row) {
                    //looping for triwulan
                    //$triwulans = DB::table('triwulan')
                        //->where('id','=',$)
                        //->get();
                    //if($triwulans->count() > 0){
                        //foreach ($triwulans as $trw) {
                            $obj = new InputRealisasi();
                            $obj->indikator_kompositor_id = $row->id;
                            $obj->triwulan_id = $row->triwulan_id;
                            $obj->periode_id = $row->periode_id;
                            $obj->save();
                        //}
                        
                    //}
                    $data['result'][$row->id] = 'Import '.$row->nama_kompositor.' successfull';
                    $data['message'] = 'Import successfull';
                }
            }
        }
        
        return Redirect::back()->with($data);
    }
}
