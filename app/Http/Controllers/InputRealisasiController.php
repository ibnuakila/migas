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

class InputRealisasiController extends Controller {

    //
    public function create() {
        return Inertia::render('InputRealisasi/FormRealisasi', [
                    'triwulan' => \App\Models\Triwulan::all(),
                    'periode' => \App\Models\Periode::all(),
                    'pics' => \App\Models\PIC::all()
        ]);
    }

    public function destroy() {
        
    }

    public function edit(InputRealisasi $inputrealisasi, \App\Models\RealisasiKompositor $realisasikompositor) {
        //$realisasi_kompositor = \App\Models\RealisasiKompositor::where('input_realisasi_id', $inputrealisasi->id)->first();
        $kompositor = \App\Models\Kompositor::where('id', $realisasikompositor->kompositor_id)->first();
        return Inertia::render('InputRealisasi/EditRealisasi', [
                    'input_realisasi' => ($inputrealisasi),
                    'realisasi_kompositor' => ($realisasikompositor),
                    'laporan_capaian' => (\App\Models\LaporanCapaian::find($inputrealisasi->laporan_capaian_id)),
                    'kompositor' => $kompositor,
                    'triwulans' => \App\Models\Triwulan::all(),
                    'periodes' => \App\Models\Periode::all(),
                    'pics' => \App\Models\PIC::all(),
                    'def_pics' => ($this->getPics($inputrealisasi))
        ]);
    }

    function getPics($inputrealisasi) {
        //$indikator_kompositor = \App\Models\Kompositor::where('id', $inputrealisasi->kompositor_id)->first();
        $temp_res = \App\Models\InputRealisasiPic::query()
                        ->where('input_realisasi_id', '=', $inputrealisasi->id)->get();
        $def_pics = [];
        $i = 0;
        foreach ($temp_res as $row) {
            $def_pics[$i] = ['value' => $row->pic_id, 'label' => $row->nama_pic];
            $i++;
        }
        return $def_pics;
    }

    public function index(\App\Models\LaporanCapaian $laporancapaian) {
        return Inertia::render('InputRealisasi/ListInputRealisasi', [
                    'indikator' => DB::table('laporan_capaian')
                            //->join('indikator_periode', 'laporan_capaian.indikator_periode_id', '=', 'indikator_periode.id')
                            ->join('indikator', 'laporan_capaian.indikator_id', '=', 'indikator.id')
                            ->where('laporan_capaian.id', $laporancapaian->id)->get(),
                    'input_realisasis' => InputRealisasi::query()
                            ->join('kompositor', 'input_realisasi.kompositor_id', '=', 'kompositor.id')
                            ->join('indikator_kompositor', 'indikator_kompositor.kompositor_id', '=', 'kompositor.id')
                            ->join('indikator', 'indikator_kompositor.indikator_id', '=', 'indikator.id')
                            //->join('indikator_periode', 'indikator.id', '=', 'indikator_periode.indikator_id')
                            ->join('laporan_capaian', 'indikator_periode.id', '=', 'laporan_capaian.indikator_periode_id')
                            ->where('laporan_capaian.id', $laporancapaian->id)
                            ->get()
        ]);
    }

    public function indexIndikator(\App\Models\LaporanCapaian $laporancapaian, \App\Models\Triwulan $triwulan) {
        //$indikator_periode = \App\Models\IndikatorPeriode::where('id', $laporancapaian->indikator_periode_id)->first();
        $indikator = \App\Models\Indikator::where('id', $laporancapaian->indikator_id)->first();
        return Inertia::render('InputRealisasi/ListInputRealisasi', [
                    'laporan_capaian' => $laporancapaian,
                    'indikator' => $indikator,
                    'input_realisasis' => InputRealisasi::query()
                            ->join('triwulan', 'input_realisasi.triwulan_id', '=', 'triwulan.id')
                            ->join('realisasi_kompositor', 'input_realisasi.id', '=', 'realisasi_kompositor.input_realisasi_id')
                            ->join('kompositor', 'realisasi_kompositor.kompositor_id', '=', 'kompositor.id')
                            ->join('indikator_kompositor', 'kompositor.id', '=', 'indikator_kompositor.kompositor_id')
                            ->join('indikator', 'indikator_kompositor.indikator_id', '=', 'indikator.id')
                            ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                            ->join('jenis_kompositor', 'kompositor.jenis_kompositor_id', '=', 'jenis_kompositor.id')
                            ->where('input_realisasi.laporan_capaian_id', $laporancapaian->id)
                            ->where('input_realisasi.triwulan_id', $triwulan->id)
                            ->select('input_realisasi.*',
                                    'kompositor.nama_kompositor',
                                    'kompositor.satuan',
                                    'triwulan.triwulan',
                                    'indeks.nama_indeks',
                                    'jenis_kompositor.nama_jenis_kompositor'
                            )
                            ->with('inputRealisasiPic')
                            ->paginate(),
        ]);
        //return \App\Http\Resources\IndikatorPeriodeCollection::collection($indikator_periode);
    }

