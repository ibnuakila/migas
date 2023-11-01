<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Request;
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

    public function edit(InputRealisasi $inputrealisasi) {
            $indikator_kompositor = \App\Models\IndikatorKompositor::where('id', $inputrealisasi->indikator_kompositor_id)->first();
        return Inertia::render('InputRealisasi/EditRealisasi',[
            'input_realisasi' => new InputRealisasiResource($inputrealisasi),
            'indikator_kompositor' => $indikator_kompositor,
            'triwulans' => \App\Models\Triwulan::all(),
            'periodes' => \App\Models\Periode::all(),
            'pics' => \App\Models\PIC::all(),
            'def_pics' => ($this->getPics($inputrealisasi))
        ]);
    }

    function getPics($inputrealisasi) {
        $indikator_kompositor = \App\Models\IndikatorKompositor::where('id', $inputrealisasi->indikator_kompositor_id)->first();
        $temp_res = DB::table('indikator')                
                ->join('indikator_periode', 'indikator.id', '=', 'indikator_periode.indikator_id')
                ->join('indikator_periode_pic', 'indikator_periode.id', '=', 'indikator_periode_pic.indikator_periode_id')
                ->where('indikator.id', '=', $indikator_kompositor->indikator_id)
                ->select('indikator_periode_pic.*')
                ->get();
        $def_pics = []; $i=0;
        foreach ($temp_res as $row) {
            $def_pics[$i] = ['value' => $row->pic_id, 'label' => $row->nama_pic];
            $i++;
        }
        return $def_pics;
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
        //$indikator_periode = \App\Models\IndikatorPeriode::where('id', $laporancapaian->indikator_periode_id)->first();
        $indikator = \App\Models\Indikator::where('id',$laporancapaian->indikator_id)->first();
        return Inertia::render('InputRealisasi/ListInputRealisasi',[
            'laporan_capaian' => $laporancapaian,
            'indikator' => $indikator,                
            'input_realisasis' => InputRealisasi::query()
                ->join('indikator_kompositor', 'input_realisasi.indikator_kompositor_id', '=', 'indikator_kompositor.id')
                ->join('indikator', 'indikator_kompositor.indikator_id', '=', 'indikator.id')
                //->join('indikator_periode', 'indikator.id', '=', 'indikator_periode.indikator_id')
                ->join('laporan_capaian','indikator.id', '=', 'laporan_capaian.indikator_id')
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

    public function update(InputRealisasi $inputrealisasi, InputRealisasiRequest $request) {
        //update input realisasi
        $inputrealisasi->update($request->validated());
        //update input realisasi pic
        $laporancapaian = \App\Models\LaporanCapaian::where('id', $inputrealisasi->laporan_capaian_id)->first();
        $pics = $request->input('pics');
        if(is_array($pics)){
            DB::table('input_realisasi_pic')
                    ->where('input_realisasi_id', '=', $inputrealisasi->id)
                    ->delete();
            foreach($pics as $pic){
                $data = ['input_realisasi_id' => $inputrealisasi->id,
                    'pic_id' => $pic['value'],
                    'nama_pic' => $pic['label']];
                DB::table('input_realisasi_pic')->insert($data);
            }        
        }
        //update laporan capaian
        DB::table('laporan_capaian')
                ->where('id', '=', $inputrealisasi->laporan_capaian_id)
                ->update(['realisasi' => $inputrealisasi->realisasi]);
        return Redirect::route('input-realisasi.index-indikator', $laporancapaian->id);
    }
    
    public function importKompositor(\Illuminate\Http\Request $request){
        $id = $request->input('laporan_capaian_id');
        $laporan_capaian = \App\Models\LaporanCapaian::where('id', $id)->first();
        //check active periode
        $periode = DB::table('periode')
                ->where('status', '=', 'Active')
                ->get();
        //$indikator_periode = \App\Models\IndikatorPeriode::where('id', $laporan_capaian->indikator_periode_id)->first();
        $indikator = \App\Models\Indikator::where('id', $laporan_capaian->indikator_id)->first();
        $data['message'] = 'Undefined message';
        if ($periode->count() == 1) {
            $result = DB::table('indikator_kompositor')
                        ->where('indikator_id', '=', $indikator->id)
                        ->get();
            if($result->count() > 0){
                foreach ($result as $row) {                    
                            $object = new InputRealisasi();
                            $object->indikator_kompositor_id = $row->id;
                            $object->triwulan_id = $laporan_capaian->triwulan_id;
                            $object->periode_id = $laporan_capaian->periode_id;
                            $object->laporan_capaian_id = $laporan_capaian->id;
                            $object->save();                        
                    $data['result'][$row->id] = 'Import '.$row->nama_kompositor.' successfull';
                    $data['message'] = 'Import successfull';
                }
            }
        }
        
        return Redirect::back()->with($data);
    }
    
    public function calculateRealization(\Illuminate\Http\Request $request)
    {
        $id = $request->input('input_realisasi_id');
        $input_realisasi = InputRealisasi::where('id', $id)->first();
        $indikator_kompositor = \App\Models\IndikatorKompositor::where('id', $input_realisasi->indikator_kompositor_id)->first();
        $nama_kompositor = $indikator_kompositor->nama_kompositor;
        $realisasi = 0;
        switch ($nama_kompositor){
            case 'Indeks Ketersediaan Hulu Minyak':
                $res_realisasi = InputRealisasi::query()
                    ->join('indikator_kompositor', 'input_realisasi.indikator_kompositor_id', '=', 'indikator_kompositor.id')
                    ->join('indikator','indikator_kompositor.indikator_id', '=', 'indikator.id')
                    ->join('indeks', 'indikator_kompositor.indeks_id', '=', 'indeks.id')
                    ->where('nama_indeks', 'Like', 'Indeks Ketersediaan Hulu Minyak')
                    ->select('input_realisasi.*', 
                            'indikator_kompositor.nama_kompositor',
                            'indeks.nama_indeks')->get();
                
                foreach($res_realisasi as $realisasi){
                    
                }
                break;
            case 'Indeks Ketersediaan Hulu Gas':
                $res_realisasi = InputRealisasi::query()
                    ->join('indikator_kompositor', 'input_realisasi.indikator_kompositor_id', '=', 'indikator_kompositor.id')
                    ->join('indikator','indikator_kompositor.indikator_id', '=', 'indikator.id')
                    ->join('indeks', 'indikator_kompositor.indeks_id', '=', 'indeks.id')
                    ->where('nama_indeks', 'Like', 'Indeks Ketersediaan Hulu Gas')
                    ->select('input_realisasi.*', 
                            'indikator_kompositor.nama_kompositor',
                            'indeks.nama_indeks')->get();
                
                foreach($res_realisasi as $realisasi){
                    
                }
                break;
            case 'Indeks Ketersediaan Hulu Migas':
                $res_realisasi = InputRealisasi::query()
                    ->join('indikator_kompositor', 'input_realisasi.indikator_kompositor_id', '=', 'indikator_kompositor.id')
                    ->join('indikator','indikator_kompositor.indikator_id', '=', 'indikator.id')
                    ->join('indeks', 'indikator_kompositor.indeks_id', '=', 'indeks.id')
                    ->where('nama_indeks', 'Like', 'Indeks Ketersediaan Hulu Migas')
                    ->select('input_realisasi.*', 
                            'indikator_kompositor.nama_kompositor',
                            'indeks.nama_indeks')->get();
                
                foreach($res_realisasi as $realisasi){
                    
                }
                break;            
            case 'Indeks Ketersediaan BBM':
                $res_realisasi = InputRealisasi::query()
                    ->join('indikator_kompositor', 'input_realisasi.indikator_kompositor_id', '=', 'indikator_kompositor.id')
                    ->join('indikator','indikator_kompositor.indikator_id', '=', 'indikator.id')
                    ->join('indeks', 'indikator_kompositor.indeks_id', '=', 'indeks.id')
                    ->where('nama_indeks', 'like', 'Indeks Ketersediaan BBM')
                    ->select('input_realisasi.*', 
                            'indikator_kompositor.nama_kompositor',
                            'indeks.nama_indeks')->get();
                //$data['result'] = $res_realisasi;
                $realisasi_produksi_bbm = 0; $kuota_impor_bbm = 0; $kuota_ekspor_bbm = 0;
                $realisasi_impor_bbm = 0; $realisasi_ekspor_bbm = 0;
                foreach($res_realisasi as $realisasi){
                    if(trim($realisasi->nama_kompositor) == 'Realisasi Produksi BBM'){                        
                        $realisasi_produksi_bbm = $realisasi->realisasi;
                    }elseif(trim($realisasi->nama_kompositor) == 'Kuota Impor BBM'){
                        $kuota_impor_bbm = $realisasi->realisasi;
                    }elseif(trim($realisasi->nama_kompositor) == 'Kuota Ekspor BBM'){
                        $kuota_ekspor_bbm = $realisasi->realisasi;
                    }elseif(trim($realisasi->nama_kompositor) == 'Realisasi Impor BBM'){
                        $realisasi_impor_bbm = $realisasi->realisasi;
                    }elseif(trim($realisasi->nama_kompositor) == 'Realisasi Ekspor BBM'){
                        $realisasi_ekspor_bbm =$realisasi->realisasi;
                    }                    
                }
                $realisasi = (($realisasi_produksi_bbm + $kuota_impor_bbm) - $kuota_ekspor_bbm) / (($realisasi_produksi_bbm + $realisasi_impor_bbm) - $realisasi_ekspor_bbm);
                break;
            case 'Indeks Ketersediaan LPG':
                $res_realisasi = InputRealisasi::query()
                    ->join('indikator_kompositor', 'input_realisasi.indikator_kompositor_id', '=', 'indikator_kompositor.id')
                    ->join('indikator','indikator_kompositor.indikator_id', '=', 'indikator.id')
                    ->join('indeks', 'indikator_kompositor.indeks_id', '=', 'indeks.id')
                    ->where('nama_indeks', 'Like', 'Indeks Ketersediaan LPG')
                    ->select('input_realisasi.*', 
                            'indikator_kompositor.nama_kompositor',
                            'indeks.nama_indeks')->get();
                
                foreach($res_realisasi as $realisasi){
                    
                }
                break;
            case 'Indeks Ketersediaan LNG':
                $res_realisasi = InputRealisasi::query()
                    ->join('indikator_kompositor', 'input_realisasi.indikator_kompositor_id', '=', 'indikator_kompositor.id')
                    ->join('indikator','indikator_kompositor.indikator_id', '=', 'indikator.id')
                    ->join('indeks', 'indikator_kompositor.indeks_id', '=', 'indeks.id')
                    ->where('nama_indeks', 'Like', 'Indeks Ketersediaan LNG')
                    ->select('input_realisasi.*', 
                            'indikator_kompositor.nama_kompositor',
                            'indeks.nama_indeks')->get();
                
                foreach($res_realisasi as $realisasi){
                    
                }
                break;
            case 'Indeks Fasilitas Niaga Migas':
                break;
            case 'Indeks Fasilitas Pengolahan Migas':
                break;
            case 'Fasilitasi Peningkatan Infrastruktur Kilang Minyak Bumi':
                break;
            case 'Indeks Fasilitas Penyimpanan Migas':
                break;
            case 'Indeks Aksesibilitas Migas':
                break;
        }
        $data['realisasi'] = round($realisasi, 2);
        return json_encode($data);
    }
}
