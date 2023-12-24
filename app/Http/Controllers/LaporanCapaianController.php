<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\LaporanCapaian;
use App\Http\Resources\LaporanCapaianCollection;
use App\Http\Resources\LaporanCapaianResource;
use App\Http\Requests\LaporanCapaianRequest;
use Illuminate\Support\Facades\DB;


class LaporanCapaianController extends Controller {

    //
    public function create() {
        return Inertia::render('LaporanCapaian/FormLaporanCapaian', [
                    'indikators' => \App\Models\Indikator::all(),
                    'periodes' => \App\Models\Periode::all(),
                    'pics' => \App\Models\PIC::all(),
                    'triwulan' => \App\Models\Triwulan::all()
        ]);
    }

    public function destroy() {
        
    }

    public function edit(LaporanCapaian $laporancapaian) {
        return Inertia::render('LaporanCapaian/EditLaporanCapaian', [
                    'laporan_capaian' => new LaporanCapaianResource(
                            $laporancapaian->query()->where('id', '=', $laporancapaian->id)
                                    ->with('laporanCapaianPic')
                                    ->with('indikator')->get()),
                    //'indikator_periode' => \App\Models\IndikatorPeriode::where('id', $laporancapaian->indikator_periode_id)->first(),
                    'indikators' => \App\Models\Indikator::all(),
                    'periodes' => \App\Models\Periode::all(),
                    'pics' => \App\Models\PIC::all(),
                    'triwulans' => \App\Models\Triwulan::all()
        ]);
    }

    public function index() {
        
        $select = LaporanCapaian::query()
                ->join('indikator', 'laporan_capaian.indikator_id', '=', 'indikator.id')
                ->join('periode', 'laporan_capaian.periode_id', '=', 'periode.id')
                ->join('level', 'indikator.level_id', '=', 'level.id')
                ->join('satuan', 'indikator.satuan_id', '=', 'satuan.id')
                ->with('kinerjaTriwulan')
                ->with('laporanCapaianPic')
                ->with('inputRealisasi')
                ->when(Request::input('flevel'), function ($query, $search) {
                    if ($search != '') {
                        $query->where('level.nama_level', 'like', "%{$search}%");
                    }
                })
                ->when(Request::input('fpic'), function ($query, $search) {
                    if ($search != '') {
                        $query->join('laporan_capaian_pic', 'laporan_capaian.id', '=', 'laporan_capaian_pic.laporan_capaian_id');
                        $query->where('laporan_capaian_pic.nama_pic', 'like', "%{$search}%");
                    }
                })
                ->when(Request::input('findikator'), function ($query, $search) {
                    if ($search != '') {
                        $query->where('indikator.nama_indikator', 'like', "%{$search}%");
                    }
                })
                ->when(Request::input('fperiode'), function ($query, $search) {
                    if ($search != '') {
                        $query->where('periode.periode', '=', "{$search}");
                    }
                })
                ->select('laporan_capaian.*',
                        'indikator.nama_indikator',
                        'indikator.numbering',
                        'periode.periode',
                        'level.nama_level',
                        'satuan.nama_satuan')
                ->paginate();
        
        return Inertia::render('LaporanCapaian/ListLaporanCapaian', [
                    //'filter' => Request::all('search', 'trashed'),
                    'laporan_capaians' => $select,
                    'levels' => \App\Models\Level::all()
        ]);
    }

    public function store(LaporanCapaianRequest $request) {
        $validRequest = $request->validated();
        $object = new LaporanCapaian();
        $object->create($validRequest);
        return Redirect::route('laporan-capaian.index');
    }

    public function update(LaporanCapaian $laporancapaian, LaporanCapaianRequest $request) {
        $laporancapaian->update(
                $request->validated()
        );
        $pics = $request->input('laporan_capaian_pic');
        if (is_array($pics)) {
            DB::table('laporan_capaian_pic')
                    ->where('laporan_capaian_id', '=', $laporancapaian->id)
                    ->delete();
            foreach ($pics as $pic) {
                $data = ['laporan_capaian_id' => $laporancapaian->id,
                    'pic_id' => $pic['value'],
                    'nama_pic' => $pic['label']];
                DB::table('laporan_capaian_pic')->insert($data);
            }
        }
        return Redirect::route('laporan-capaian.index');
    }