    public function laporanCapaianTriwulan(\App\Models\LaporanCapaian $laporancapaian, \App\Models\Triwulan $triwulan) {
        $indikator = \App\Models\Indikator::where('id', $laporancapaian->indikator_id)->first();
        return Inertia::render('InputRealisasi/ListInputRealisasi', [
                    'laporan_capaian' => $laporancapaian,
                    'indikator' => $indikator,
                    'triwulan' => $triwulan,
                    'input_realisasis' => InputRealisasi::query()
                            ->join('triwulan', 'input_realisasi.triwulan_id', '=', 'triwulan.id')
                            ->join('realisasi_kompositor', 'input_realisasi.id', '=', 'realisasi_kompositor.input_realisasi_id')
                            ->join('kompositor', 'realisasi_kompositor.kompositor_id', '=', 'kompositor.id')
                            ->join('indikator_kompositor', 'kompositor.id', '=', 'indikator_kompositor.kompositor_id')
                            ->join('indikator', 'indikator_kompositor.indikator_id', '=', 'indikator.id')
                            ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                            ->join('jenis_kompositor', 'kompositor.jenis_kompositor_id', '=', 'jenis_kompositor.id')
                            ->where('input_realisasi.laporan_capaian_id', $laporancapaian->id)
                            ->where('input_realisasi.triwulan_id', $triwulan->id)
                            ->select('input_realisasi.*',
                                    'triwulan.triwulan',
                                    'realisasi_kompositor.id as realisasi_kompositor_id',
                                    'realisasi_kompositor.nilai',
                                    'kompositor.nama_kompositor',
                                    'kompositor.satuan',
                                    'kompositor.kalkulasi',
                                    'kompositor.sumber_kompositor',
                                    'indeks.nama_indeks',
                                    'jenis_kompositor.nama_jenis_kompositor'
                            )
                            ->with('inputRealisasiPic')
                            ->with('realisasiKompositor')
                            ->paginate(),
        ]);
    }

    public function store(InputRealisasiRequest $request) {
        $validated = $request->validated();
        $object = InputRealisasi::create($validated);
        return Redirect::route('input-realisasi.index-indikator');
    }

    public function update(InputRealisasi $inputrealisasi, InputRealisasiRequest $request) {
        //update input realisasi
        $update_status_1 = $inputrealisasi->update($request->validated());
        
        $validator = \Illuminate\Support\Facades\Validator::make($request->all(),[
                'kompositor_id' => ['required'],
                'input_realisasi_id' => ['required'],
                'nilai' => ['required']                
            ]);
        $validated_realisasi_kompositor = $validator->validated();
        //insert/ update realisasi kompositor
        
        $obj_realisasi_kompositor = \App\Models\RealisasiKompositor::where('kompositor_id', $request->input('kompositor_id'))
                    ->where('input_realisasi_id', $inputrealisasi->id)->first();
        
        if($obj_realisasi_kompositor === null){
            $update_status_2 = \App\Models\RealisasiKompositor::create($validated_realisasi_kompositor);
        }else{
            $update_status_2 = \App\Models\RealisasiKompositor::where('kompositor_id', $request->input('kompositor_id'))
                    ->where('input_realisasi_id', $inputrealisasi->id)
                    ->update($validated_realisasi_kompositor);
        }
        //update input realisasi pic
        $laporancapaian = \App\Models\LaporanCapaian::where('id', $inputrealisasi->laporan_capaian_id)->first();
        $pics = $request->input('pics');
        if (is_array($pics)) {
            DB::table('input_realisasi_pic')
                    ->where('input_realisasi_id', '=', $inputrealisasi->id)
                    ->delete();
            foreach ($pics as $pic) {
                $data = ['input_realisasi_id' => $inputrealisasi->id,
                    'pic_id' => $pic['value'],
                    'nama_pic' => $pic['label']];
                DB::table('input_realisasi_pic')->insert($data);
            }
        }
        
        $message = '';
        if($update_status_1 && $update_status_2){
            $message = "Update berahasil!";
        }else{
            $message = "Update gagal!";
        }
        return Redirect::back()->with('message', $message);
    }

