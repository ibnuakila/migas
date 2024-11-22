<?php

namespace App\Http\Controllers;

//use Illuminate\Http\Request;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;
use App\Models\KinerjaTriwulan;
use App\Http\Requests\KinerjaTriwulanRequest;
use MathPHP\Statistics\Regression;

class InputKinerjaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(KinerjaTriwulanRequest $request)
    {
        $validated = $request->validate();
        $kinerja_triwulan = KinerjaTriwulan::where('laporan_capaian_id',$request->laporan_capaian_id)
                ->where('triwulan_id', $request->triwulan_id)->first();
        if($kinerja_triwulan !== null){
            KinerjaTriwulan::create($validated);
        }else{
            KinerjaTriwulan::where('laporan_capaian_id',$request->laporan_capaian_id)
                ->where('triwulan_id', $request->triwulan_id)
                    ->update($validated);
            
        }
        $message = '';
        if($update_status_1 && $update_status_2){
            $message = "Update berahasil!";
        }else{
            $message = "Update gagal!";
        }
        return Redirect::back()->with('message', $message);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(\App\Models\LaporanCapaian $laporancapaian, \App\Models\Triwulan $triwulan)
    {
        
        return Inertia::render('InputKinerja/EditKinerja', [                
                'laporan_capaian' => $laporancapaian,
                'kinerja' => KinerjaTriwulan::where('laporan_capaian_id', $laporancapaian->id)
                        ->where('triwulan_id', $triwulan->id)->first(),
                'triwulans' => \App\Models\Triwulan::all(),
                'indikator' => \App\Models\Indikator::where('id', $laporancapaian->indikator_id)->first(),
                'data_format' => \App\Models\DataFormat::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(KinerjaTriwulan $kinerjatriwulan ,KinerjaTriwulanRequest $request)
    {
        //$validate = $request->val
        $validated = $request->validated();
        
        $update_status_1 = $kinerjatriwulan->update($validated);        
        if($update_status_1){
            $message = "Update berhasil!";
        }else{
            $message = "Update gagal!";
        }
        return Redirect::back()->with('message', $message);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
    
    public function calculateKinerja(\Illuminate\Http\Request $request)
    {
        $laporan_capaian_id = $request->input('laporan_capaian_id');
        $triwulan_id = $request->input('triwulan_id');
        $obj_laporan_capaian = \App\Models\LaporanCapaian::where('id', $laporan_capaian_id)->first();        
        $obj_realisasi = \App\Models\InputRealisasi::where('laporan_capaian_id', $laporan_capaian_id)
                ->where('triwulan_id', $triwulan_id)->first();
        $data['laporan_capaian'] = $obj_laporan_capaian;
        $data['input_realisasi'] = $obj_realisasi;
        $indikator = \App\Models\Indikator::where('id', $obj_laporan_capaian->indikator_id)->first();
        $data['nama_indikator'] = $indikator->nama_indikator;
        if($indikator !== null && $obj_laporan_capaian->target !== null){
            switch (trim($indikator->nama_indikator)){
                //IKSP I
                case "Indeks Ketersediaan Migas":
                    $target = $obj_laporan_capaian->target;
                    $realisasi = $obj_realisasi->realisasi;
                    $kinerja = 0;
                    if($realisasi > 1.3){
                        $kinerja = 1 - (abs($realisasi - 1.3)/ 1.3);
                    }else if($realisasi > 1){
                        $points = [
                                    [1.00, 1],
                                    [1.15, 1.1],
                                    [1.30, 1.2]
                                ];   
                        $regression = new Regression\Linear($points);
                        $parameters = $regression->getParameters();          // [m => 1.2209302325581, b => 0.6046511627907]
                        $equation   = $regression->getEquation();            // y = 1.2209302325581x + 0.6046511627907
                        $y          = $regression->evaluate($realisasi);  
                        $kinerja    = $y;
                    }else{
                        $kinerja = $realisasi / $target;
                    }
                    $data['kinerja'] = $kinerja;
                    break;
                case "Indeks Ketersediaan Hulu Migas":
                    $target = $obj_laporan_capaian->target;
                    $realisasi = $obj_realisasi->realisasi;
                    $kinerja = 0;
                    if($realisasi < 1){
                        $kinerja = $realisasi / $target;
                    }elseif(1 <= $realisasi && $realisasi < 1.2){
                        $kinerja = 1 + (abs($realisasi - $target)/ $target);
                    }else{
                        $kinerja = 120/100;
                    }
                    $data['kinerja'] = $kinerja;
                    break;
                case "Produksi Minyak dan Gas Bumi":
                    $target = $obj_laporan_capaian->target;
                    $realisasi = $obj_realisasi->realisasi;
                    $kinerja = $realisasi / $target;
                    $data['kinerja'] = $kinerja;
                    break;
                case "Produksi Minyak Bumi":
                    $target = $obj_laporan_capaian->target;
                    $realisasi = $obj_realisasi->realisasi;
                    $kinerja = $realisasi / $target;
                    $data['kinerja'] = $kinerja;
                    break;
                case "Produksi Gas Bumi":
                    $target = $obj_laporan_capaian->target;
                    $realisasi = $obj_realisasi->realisasi;
                    $kinerja = $realisasi / $target;
                    $data['kinerja'] = $kinerja;
                    break;
                case "Persentase Pemanfaatan Gas Bumi Domestik":
                    break;
                case "Deviasi Kuantitas Ekspor Minyak Mentah dari kuantitas yang Direkomendasikan":
                    break;
                case "Deviasi Kuantitas Ekspor LNG skema hulu dari kuantitas yang direkomendasikan":
                    break;
                case "Indeks Ketersediaan BBM":
                    $target = $obj_laporan_capaian->target;
                    $realisasi = $obj_realisasi->realisasi;
                    $kinerja = 0;
                    if($realisasi > 1.3){
                        $kinerja = 1 - (abs($realisasi - 1.3)/ 1.3);
                    }else if($realisasi > 1){
                        $points = [
                                    [1.00, 1],
                                    [1.15, 1.1],
                                    [1.30, 1.2]
                                ];   
                        $regression = new Regression\Linear($points);
                        $parameters = $regression->getParameters();          // [m => 1.2209302325581, b => 0.6046511627907]
                        $equation   = $regression->getEquation();            // y = 1.2209302325581x + 0.6046511627907
                        $y          = $regression->evaluate($realisasi);  
                        $kinerja    = $y;
                    }else{
                        $kinerja = $realisasi / $target;
                    }
                    $data['kinerja'] = $kinerja;
                    break;
                case "Produksi BBM dan Hasil Olahan":
                    $target = $obj_laporan_capaian->target;
                    $realisasi = $obj_realisasi->realisasi;
                    $kinerja = $realisasi / $target;

                    $data['kinerja'] = $kinerja;
                    break;
                case "Deviasi Kuantitas Impor Minyak Mentah untuk Feedstock Kilang dari Kuantitas yang Direkomendasikan":
                    break;
                
                case "Deviasi Kuantitas Impor BBM dari Kuantitas yang Direkomendasikan":
                    break;
                
                case "Deviasi Kuantitas Ekspor BBM dari Kuantitas yang Direkomendasikan":
                    break;
                case "Deviasi Realisasi Pencampuran BBN Jenis Biodiesel terhadap Target Mandatory Pencampuran BBN jenis Biodiesel":
                    break;
                case "Indeks Ketersediaan LPG":
                    $target = $obj_laporan_capaian->target;
                    $realisasi = $obj_realisasi->realisasi;
                    $kinerja = 0;
                    if($realisasi > 1.3){
                        $kinerja = 1 - (abs($realisasi-1.3)/1.3);
                    }elseif($realisasi > 1){
                        $points = [
                                    [1.00, 1],
                                    [1.15, 1.1],
                                    [1.30, 1.2]
                                ];   
                        $regression = new Regression\Linear($points);
                        $parameters = $regression->getParameters();          // [m => 1.2209302325581, b => 0.6046511627907]
                        $equation   = $regression->getEquation();            // y = 1.2209302325581x + 0.6046511627907
                        $y          = $regression->evaluate($realisasi);  
                        $kinerja    = $y;
                    }else{
                        $kinerja = $realisasi / $target;
                    }
                    $data['kinerja'] = $kinerja;
                    break;
                case "Produksi LPG":
                    break;
                case "Deviasi kuantitas Impor LPG dari kuantitas yang direkomendasikan":
                    break;
                case "Deviasi kuantitas ekspor LPG dari kuantitas yang direkomendasikan":
                    break;
                case "Penyediaan Elpiji 3 kg bagi Masyarakat, Usaha Mikro, Nelayan, dan Petani Sasaran":
                    break;
                case "Persentase Realisasi Volume LPG Bersubsidi terhadap Kuota Yang Ditetapkan":
                    break;
                case "Indeks Ketersediaan LNG":
                    $target = $obj_laporan_capaian->target;
                    $realisasi = $obj_realisasi->realisasi;
                    $kinerja = 0;
                    if($realisasi < 1){
                        $kinerja = $realisasi / $target;
                    }elseif(1 <= $realisasi && $realisasi < 1.2){
                        $kinerja = 1 + (abs($realisasi - $target)/ $target);
                    }else{
                        $kinerja = 120/100;
                    }
                    $data['kinerja'] = $kinerja;
                    break;
                case "Produksi LNG":
                    break;
                case "Deviasi Kuantitas Ekspor Hasil Pengolahan yang Direkomendasikan":
                    break;
                case "Deviasi Kuantitas Ekspor LNG Skema Hilir (Trading) dari Kuantitas yang Direkomendasikan":
                    break;
                case "Reserve to Production Ratio Minyak Bumi":
                    break;
                case "Reserve to Production Ratio Gas Bumi":
                    break;
                case "Jumlah Sumber Daya Migas Pada Masa Eksplorasi":
                    break;
                case "Jumlah Rekomendasi POD I yang disetujui oleh Dirjen":
                    break;
                case "Jumlah Evaluasi Persetujuan Pengalihan Participating Interest 10%":
                    break;
                case "Jumlah WK yang kontraknya diperpanjang/alih kelola":
                    break;
                case "Jumlah Cadangan Minyak Bumi":
                    break;
                case "Jumlah Cadangan Gas Bumi":
                    break;
                case "Jumlah Hari Cadangan BBM Operasional":
                    break;
                case "Jumlah Hari Cadangan Operasional BBM":
                    break;
                case "Jumlah Hari Cadangan LPG Operasional":
                    break;
                case "Jumlah Hari Cadangan Operasional LPG":
                    break;
                case "Persentase Rekomendasi kebijakan dan Dokumen Perencanaan yang Diterima Oleh Stakeholder":
                    break;
                case "Jumlah Rekomendasi Kebijakan untuk Mendukung Tata Kelola Migas":
                    break;
                case "Jumlah Dokumen Perencanaan Sektor Kemigasan":
                    break;
                //IKSP II
                case "":
                    break;
            }
        }else{
            $data['response'] = 'Target belum diisi';
            $data['kinerja'] = 0;
        }
        return json_encode($data);
    }
}
