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

class LaporanCapaianController extends Controller //implements ICrud
{
    //
    public function create() {
        return Inertia::render('LaporanCapaian/FormLaporanCapaian',[
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
            'laporan_capaian' => new LaporanCapaianResource($laporancapaian),
            'indikator_periode' => \App\Models\IndikatorPeriode::where('id', $laporancapaian->indikator_periode_id)->first(),
            'indikators' => \App\Models\Indikator::all(),
            'periodes' => \App\Models\Periode::all(),
            'pics' => \App\Models\PIC::all(),
            'triwulans' => \App\Models\Triwulan::all()
        ]);
    }

    public function index() {
        $select = DB::table('laporan_capaian')
            ->join('indikator_periode', 'laporan_capaian.indikator_periode_id', '=', 'indikator_periode.id')
            ->join('indikator', 'indikator_periode.indikator_id', '=', 'indikator.id')
            ->join('periode', 'laporan_capaian.periode_id', '=', 'periode.id')
            //->join('indikator_periode_pic','indikator_periode.id', '=', 'indikator_periode_pic.indikator_periode_id')
                //->join('pic', 'indikator_periode_pic.pic_id', '=', 'pic.id')
            ->join('triwulan', 'laporan_capaian.triwulan_id', '=', 'triwulan.id')
            ->join('level','indikator.level_id','=','level.id')
            ->join('satuan','indikator.satuan_id', '=', 'satuan.id')
            ->select('laporan_capaian.id',
                    'laporan_capaian.realisasi',
                    'laporan_capaian.kinerja',
                    'laporan_capaian.sumber_data',
                    'indikator_periode.target',
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
            'laporan_capaians' => new \Illuminate\Support\Collection($select)
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
    
    public function importTarget(){
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
                    if($triwulans->count() > 0){
                        for($j = 0; $j < $triwulans->count(); $j++){
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
                        $data['result'][$i] = 'Import '.$indikator_periode->id.' successfull';
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
}