    public function importKompositor(\Illuminate\Http\Request $request) {
        $laporan_capaian_id = $request->input('laporan_capaian_id');
        $triwulan_id = $request->input('triwulan_id');
        $laporan_capaian = \App\Models\LaporanCapaian::where('id', $laporan_capaian_id)->first();
        //check active periode
        $periode = DB::table('periode')
                ->where('status', '=', 'Active')
                ->get();
        //$indikator_periode = \App\Models\IndikatorPeriode::where('id', $laporan_capaian->indikator_periode_id)->first();
        $indikator = \App\Models\Indikator::where('id', $laporan_capaian->indikator_id)->first();
        
        $input = InputRealisasi::where('laporan_capaian_id', $laporan_capaian->id)
                        ->where('triwulan_id', $triwulan_id)->first();

        //ambil data kompositor
        $result = DB::table('kompositor')
                ->join('indikator_kompositor', 'kompositor.id', '=', 'indikator_kompositor.kompositor_id')
                ->where('indikator_kompositor.indikator_id', '=', $indikator->id)
                ->select('kompositor.*')
                ->get();
        if ($result->count() > 0) {
            foreach ($result as $row) {
                //insert realisasi kompositor
                $temp_realisasi = [
                    'kompositor_id' => $row->id,
                    'input_realisasi_id' => $input->id,
                    'nilai' => 0
                ];
                $obj_realisasi_kompositor = \App\Models\RealisasiKompositor::where('input_realisasi_id', $input->id)
                                ->where('kompositor_id', $row->id)->first();
                if ($obj_realisasi_kompositor === null) {
                    \App\Models\RealisasiKompositor::create($temp_realisasi);
                }
            }
        }

        return Redirect::back()->with('message', 'Import Berhasil!');
    }