    public function _importTarget() {
        //check active periode
        $periode = DB::table('periode')
                ->where('status', '=', 'Active')
                ->get();

        //retrieve indikators data
        $indikators = null;
        $data['message'] = 'Undefined message';
        if ($periode->count() == 1) {
            //loop through indikators
            $indikators = DB::table('indikator')
                    ->select('indikator_periode.*')
                    ->leftJoin('indikator_periode', 'indikator.id', '=', 'indikator_periode.indikator_id')
                    ->leftJoin('laporan_capaian', 'indikator_periode.id', '=', 'laporan_capaian.indikator_periode_id')
                    ->whereNull('laporan_capaian.id')
                    ->get();

            //insert or update into indikator periode
            if ($indikators->count() > 1) {
                for ($i = 0; $i < $indikators->count(); $i++) {
                    //looping for triwulan
                    $triwulans = DB::table('triwulan')->get();
                    if ($triwulans->count() > 0) {
                        for ($j = 0; $j < $triwulans->count(); $j++) {
                            $indikator_periode = $indikators[$i];
                            $triwulan = $triwulans[$j];
                            $obj_lap_capaian = new LaporanCapaian();
                            $obj_lap_capaian->indikator_periode_id = $indikator_periode->id;
                            $obj_lap_capaian->periode_id = $periode->first()->id;
                            $obj_lap_capaian->triwulan_id = $triwulan->id;
                            $res = $obj_lap_capaian->save();
                        }
                    }
                    if ($res) {
                        $data['result'][$i] = 'Import ' . $indikator_periode->id . ' successfull';
                        //echo 'imported</br>';
                    }
                }
            } else {
                $data['message'] = 'No indikator left';
            }
        } else {
            $data['message'] = 'No Active Periode Found';
        }
        $json_data = json_encode($data);
        return Redirect::back()->with($json_data);
    }

    public function importIndikator() {
        //check active periode
        $periode = DB::table('periode')
                        ->where('status', '=', 'Active')
                        ->get()->first();

        //retrieve indikators data
        $indikators = null;
        $data['message'] = 'Undefined message';
        if (is_object($periode)) {
            //loop through indikators
            $indikators = DB::table('indikator')
                    ->select('indikator.*')
                    ->leftJoin('laporan_capaian', 'indikator.id', '=', 'laporan_capaian.indikator_id')
                    ->whereNull('laporan_capaian.id')
                    ->get();

            //insert or update into 
            if ($indikators->count() > 1) {
                foreach ($indikators as $row) {
                    //model indikator
                    $indikator = \App\Models\Indikator::where('id', $row->id)->first();

                    //insert laporan capaian
                    $data_lap_cap = ['indikator_id' => $indikator->id,
                        'periode_id' => $periode->id];
                    $obj_lap_capaian = LaporanCapaian::create($data_lap_cap);
                    //insert laporan capaian pic
                    $indikator_pics = $indikator->indikatorPics;
                    if (count($indikator_pics) > 0) {
                        foreach ($indikator_pics as $pic) {
                            $pic_data = ['laporan_capaian_id' => $obj_lap_capaian->id,
                                'pic_id' => $pic->pic_id,
                                'nama_pic' => $pic->nama_pic];
                            $lap_pic = \App\Models\LaporanCapaianPic::create($pic_data);
                        }
                    }

                    //insert kinerja triwulan
                    $triwulans = DB::table('triwulan')->get();
                    if ($triwulans->count() > 0) {
                        foreach ($triwulans as $triwulan) {
                            //insert kinerja triwulan                            
                            $data_kinerja = ['laporan_capaian_id' => $obj_lap_capaian->id,
                                'kinerja' => 0,
                                'triwulan_id' => $triwulan->id];
                            \App\Models\KinerjaTriwulan::create($data_kinerja);
                            
                            //insert input realisasi
                            $object = [
                                'triwulan_id' => $triwulan->id,
                                'realisasi' => 0,
                                'laporan_capaian_id' => $obj_lap_capaian->id
                            ];
                            $obj_input_realisasi = \App\Models\InputRealisasi::where('laporan_capaian_id', $obj_lap_capaian->id)
                                            ->where('triwulan_id', $triwulan->id)->first();
                            if ($obj_input_realisasi === null) {
                                $input = \App\Models\InputRealisasi::create($object);
                            } else {
                                $input = $obj_input_realisasi;
                            }
                            //insert input_realisasi_pic;
                            if ($obj_input_realisasi === null) {
                                $pics = \App\Models\IndikatorPic::where('indikator_id', $indikator->id)->get();
                                foreach ($pics as $pic) {
                                    $temp_lap_pic = ['input_realisasi_id' => $input->id,
                                        'pic_id' => $pic->pic_id,
                                        'nama_pic' => $pic->nama_pic];
                                    \App\Models\InputRealisasiPic::create($temp_lap_pic);
                                }
                            }
                        }
                    }
                }
            } else {
                $data['message'] = 'No indikator left';
            }
        } else {
            $data['message'] = 'No Active Periode Found';
        }

        return Redirect::back()->with('message', 'Import Berhasil!');
    }

    
}
