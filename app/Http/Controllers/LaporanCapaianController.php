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

class LaporanCapaianController extends Controller //implements ICrud {
{
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
        $select = DB::table('laporan_capaian')
                //->join('indikator_periode', 'laporan_capaian.indikator_periode_id', '=', 'indikator_periode.id')
                ->join('indikator', 'laporan_capaian.indikator_id', '=', 'indikator.id')
                ->join('periode', 'laporan_capaian.periode_id', '=', 'periode.id')
                ->join('triwulan', 'laporan_capaian.triwulan_id', '=', 'triwulan.id')
                ->join('level', 'indikator.level_id', '=', 'level.id')
                ->join('satuan', 'indikator.satuan_id', '=', 'satuan.id')
                ->when(Request::input('search'), function ($query, $search) {
                    //$query->join('indikator_periode', 'laporan_capaian.indikator_periode_id','=', 'indikator_periode.id')
                    //->join('indikator', 'indikator_periode.indikator_id','=', 'indikator.id')
                    $query->where('indikator.nama_indikator', 'like', "%{$search}%");
                })
                ->select('laporan_capaian.id',
                        'laporan_capaian.realisasi',
                        'laporan_capaian.kinerja',
                        'laporan_capaian.sumber_data',
                        'laporan_capaian.target',
                        'indikator.nama_indikator',
                        'indikator.satuan_id',
                        'satuan.nama_satuan',
                        'indikator.level_id',
                        'level.nama_level',
                        'indikator.ordering',
                        'indikator.numbering',
                        'periode.periode',
                        //'pic.nama_pic',
                        'triwulan.triwulan')
                ->paginate(10);

        return Inertia::render('LaporanCapaian/ListLaporanCapaian', [
                    'filter' => Request::all('search', 'trashed'),
                    'laporan_capaians' => new \Illuminate\Database\Eloquent\Collection($select)
                        //->paginate(10)
                        //new \Illuminate\Database\Eloquent\Collection(
                          /*LaporanCapaian::query()
                            
                          ->when(Request::input('search'), function ($query, $search) {
                            //$query->join('indikator_periode', 'laporan_capaian.indikator_periode_id','=', 'indikator_periode.id')
                            //->join('indikator', 'indikator_periode.indikator_id','=', 'indikator.id')
                            $query->where('indikator.nama_indikator', 'like', "%{$search}%");
                          })
                          //->join('indikator_periode', 'laporan_capaian.indikator_periode_id', '=', 'indikator_periode.id')
                          ->join('indikator', 'laporan_capaian.indikator_id', '=', 'indikator.id')
                          ->join('satuan', 'indikator.satuan_id', '=', 'satuan.id')
                          ->join('level', 'indikator.level_id', '=', 'level.id')
                          ->with('indikator')
                          ->with('periode')
                          ->with('laporanCapaianPic')
                          ->with('triwulan')
                          //->with('level')
                          //->with('indikatorPeriode')
                          //->with('indikator')
                          ->paginate(10)
                          ->withQueryString()
                          ) */
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
                ->get();

        //retrieve indikators data
        $indikators = null;
        $data['message'] = 'Undefined message';
        if ($periode->count() == 1) {
            //loop through indikators
            $indikators = DB::table('indikator')                    
                    ->select('indikator.*')
                    ->leftJoin('laporan_capaian', 'indikator.id', '=', 'laporan_capaian.indikator_id')
                    ->whereNull('laporan_capaian.id')
                    ->get();

            //insert or update into 
            if ($indikators->count() > 1) {
                for ($i = 0; $i < $indikators->count(); $i++) {
                    //model indikator
                    $indikator = \App\Models\Indikator::find($indikators[$i]->id);//->with('indikatorPics')->get();
                    //looping for triwulan
                    $triwulans = DB::table('triwulan')->get();
                    if ($triwulans->count() > 0) {
                        for ($j = 0; $j < $triwulans->count(); $j++) {
                            //$indikator_periode = $indikators[$i];
                            $triwulan = $triwulans[$j];
                            $data = ['indikator_id' => $indikator->id,
                                'periode_id' => $periode->first()->id,
                                'triwulan_id' => $triwulan->id];
                            $obj_lap_capaian = LaporanCapaian::create($data); 
                            $indikator_pics = $indikator->indikatorPics;
                            if(count($indikator_pics)>0){
                                foreach($indikator_pics as $pic){
                                    $pic_data = ['laporan_capaian_id' => $obj_lap_capaian->id,
                                        'pic_id' => $pic->pic_id,
                                        'nama_pic' => $pic->nama_pic];
                                    $lap_pic = \App\Models\LaporanCapaianPic::create($pic_data);
                                }
                            }
                            
                        }
                    }
                    //if ($res) {
                        //$data['result'][$i] = 'Import ' . $indikator_periode->id . ' successfull';
                        //echo 'imported</br>';
                    //}
                }
            } else {
                $data['message'] = 'No indikator left';
            }
        } else {
            $data['message'] = 'No Active Periode Found';
        }
        $json_data = json_encode($data);
        return Redirect::route('laporan-capaian.index');
    }
}