    public function calculateRealization(\Illuminate\Http\Request $request) {
        $id = $request->input('input_realisasi_id');
        $input_realisasi = InputRealisasi::where('id', $id)->first();
        $indikator_kompositor = \App\Models\Kompositor::where('id', $input_realisasi->kompositor_id)->first();
        $result = DB::table('kompositor')
                        ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                        ->where('kompositor.id', $input_realisasi->kompositor_id)
                        ->get()->first();
        $nama_indeks = $result->nama_kompositor;
        $realisasi = 0;
        switch ($nama_indeks) {
            case 'Indeks Ketersediaan Migas':
                $res_realisasi = DB::table('indikator')
                                ->join('indikator_kompositor', 'indikator.id', '=', 'indikator_kompositor.indikator_id')
                                ->join('kompositor', 'indikator_kompositor.kompositor_id', '=', 'kompositor.id')
                                ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                                ->join('input_realisasi', 'input_realisasi.kompositor_id', '=', 'kompositor.id')
                                ->where('indeks.nama_indeks', 'Like', 'Indeks Ketersediaan Migas')
                                ->select('input_realisasi.*',
                                        'kompositor.*')->get();
                $indeks_ketersediaan_hulu_migas = 0;
                $indeks_ketersediaan_bbm = 0;
                $indeks_ketersediaan_lpg = 0;
                $indeks_ketersediaan_lng = 0;
                foreach ($res_realisasi as $realisasi) {
                    if (trim($realisasi->nama_kompositor) == 'Indeks Ketersediaan Hulu Migas') {
                        $indeks_ketersediaan_hulu_migas = $realisasi->realisasi;
                    } elseif (trim($realisasi->nama_kompositor) == 'Indeks Ketersediaan BBM') {
                        $indeks_ketersediaan_bbm = $realisasi->realisasi;
                    } elseif (trim($realisasi->nama_kompositor) == 'Indeks Ketersediaan LPG') {
                        $indeks_ketersediaan_lpg = $realisasi->realisasi;
                    } elseif (trim($realisasi->nama_kompositor) == 'Indeks Ketersediaan LNG') {
                        $indeks_ketersediaan_lng = $realisasi->realisasi;
                    }
                }
                $realisasi = ($indeks_ketersediaan_hulu_migas + $indeks_ketersediaan_bbm + $indeks_ketersediaan_lpg + $indeks_ketersediaan_lng) / 4;
                break;
            case 'Indeks Ketersediaan Hulu Minyak':
                $res_realisasi = DB::table('indikator')
                                ->join('indikator_kompositor', 'indikator.id', '=', 'indikator_kompositor.indikator_id')
                                ->join('kompositor', 'indikator_kompositor.kompositor_id', '=', 'kompositor.id')
                                ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                                ->join('input_realisasi', 'input_realisasi.kompositor_id', '=', 'kompositor.id')
                                ->where('indeks.nama_indeks', 'Like', 'Indeks Ketersediaan Hulu Minyak')
                                ->select('input_realisasi.*',
                                        'kompositor.*')->get();
                $realisasi_produksi_lifting_minyak = 0;
                $realisasi_impor_minyak = 0;
                $realisasi_ekspor_minyak = 0;
                $kebutuhan_kilang_minyak = 0;
                foreach ($res_realisasi as $realisasi) {
                    if (trim($realisasi->nama_kompositor) == 'Realisasi Produksi/Lifting Minyak') {
                        $realisasi_produksi_lifting_minyak = $realisasi->realisasi;
                    } elseif (trim($realisasi->nama_kompositor) == 'Realisasi Impor Minyak') {
                        $realisasi_impor_minyak = $realisasi->realisasi;
                    } elseif (trim($realisasi->nama_kompositor) == 'Realisasi Ekspor Minyak') {
                        $realisasi_ekspor_minyak = $realisasi->realisasi;
                    } elseif (trim($realisasi->nama_kompositor) == 'Kebutuhan Kilang Minyak') {
                        $kebutuhan_kilang_minyak = $realisasi->realisasi;
                    }
                }
                $realisasi = (($realisasi_produksi_lifting_minyak + $realisasi_impor_minyak) - $realisasi_ekspor_minyak) / $kebutuhan_kilang_minyak;
                break;
            case 'Indeks Ketersediaan Hulu Gas':
                $res_realisasi = DB::table('indikator')
                                ->join('indikator_kompositor', 'indikator.id', '=', 'indikator_kompositor.indikator_id')
                                ->join('kompositor', 'indikator_kompositor.kompositor_id', '=', 'kompositor.id')
                                ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                                ->join('input_realisasi', 'input_realisasi.kompositor_id', '=', 'kompositor.id')
                                ->where('indeks.nama_indeks', 'Like', 'Indeks Ketersediaan Hulu Gas')
                                ->select('input_realisasi.*',
                                        'kompositor.*')->get();
                $realisasi_produksi_lifting_gas_bumi_bbtu = 0;
                $realisasi_alokasi_dom = 0;
                foreach ($res_realisasi as $realisasi) {
                    if (trim($realisasi->nama_kompositor) == 'Realisasi Produksi/Lifting Gas Bumi BBTU') {
                        $realisasi_produksi_lifting_gas_bumi_bbtu = $realisasi->realisasi;
                    } elseif (trim($realisasi->nama_kompositor) == 'Realisasi Alokasi Gas Dom') {
                        $realisasi_alokasi_dom = $realisasi->realisasi;
                    }
                }
                $realisasi = ($realisasi_produksi_lifting_gas_bumi_bbtu / $realisasi_alokasi_dom);
                break;
            case 'Indeks Ketersediaan Hulu Migas':
                $res_realisasi = DB::table('indikator')
                                ->join('indikator_kompositor', 'indikator.id', '=', 'indikator_kompositor.indikator_id')
                                ->join('kompositor', 'indikator_kompositor.kompositor_id', '=', 'kompositor.id')
                                ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                                ->join('input_realisasi', 'input_realisasi.kompositor_id', '=', 'kompositor.id')
                                ->where('indeks.nama_indeks', 'Like', 'Indeks Ketersediaan Hulu Migas')
                                ->select('input_realisasi.*',
                                        'kompositor.*')->get();
                $indeks_ketersediaan_hulu_minyak = 0;
                $indeks_ketersediaan_hulu_gas = 0;
                foreach ($res_realisasi as $realisasi) {
                    if (trim($realisasi->nama_kompositor) == 'Indeks Ketersediaan Hulu Minyak') {
                        $indeks_ketersediaan_hulu_minyak = $realisasi->realisasi;
                    } elseif (trime($realisasi->nama_kompositor) == 'Indeks Ketersediaan Hulu Gas') {
                        $indeks_ketersediaan_hulu_gas = $realisasi->realisasi;
                    }
                }
                $realisasi = ($indeks_ketersediaan_hulu_minyak + $indeks_ketersediaan_hulu_gas) / 2;
                break;
            case 'Indeks Ketersediaan BBM':
                $res_realisasi = DB::table('indikator')
                                ->join('indikator_kompositor', 'indikator.id', '=', 'indikator_kompositor.indikator_id')
                                ->join('kompositor', 'indikator_kompositor.kompositor_id', '=', 'kompositor.id')
                                ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                                ->join('input_realisasi', 'input_realisasi.kompositor_id', '=', 'kompositor.id')
                                ->where('indeks.nama_indeks', 'Like', 'Indeks Ketersediaan BBM')
                                ->select('input_realisasi.*',
                                        'kompositor.*')->get();
                $data['result'] = $res_realisasi;
                $realisasi_produksi_bbm = 0;
                $kuota_impor_bbm = 0;
                $kuota_ekspor_bbm = 0;
                $realisasi_impor_bbm = 0;
                $realisasi_ekspor_bbm = 0;
                foreach ($res_realisasi as $realisasi) {
                    if (trim($realisasi->nama_kompositor) == 'Realisasi Produksi BBM') {
                        $realisasi_produksi_bbm = $realisasi->realisasi;
                    } elseif (trim($realisasi->nama_kompositor) == 'Kuota Impor BBM') {
                        $kuota_impor_bbm = $realisasi->realisasi;
                    } elseif (trim($realisasi->nama_kompositor) == 'Kuota Ekspor BBM') {
                        $kuota_ekspor_bbm = $realisasi->realisasi;
                    } elseif (trim($realisasi->nama_kompositor) == 'Realisasi Impor BBM') {
                        $realisasi_impor_bbm = $realisasi->realisasi;
                    } elseif (trim($realisasi->nama_kompositor) == 'Realisasi Ekspor BBM') {
                        $realisasi_ekspor_bbm = $realisasi->realisasi;
                    }
                }
                $realisasi = (($realisasi_produksi_bbm + $kuota_impor_bbm) - $kuota_ekspor_bbm) / (($realisasi_produksi_bbm + $realisasi_impor_bbm) - $realisasi_ekspor_bbm);
                break;
            case 'Indeks Ketersediaan LPG':
                $res_realisasi = DB::table('indikator')
                                ->join('indikator_kompositor', 'indikator.id', '=', 'indikator_kompositor.indikator_id')
                                ->join('kompositor', 'indikator_kompositor.kompositor_id', '=', 'kompositor.id')
                                ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                                ->join('input_realisasi', 'input_realisasi.kompositor_id', '=', 'kompositor.id')
                                ->where('indeks.nama_indeks', 'Like', 'Indeks Ketersediaan LPG')
                                ->select('input_realisasi.*',
                                        'kompositor.*')->get();
                $realisasi_produksi_lpg = 0;
                $kuota_impor_lpg = 0;
                $kuota_ekspor_lpg = 0;
                $realisasi_impor_lpg = 0;
                $realisasi_ekspor_lpg = 0;
                foreach ($res_realisasi as $realisasi) {
                    if (trim($realisasi->nama_kompositor) == 'Realisasi Produksi LPG') {
                        $realisasi_produksi_lpg = $realisasi->realisasi;
                    } elseif (trim($realisasi->nama_kompositor) == 'Kuota Impor LPG ') {
                        $kuota_impor_lpg = $realisasi->realisasi;
                    } elseif (trim($realisasi->nama_kompositor) == 'Kuota Ekspor LPG ') {
                        $kuota_ekspor_lpg = $realisasi->realisasi;
                    } elseif (trim($realisasi->nama_kompositor) == 'Realisasi Impor LPG') {
                        $realisasi_impor_lpg = $realisasi->realisasi;
                    } elseif (trim($realisasi->nama_kompositor) == 'Realisasi Ekspor LPG ') {
                        $realisasi_ekspor_lpg = $realisasi->realisasi;
                    }
                }
                $realisasi = (($realisasi_produksi_lpg + $kuota_impor_lpg) - $kuota_ekspor_lpg) / (($realisasi_produksi_lpg + $realisasi_impor_lpg) - $realisasi_ekspor_lpg);
                break;
            case 'Indeks Ketersediaan LNG':
                $res_realisasi = DB::table('indikator')
                                ->join('indikator_kompositor', 'indikator.id', '=', 'indikator_kompositor.indikator_id')
                                ->join('kompositor', 'indikator_kompositor.kompositor_id', '=', 'kompositor.id')
                                ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                                ->join('input_realisasi', 'input_realisasi.kompositor_id', '=', 'kompositor.id')
                                ->where('indeks.nama_indeks', 'Like', 'Indeks Ketersediaan LNG')
                                ->select('input_realisasi.*',
                                        'kompositor.*')->get();

                foreach ($res_realisasi as $realisasi) {
                    
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
