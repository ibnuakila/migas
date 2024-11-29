<?php

namespace App\Http\Controllers;

use App\Models\CalculateRealization;
use App\Models\IndikatorFormula;
use App\Models\Kompositor;
use App\Models\LaporanCapaian;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\InputRealisasi;
use App\Models\RealisasiKompositor;
use App\Http\Requests\InputRealisasiRequest;
use App\Http\Resources\InputRealisasiResource;
use App\Http\Resources\InputRealisasiCollection;
use Illuminate\Support\Facades\DB;
use PhpOffice\PhpSpreadsheet\Calculation\Calculation;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Storage;

class InputRealisasiController extends Controller
{

    //
    public function create()
    {
        return Inertia::render('InputRealisasi/FormRealisasi', [
            'triwulan' => \App\Models\Triwulan::all(),
            'periode' => \App\Models\Periode::all(),
            'pics' => \App\Models\PIC::all()
        ]);
    }

    public function destroy(InputRealisasi $inputrealisasi, Request $request)
    {//delete not tested yet!
        $this->authorize('input-realisasi-delete');

        $inputrealisasi->delete();
        return Redirect::route('input-realisasi.index')->with('success', 'Input Realisasi deleted!');
    }

    public function destroyKompositor(RealisasiKompositor $realisasikompositor, Request $request)
    {//delete kompositor
        $this->authorize('input-realisasi-delete');

        $input_realisasi_id = $realisasikompositor->input_realisasi_id;
        $input_realisasi = InputRealisasi::where('id', $input_realisasi_id)->first();
        $laporan_capaian_id = $input_realisasi->laporan_capaian_id;
        $triwulan_id = $input_realisasi->triwulan_id;
        $kompositor = Kompositor::find($realisasikompositor->kompositor_id);

        //delete pic
        DB::table('realisasi_kompositor_pic')
            ->where('realisasi_kompositor_id', '=', $realisasikompositor->id)
            ->delete();
        //delete realisasi kompositor
        $realisasikompositor->delete();

        if ($kompositor->jenis_kompositor_id == 2) {
            $input_realisasi->realisasi = 0;
            $input_realisasi->update();
        }

        return Inertia::location('/input-realisasi/laporancapaiantriwulan/' . $laporan_capaian_id . '/triwulan/' . $triwulan_id);
    }

    public function edit(InputRealisasi $inputrealisasi, \App\Models\RealisasiKompositor $realisasikompositor)
    {
        $this->authorize('input-realisasi-edit');
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
            'def_pics' => ($this->getPics($realisasikompositor)),
            'data_format' => \App\Models\DataFormat::all()
        ]);
    }

    function getPics($realisasikompositor)
    {
        //$indikator_kompositor = \App\Models\Kompositor::where('id', $inputrealisasi->kompositor_id)->first();
        $temp_res = \App\Models\RealisasiKompositorPic::query()
            ->where('realisasi_kompositor_id', '=', $realisasikompositor->id)->get();
        $def_pics = [];
        $i = 0;
        foreach ($temp_res as $row) {
            $def_pics[$i] = ['value' => $row->pic_id, 'label' => $row->nama_pic];
            $i++;
        }
        return $def_pics;
    }

    public function index(\App\Models\LaporanCapaian $laporancapaian)
    {
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

    public function indexIndikator(\App\Models\LaporanCapaian $laporancapaian, \App\Models\Triwulan $triwulan)
    {
        $this->authorize('input-realisasi-list');
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
                ->when(Request::input('findeks'), function ($query, $search) {
                    if ($search != '') {
                        $query->where('indeks.nama_indeks', 'like', "%{$search}%");
                    }
                })
                ->when(Request::input('fkompositor'), function ($query, $search) {
                    if ($search != '') {
                        $query->where('kompositor.nama_kompositor', 'like', "%{$search}%");
                    }
                })
                ->where('input_realisasi.laporan_capaian_id', $laporancapaian->id)
                ->where('input_realisasi.triwulan_id', $triwulan->id)
                ->select(
                    'input_realisasi.*',
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

    public function laporanCapaianTriwulan(\App\Models\LaporanCapaian $laporancapaian, \App\Models\Triwulan $triwulan)
    {
        $this->authorize('input-realisasi-list');
        $indikator = \App\Models\Indikator::where('id', $laporancapaian->indikator_id)->first();
        return Inertia::render('InputRealisasi/ListInputRealisasi', [
            'laporan_capaian' => $laporancapaian,
            'indikator' => $indikator,
            'triwulan' => $triwulan,
            'input_realisasis' => \App\Models\RealisasiKompositor::query()
                ->join('input_realisasi', 'realisasi_kompositor.input_realisasi_id', '=', 'input_realisasi.id')
                ->join('triwulan', 'input_realisasi.triwulan_id', '=', 'triwulan.id')
                //->join('realisasi_kompositor', 'input_realisasi.id', '=', 'realisasi_kompositor.input_realisasi_id')
                ->join('kompositor', 'realisasi_kompositor.kompositor_id', '=', 'kompositor.id')
                ->join('indikator_kompositor', 'kompositor.id', '=', 'indikator_kompositor.kompositor_id')
                ->join('indikator', 'indikator_kompositor.indikator_id', '=', 'indikator.id')
                ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                ->join('jenis_kompositor', 'kompositor.jenis_kompositor_id', '=', 'jenis_kompositor.id')
                ->with('realisasiKompositorPics')
                ->when(Request::input('findeks'), function ($query, $search) {
                    if ($search != '') {
                        $query->where('indeks.nama_indeks', 'like', "%{$search}%");
                    }
                })
                ->when(Request::input('fkompositor'), function ($query, $search) {
                    if ($search != '') {
                        $query->where('kompositor.nama_kompositor', 'like', "%{$search}%");
                    }
                })
                ->where('input_realisasi.laporan_capaian_id', $laporancapaian->id)
                ->where('input_realisasi.triwulan_id', $triwulan->id)
                ->select(
                    'input_realisasi.*',
                    'triwulan.triwulan',
                    'realisasi_kompositor.id as realisasi_kompositor_id',
                    'realisasi_kompositor.nilai',
                    'kompositor.nama_kompositor',
                    'kompositor.satuan',
                    'kompositor.id as kompositor_id',
                    'kompositor.sumber_kompositor_id',
                    'indeks.nama_indeks',
                    'jenis_kompositor.nama_jenis_kompositor'
                )
                ->get(),
        ]);
    }

    public function store(InputRealisasiRequest $request)
    {
        $validated = $request->validated();
        $object = InputRealisasi::create($validated);
        return Redirect::route('input-realisasi.index-indikator');
    }

    public function update(InputRealisasi $inputrealisasi, \Illuminate\Http\Request $request)
    {

        $validator_1 = \Illuminate\Support\Facades\Validator::make($request->all(), [
            'kompositor_id' => ['required'],
            'input_realisasi_id' => ['required'],
            'laporan_capaian_id' => ['required'],
            'realisasi' => ['required'],
            'triwulan_id' => ['required'],
            //'realisasi_format' => ['required']
        ])->validate();
        //$validated_realisasi_kompositor = $validator_1->validated();
        //insert/ update realisasi kompositor        
        $obj_realisasi_kompositor = \App\Models\RealisasiKompositor::where('kompositor_id', $request->input('kompositor_id'))
            ->where('input_realisasi_id', $inputrealisasi->id)->first();
        if ($obj_realisasi_kompositor === null) {
            $update_status_2 = \App\Models\RealisasiKompositor::create([
                'input_realisasi_id' => $request->input('input_realisasi_id'),
                'kompositor_id' => $request->input('kompositor_id')
            ]);
        } else {
            $update_status_2 = \App\Models\RealisasiKompositor::where('kompositor_id', $request->input('kompositor_id'))
                ->where('input_realisasi_id', $inputrealisasi->id)
                ->update(['nilai' => (float) str_replace(',', '', $request->input('realisasi'))]);
        }

        //update input realisasi 
        //jika nama kompositor == dengan nama indikator        
        $kompositor = \App\Models\Kompositor::where('id', $request->input('kompositor_id'))->first();
        $lapcapaian = \App\Models\LaporanCapaian::where('id', $request->input('laporan_capaian_id'))->first();
        $indikator = \App\Models\Indikator::where('id', $lapcapaian->indikator_id)->first();
        if ($kompositor->nama_kompositor == $indikator->nama_indikator) {
            $update_status_1 = $inputrealisasi->update([
                'realisasi' => (float) str_replace(',', '', $request->input('realisasi')),
                'realisasi_format' => $request->input('realisasi_format'),
                'triwulan_id' => $request->input('triwulan_id'),
                'laporan_capaian_id' => $request->input('laporan_capaian_id')
            ]);
        } else {
            $update_status_1 = $inputrealisasi->update([
                'realisasi_format' => $request->input('realisasi_format'),
            ]);
        }

        //update input realisasi pic
        $laporancapaian = \App\Models\LaporanCapaian::where('id', $inputrealisasi->laporan_capaian_id)->first();
        $pics = $request->input('pics');
        if (is_array($pics)) {
            DB::table('input_realisasi_pic')
                ->where('input_realisasi_id', '=', $inputrealisasi->id)
                ->delete();
            foreach ($pics as $pic) {
                $data = [
                    'input_realisasi_id' => $inputrealisasi->id,
                    'pic_id' => $pic['value'],
                    'nama_pic' => $pic['label']
                ];
                DB::table('input_realisasi_pic')->insert($data);
            }
        }

        $message = '';
        if ($update_status_2 || $update_status_1) {
            $message = "Update berhasil!";
        } else {
            $message = "Update gagal!";
        }
        return Redirect::back()->with('message', $message);
    }

    public function importKompositor(\Illuminate\Http\Request $request)
    {
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
                //$obj_realisasi_kompositor->refresh();
                if ($obj_realisasi_kompositor == null) {
                    $real_kompo = \App\Models\RealisasiKompositor::create($temp_realisasi);
                    $pics = \App\Models\KompositorPic::where('kompositor_id', $real_kompo->kompositor_id)->get();
                    if ($pics->count() > 0) {
                        foreach ($pics as $pic) {
                            $temp_lap_pic = [
                                'realisasi_kompositor_id' => $real_kompo->id,
                                'pic_id' => $pic->pic_id,
                                'nama_pic' => $pic->nama_pic
                            ];
                            \App\Models\RealisasiKompositorPic::create($temp_lap_pic);
                        }
                    }
                } else {
                    //update realisasi kompositor pic
                    DB::table('realisasi_kompositor_pic')
                        ->where('realisasi_kompositor_id', $obj_realisasi_kompositor->id)
                        ->delete();
                    $pics = \App\Models\KompositorPic::where('kompositor_id', $obj_realisasi_kompositor->kompositor_id)->get();
                    if ($pics->count() > 0) {
                        foreach ($pics as $pic) {
                            $temp_lap_pic = [
                                'realisasi_kompositor_id' => $obj_realisasi_kompositor->id,
                                'pic_id' => $pic->pic_id,
                                'nama_pic' => $pic->nama_pic
                            ];
                            \App\Models\RealisasiKompositorPic::create($temp_lap_pic);
                        }
                    }
                }
            }
        }

        return Redirect::back()->with('message', 'Import Berhasil!');
    }

    public function calculateRealization(\Illuminate\Http\Request $request)
    {
        $input_realisasi_id = $request->input('input_realisasi_id');
        $sumber_kompositor_id = $request->input('sumber_kompositor_id');
        $kompositor_id = $request->input('kompositor_id');
        $nama_kompositor = $request->input('nama_kompositor');
        $input_realisasi = InputRealisasi::find($input_realisasi_id);
        
        $realisasi_kompositor_id = $request->input('realisasi_kompositor_id');
        $data['input_realisasi'] = $input_realisasi;
        $laporan_capaian = LaporanCapaian::find($input_realisasi->laporan_capaian_id);
        $indikator_formula = IndikatorFormula::where('indikator_id', $laporan_capaian->indikator_id)->first();
        if (is_object($indikator_formula)) {
            $data['indikator_formula'] = $indikator_formula;
            $data['mapping'] = json_decode($indikator_formula->mapping_realisasi);
            $formula = $indikator_formula->formula_realisasi;
            $formula_map = json_decode($indikator_formula->mapping_realisasi);
            if($sumber_kompositor_id == 2){
                $realisasi_kompositor = \App\Models\RealisasiKompositor::query()
                ->join('input_realisasi', 'realisasi_kompositor.input_realisasi_id', '=', 'input_realisasi.id')
                ->join('triwulan', 'input_realisasi.triwulan_id', '=', 'triwulan.id')
                //->join('realisasi_kompositor', 'input_realisasi.id', '=', 'realisasi_kompositor.input_realisasi_id')
                ->join('kompositor', 'realisasi_kompositor.kompositor_id', '=', 'kompositor.id')
                ->join('indikator_kompositor', 'kompositor.id', '=', 'indikator_kompositor.kompositor_id')
                ->join('indikator', 'indikator_kompositor.indikator_id', '=', 'indikator.id')
                ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                ->join('jenis_kompositor', 'kompositor.jenis_kompositor_id', '=', 'jenis_kompositor.id')
                ->where('input_realisasi.laporan_capaian_id', $input_realisasi->laporan_capaian_id)
                ->where('input_realisasi.triwulan_id', $input_realisasi->triwulan_id)
                ->select(
                    'input_realisasi.*',
                    'triwulan.triwulan',
                    'realisasi_kompositor.id as realisasi_kompositor_id',
                    'realisasi_kompositor.nilai',
                    'kompositor.nama_kompositor',
                    'kompositor.satuan',
                    'kompositor.id as kompositor_id',
                    'kompositor.sumber_kompositor_id',
                    'indeks.nama_indeks',
                    'jenis_kompositor.nama_jenis_kompositor'
                )->get();
                foreach($realisasi_kompositor as $kompo){
                    if($kompo->nama_kompositor == $nama_kompositor){
                        $obj_kompo = Kompositor::query()
                            ->join('kompositor_of_kompositor', 'kompositor.id', '=', 'kompositor_of_kompositor.ref_kompositor_id')
                            ->where('kompositor_of_kompositor.kompositor_id', '=', $kompositor_id)
                            ->first();
                        if(is_object($obj_kompo)){
                            $realisasi_kompositor = \App\Models\RealisasiKompositor::query()
                            ->join('input_realisasi', 'realisasi_kompositor.input_realisasi_id', '=', 'input_realisasi.id')
                            ->join('triwulan', 'input_realisasi.triwulan_id', '=', 'triwulan.id')
                            //->join('realisasi_kompositor', 'input_realisasi.id', '=', 'realisasi_kompositor.input_realisasi_id')
                            ->join('kompositor', 'realisasi_kompositor.kompositor_id', '=', 'kompositor.id')
                            ->join('indikator_kompositor', 'kompositor.id', '=', 'indikator_kompositor.kompositor_id')
                            ->join('indikator', 'indikator_kompositor.indikator_id', '=', 'indikator.id')
                            ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                            ->join('jenis_kompositor', 'kompositor.jenis_kompositor_id', '=', 'jenis_kompositor.id')
                            ->where('kompositor.id', '=', $obj_kompo->kompositor_id)
                            //->where('input_realisasi.triwulan_id', $input_realisasi->triwulan_id)
                            ->select(
                                'input_realisasi.*',
                                'triwulan.triwulan',
                                'realisasi_kompositor.id as realisasi_kompositor_id',
                                'realisasi_kompositor.nilai',
                                'kompositor.nama_kompositor',
                                'kompositor.satuan',
                                'kompositor.id as kompositor_id',
                                'kompositor.sumber_kompositor_id',
                                'indeks.nama_indeks',
                                'jenis_kompositor.nama_jenis_kompositor'
                            )->get();
                        }else{
                            $realisasi_kompositor = [];
                        }
                    }
                }
            }else{
                $realisasi_kompositor = \App\Models\RealisasiKompositor::query()
                ->join('input_realisasi', 'realisasi_kompositor.input_realisasi_id', '=', 'input_realisasi.id')
                ->join('triwulan', 'input_realisasi.triwulan_id', '=', 'triwulan.id')
                //->join('realisasi_kompositor', 'input_realisasi.id', '=', 'realisasi_kompositor.input_realisasi_id')
                ->join('kompositor', 'realisasi_kompositor.kompositor_id', '=', 'kompositor.id')
                ->join('indikator_kompositor', 'kompositor.id', '=', 'indikator_kompositor.kompositor_id')
                ->join('indikator', 'indikator_kompositor.indikator_id', '=', 'indikator.id')
                ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                ->join('jenis_kompositor', 'kompositor.jenis_kompositor_id', '=', 'jenis_kompositor.id')
                ->where('input_realisasi.laporan_capaian_id', $input_realisasi->laporan_capaian_id)
                ->where('input_realisasi.triwulan_id', $input_realisasi->triwulan_id)
                ->select(
                    'input_realisasi.*',
                    'triwulan.triwulan',
                    'realisasi_kompositor.id as realisasi_kompositor_id',
                    'realisasi_kompositor.nilai',
                    'kompositor.nama_kompositor',
                    'kompositor.satuan',
                    'kompositor.id as kompositor_id',
                    'kompositor.sumber_kompositor_id',
                    'indeks.nama_indeks',
                    'jenis_kompositor.nama_jenis_kompositor'
                )->get();
            }
            
                $data['realisasi_kompositor'] = $realisasi_kompositor;
            if (count($realisasi_kompositor) > 0) {
                //mapping formula to kompositor ----------------------------------------------
                $kompositorMap = [];
                foreach ($realisasi_kompositor as $kompositor) {
                    $kompositorMap[$kompositor['nama_kompositor']] = $kompositor['nilai'];
                }

                foreach ($formula_map as $key => $name) {
                    if (isset($kompositorMap[$name])) {
                        $formula_map->$key = $kompositorMap[$name];
                    }
                }
                $data['formula_map'] = $formula_map;

                //calculate the formula in virtual spreadsheet ------------------------------
                $spreadsheet = new Spreadsheet();
                $sheet = $spreadsheet->getActiveSheet();
                foreach ($formula_map as $cell => $value) {
                    $sheet->setCellValue($cell, $value);
                }
                $sheet->setCellValue('A1', $formula);
                //Calculation::getInstance($spreadsheet)->clearCalculationCache();
                //$calculation = Calculation::getInstance();
                
                $result = $sheet->getCell('A1')->getCalculatedValue(); //$calculation->calculateFormula($formula, $sheet->getCell('A1'));
                $data['realisasi'] = $result;
                unset($spreadsheet);
            }
        }else{
            $data['message'] = 'Formula not available';
        }
        
        // Set the headers to download the file
        // header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        // header('Content-Disposition: attachment;filename="calculated_result.xlsx"');
        // header('Cache-Control: max-age=0');

        // Write the file to output
        // $writer = new Xlsx($spreadsheet);
        // $writer->save('calculated_result.xlsx');
        return $data;
        
    }
    public function _calculateRealization(\Illuminate\Http\Request $request)
    {
        $input_realisasi_id = $request->input('input_realisasi_id');
        $realisasi_kompositor_id = $request->input('realisasi_kompositor_id');
        $params['input_realisasi_id'] = $input_realisasi_id;
        $params['realisasi_kompositor_id'] = $realisasi_kompositor_id;
        //$realisasi = CalculateRealization::getRealization($params);

        /*$result = InputRealisasi::query()
                ->join('realisasi_kompositor', 'input_realisasi.id', '=', 'realisasi_kompositor.input_realisasi_id')
                ->join('kompositor', 'realisasi_kompositor.kompositor_id', '=', 'kompositor.id')
                ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                ->where('realisasi_kompositor.input_realisasi_id', $input_realisasi_id)
                ->where('realisasi_kompositor.id', $realisasi_kompositor_id)
                ->where('kompositor.jenis_kompositor_id', 2)
                ->first();*/
        $result = InputRealisasi::query()
            ->join('realisasi_kompositor', 'input_realisasi.id', '=', 'realisasi_kompositor.input_realisasi_id')
            ->join('kompositor', 'realisasi_kompositor.kompositor_id', '=', 'kompositor.id')
            ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
            ->join('indikator_kompositor', 'kompositor.id', '=', 'indikator_kompositor.kompositor_id')
            ->join('indikator', 'indikator_kompositor.indikator_id', '=', 'indikator.id')
            ->where('realisasi_kompositor.input_realisasi_id', $input_realisasi_id)
            ->where('realisasi_kompositor.id', $realisasi_kompositor_id)
            ->where('kompositor.jenis_kompositor_id', 2)
            ->first();
        $data['input_realisasi'] = $result;
        $nama_indikator = trim($result->nama_indikator);
        $nama_indeks = trim($result->nama_indeks);
        $nama_kompositor = trim($result->nama_kompositor);
        $triwulan = $result->triwulan_id;
        $realisasi = 0;
        switch ($nama_indeks) {
            case 'Root':
                switch ($nama_kompositor) {
                    //nilai agregasi dari sub indeks IKSP
                    case "Indeks Ketersediaan Migas"://I
                        $indeks_ketersediaan_hulu_migas = 0;
                        $indeks_ketersediaan_bbm = 0;
                        $indeks_ketersediaan_lpg = 0;
                        $indeks_ketersediaan_lng = 0;
                        $res_kompo_param = DB::table('kompositor')
                            ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                            ->join('realisasi_kompositor', 'kompositor.id', '=', 'realisasi_kompositor.kompositor_id')
                            ->join('input_realisasi', 'realisasi_kompositor.input_realisasi_id', '=', 'input_realisasi.id')
                            ->where('kompositor.jenis_kompositor_id', '=', 2)
                            ->where('indeks.nama_indeks', 'like', $nama_kompositor)
                            ->where('input_realisasi.triwulan_id', '=', $triwulan)
                            ->select(
                                'kompositor.nama_kompositor',
                                'realisasi_kompositor.nilai'
                            )
                            ->distinct()
                            ->get();
                        $data['res_kompo_param'] = $res_kompo_param;
                        foreach ($res_kompo_param as $value) {
                            if ($value->nama_kompositor == "Indeks Ketersediaan Hulu Migas") {
                                $indeks_ketersediaan_hulu_migas = $value->nilai;
                            } elseif ($value->nama_kompositor == "Indeks Ketersediaan BBM") {
                                $indeks_ketersediaan_bbm = $value->nilai;
                            } elseif ($value->nama_kompositor == "Indeks Ketersediaan LPG") {
                                $indeks_ketersediaan_lpg = $value->nilai;
                            } elseif ($value->nama_kompositor == "Indeks Ketersediaan LNG") {
                                $indeks_ketersediaan_lng = $value->nilai;
                            }
                        }
                        $realisasi = ($indeks_ketersediaan_hulu_migas + $indeks_ketersediaan_bbm + $indeks_ketersediaan_lpg + $indeks_ketersediaan_lng) / 4;
                        break;
                    case "Akurasi Formulasi Harga Migas terhadap Harga yang Ditetapkan"://II
                        break;
                    case "Indeks Aksesibilitas Migas"://III
                        break;
                    case "Persentase Tingkat Komponen Dalam Negeri (TKDN) pada Kegiatan Usaha Hulu Migas"://IV
                        break;
                    case "Persentase Realisasi Investasi Sub Sektor Migas"://V
                        break;
                    case "Persentase Realisasi PNBP Subsektor Migas dan PNBP BLU Pengujian Migas"://VI
                        break;
                    case "Indeks Kepuasan Layanan Subsektor Migas"://VII
                        break;
                    case "Indeks Efektivitas Pembinaan dan Pengawasan Subsektor Migas"://VIII
                        break;
                    case "Tingkat Maturitas SPIP Ditjen Migas"://IX
                        break;
                    case "Nilai Sistem Akuntabilitas Kinerja Pemerintah (SAKIP) Ditjen Migas"://X
                        break;
                    case "Indeks Keselamatan migas"://XI
                        break;
                    case "Indeks Reformasi Birokrasi Ditjen Migas"://XII
                        break;
                    case "Nilai Evaluasi Kelembagaan Ditjen Migas"://XIII
                        break;
                    case "Indeks Profesionalitas ASN Ditjen Migas"://XIV
                        break;
                    case "Nilai Indikator Kinerja Pelaksanaan Anggaran (IKPA) Ditjen Migas"://XV
                        break;
                }

                break;
            case 'Indeks Ketersediaan Migas':

                $indeks_ketersediaan_hulu_migas = 0;
                $indeks_ketersediaan_bbm = 0;
                $indeks_ketersediaan_lpg = 0;
                $indeks_ketersediaan_lng = 0;
                //foreach ($res_realisasi as $realisasi) {
                if ($nama_kompositor == 'Indeks Ketersediaan Hulu Migas') {
                    $res_kompo_param = DB::table('kompositor')
                        ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                        ->join('realisasi_kompositor', 'kompositor.id', '=', 'realisasi_kompositor.kompositor_id')
                        ->join('input_realisasi', 'realisasi_kompositor.input_realisasi_id', '=', 'input_realisasi.id')
                        ->join('kompositor_parameter', 'kompositor.id', '=', 'kompositor_parameter.kompositor_id', 'left')
                        ->join('parameter', 'kompositor_parameter.parameter_id', '=', 'parameter.id', 'left')
                        ->where('indeks.nama_indeks', '=', $nama_kompositor)
                        ->where('input_realisasi.triwulan_id', '=', $triwulan)
                        ->select(
                            'kompositor.*',
                            'parameter.nama_parameter',
                            'parameter.kalkulasi',
                            'parameter.value',
                            'realisasi_kompositor.nilai'
                        )
                        ->get();
                    $data['res_kompo_param'] = $res_kompo_param;
                    $indeks_ketersediaan_hulu_minyak = 0;
                    $indeks_ketersediaan_hulu_gas = 0;
                    foreach ($res_kompo_param as $subrow) {
                        if (trim($subrow->nama_kompositor) == "Indeks Ketersediaan Hulu Minyak") {
                            $indeks_ketersediaan_hulu_minyak = $subrow->nilai;
                        } elseif (trim($subrow->nama_kompositor) == "Indeks Ketersediaan Hulu Gas") {
                            $indeks_ketersediaan_hulu_gas = $subrow->nilai;
                        }
                    }
                    $realisasi = ($indeks_ketersediaan_hulu_minyak + $indeks_ketersediaan_hulu_gas) / 2;
                } elseif ($nama_kompositor == 'Persentase Pemanfaatan Gas Bumi Domestik') {
                    $res_kompo_param = DB::table('kompositor')
                        ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                        ->join('realisasi_kompositor', 'kompositor.id', '=', 'realisasi_kompositor.kompositor_id')
                        ->join('input_realisasi', 'realisasi_kompositor.input_realisasi_id', '=', 'input_realisasi.id')
                        ->join('kompositor_parameter', 'kompositor.id', '=', 'kompositor_parameter.kompositor_id', 'left')
                        ->join('parameter', 'kompositor_parameter.parameter_id', '=', 'parameter.id', 'left')
                        ->where('indeks.nama_indeks', '=', $nama_kompositor)
                        ->where('input_realisasi.triwulan_id', '=', $triwulan)
                        ->select(
                            'kompositor.*',
                            'parameter.nama_parameter',
                            'parameter.kalkulasi',
                            'parameter.value',
                            'realisasi_kompositor.nilai'
                        )
                        ->get();
                    $data['res_kompo_param'] = $res_kompo_param;
                    $temp_realisasi = 0;
                    foreach ($res_kompo_param as $row) {
                        if (trim($row->nama_kompositor) == 'R/P gas bumi') {
                            //if($row->jenis_kompositor_id == 1){
                            $rp_gas_bumi = $row->nilai;
                            $realisasi = $rp_gas_bumi;
                            //}
                        }/* elseif(trim($row->nama_kompositor) == 'Persentase Pemanfaatan Gas Bumi Melalui Pipa Domestik'){
                       if($row->jenis_kompositor_id == 1){

                       }else{

                       }

                       } */
                    }
                    //$realisasi = $temp_realisasi;
                } elseif ($nama_kompositor == 'Indeks Ketersediaan BBM') {
                    //query kompositor dan parameter
                    $res_kompo_param = DB::table('kompositor')
                        ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                        ->join('realisasi_kompositor', 'kompositor.id', '=', 'realisasi_kompositor.kompositor_id')
                        ->join('input_realisasi', 'realisasi_kompositor.input_realisasi_id', '=', 'input_realisasi.id')
                        ->join('kompositor_parameter', 'kompositor.id', '=', 'kompositor_parameter.kompositor_id', 'left')
                        ->join('parameter', 'kompositor_parameter.parameter_id', '=', 'parameter.id', 'left')
                        ->where('indeks.nama_indeks', '=', $nama_kompositor)
                        ->where('input_realisasi.triwulan_id', '=', $triwulan)
                        ->select(
                            'kompositor.*',
                            'parameter.nama_parameter',
                            'parameter.kalkulasi',
                            'parameter.value',
                            'realisasi_kompositor.nilai'
                        )
                        ->get();
                    $data['res_kompo_param'] = $res_kompo_param;
                    $realisasi_produksi_bbm = 0;
                    $kuota_impor_bbm = 0;
                    $kuota_ekspor_bbm = 0;
                    $realisasi_impor_bbm = 0;
                    $realisasi_ekspor_bbm = 0;
                    foreach ($res_kompo_param as $subrow) {
                        if ($subrow->nama_kompositor == 'Realisasi Produksi BBM') {
                            $realisasi_produksi_bbm = $subrow->nilai;
                        } elseif ($subrow->nama_kompositor == 'Kuota Impor BBM') {
                            $kuota_impor_bbm = $subrow->nilai;
                        } elseif ($subrow->nama_kompositor == 'Kuota Ekspor BBM') {
                            $kuota_ekspor_bbm = $subrow->nilai;
                        } elseif ($subrow->nama_kompositor == 'Realisasi Impor BBM') {
                            $realisasi_impor_bbm = $subrow->nilai;
                        } elseif ($subrow->nama_kompositor == 'Realisasi Ekspor BBM') {
                            $realisasi_ekspor_bbm = $subrow->nilai;
                        }
                    }
                    $realisasi = (($realisasi_produksi_bbm + $kuota_impor_bbm) - $kuota_ekspor_bbm) /
                        (($realisasi_produksi_bbm + $realisasi_impor_bbm) - $realisasi_ekspor_bbm);
                    break;
                } elseif ($nama_kompositor == 'Indeks Ketersediaan LPG') {
                    //query kompositor dan parameter
                    $res_kompo_param = DB::table('kompositor')
                        ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                        ->join('realisasi_kompositor', 'kompositor.id', '=', 'realisasi_kompositor.kompositor_id')
                        ->join('input_realisasi', 'realisasi_kompositor.input_realisasi_id', '=', 'input_realisasi.id')
                        ->join('kompositor_parameter', 'kompositor.id', '=', 'kompositor_parameter.kompositor_id', 'left')
                        ->join('parameter', 'kompositor_parameter.parameter_id', '=', 'parameter.id', 'left')
                        ->where('indeks.nama_indeks', '=', $nama_kompositor)
                        ->where('input_realisasi.triwulan_id', '=', $triwulan)
                        ->select(
                            'kompositor.*',
                            'parameter.nama_parameter',
                            'parameter.kalkulasi',
                            'parameter.value',
                            'realisasi_kompositor.nilai'
                        )
                        ->get();
                    $data['res_kompo_param'] = $res_kompo_param;
                    $realisasi_produksi_lpg = 0;
                    $kuota_impor_lpg = 0;
                    $kuota_ekspor_lpg = 0;
                    $realisasi_impor_lpg = 0;
                    $realisasi_ekspor_lpg = 0;
                    foreach ($res_kompo_param as $subrow) {
                        if ($subrow->nama_kompositor == 'Realisasi Produksi LPG') {
                            $realisasi_produksi_lpg = $subrow->nilai;
                        } elseif ($subrow->nama_kompositor == 'Kuota Impor LPG') {
                            $kuota_impor_lpg = $subrow->nilai;
                        } elseif ($subrow->nama_kompositor == 'Kuota Ekspor LPG') {
                            $kuota_ekspor_lpg = $subrow->nilai;
                        } elseif ($subrow->nama_kompositor == 'Realisasi Impor LPG') {
                            $realisasi_impor_lpg = $subrow->nilai;
                        } elseif ($subrow->nama_kompositor == 'Realisasi Ekspor LPG') {
                            $realisasi_ekspor_lpg = $subrow->nilai;
                        }
                    }
                    $realisasi = (($realisasi_produksi_lpg + $kuota_impor_lpg) - $kuota_ekspor_lpg) /
                        (($realisasi_produksi_lpg + $realisasi_impor_lpg) - $realisasi_ekspor_lpg);
                    break;
                } elseif ($nama_kompositor == 'Indeks Ketersediaan LNG') {
                    //query kompositor dan parameter
                    $res_kompo_param = DB::table('kompositor')
                        ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                        ->join('realisasi_kompositor', 'kompositor.id', '=', 'realisasi_kompositor.kompositor_id')
                        ->join('input_realisasi', 'realisasi_kompositor.input_realisasi_id', '=', 'input_realisasi.id')
                        ->join('kompositor_parameter', 'kompositor.id', '=', 'kompositor_parameter.kompositor_id', 'left')
                        ->join('parameter', 'kompositor_parameter.parameter_id', '=', 'parameter.id', 'left')
                        ->where('indeks.nama_indeks', '=', $nama_kompositor)
                        ->where('input_realisasi.triwulan_id', '=', $triwulan)
                        ->select(
                            'kompositor.*',
                            'parameter.nama_parameter',
                            'parameter.kalkulasi',
                            'parameter.value',
                            'realisasi_kompositor.nilai'
                        )
                        ->get();
                    $data['res_kompo_param'] = $res_kompo_param;
                    $realisasi_produksi_lng = 0;
                    $realisasi_ekspor_lng = 0;
                    $realisasi_lng_domestik_mmbtu = 0;
                    foreach ($res_kompo_param as $subrow) {
                        if (trim($subrow->nama_kompositor) == 'Realisasi Produksi LNG') {
                            $realisasi_produksi_lng = $subrow->nilai;
                        } else if (trim($subrow->nama_kompositor) == 'Realisasi Ekspor LNG') {
                            $realisasi_ekspor_lng = $subrow->nilai;
                        } else if (trim($subrow->nama_kompositor) == 'Realisasi LNG Domestik MMBTU') {
                            $realisasi_lng_domestik_mmbtu = $subrow->nilai;
                        }
                    }
                    $realisasi = ($realisasi_produksi_lng - $realisasi_ekspor_lng) / $realisasi_lng_domestik_mmbtu;
                }
                //}
                //$realisasi = ($indeks_ketersediaan_hulu_migas + $indeks_ketersediaan_bbm + $indeks_ketersediaan_lpg + $indeks_ketersediaan_lng) / 4;
                break;
            case 'Persentase Pemanfaatan Gas Bumi Domestik':
                if ($nama_kompositor == 'Persentase Pemanfaatan Gas Bumi Melalui Pipa Domestik') {
                    $res_kompo_param = DB::table('kompositor')
                        ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                        ->join('realisasi_kompositor', 'kompositor.id', '=', 'realisasi_kompositor.kompositor_id')
                        ->join('kompositor_parameter', 'kompositor.id', '=', 'kompositor_parameter.kompositor_id', 'left')
                        ->join('parameter', 'kompositor_parameter.parameter_id', '=', 'parameter.id', 'left')
                        ->where('indeks.nama_indeks', '=', $nama_kompositor)
                        //->where('kompositor.jenis_kompositor_id', '=', 2)
                        ->select(
                            'kompositor.*',
                            'parameter.nama_parameter',
                            'parameter.kalkulasi',
                            'parameter.value',
                            'realisasi_kompositor.nilai'
                        )
                        ->get();
                    $data['res_kompo_param'] = $res_kompo_param;
                    foreach ($res_kompo_param as $row) {
                        if ($row->nama_kompositor == 'Cadangan Minyak Bumi') {
                            //kalkulasi jika ada
                            $realisasi = $row->nilai;
                        }
                    }
                } elseif ($nama_kompositor == 'Persentase Pemanfaatan LNG Domestik') {
                    $res_kompo_param = DB::table('kompositor')
                        ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                        ->join('realisasi_kompositor', 'kompositor.id', '=', 'realisasi_kompositor.kompositor_id')
                        ->join('kompositor_parameter', 'kompositor.id', '=', 'kompositor_parameter.kompositor_id', 'left')
                        ->join('parameter', 'kompositor_parameter.parameter_id', '=', 'parameter.id', 'left')
                        ->where('indeks.nama_indeks', '=', $nama_kompositor)
                        //->where('kompositor.jenis_kompositor_id', '=', 2)
                        ->select(
                            'kompositor.*',
                            'parameter.nama_parameter',
                            'parameter.kalkulasi',
                            'parameter.value',
                            'realisasi_kompositor.nilai'
                        )
                        ->get();
                    $data['res_kompo_param'] = $res_kompo_param;
                    foreach ($res_kompo_param as $row) {
                        if ($row->nama_kompositor == 'Cadangan Gas Bumi') {
                            //kalkulasi jika ada
                            $realisasi = $row->nilai;
                        }
                    }
                }
            case 'Indeks Ketersediaan Hulu Migas':
                if ($nama_kompositor == 'Indeks Ketersediaan Hulu Minyak') {
                    //query kompositor dan parameter
                    $res_kompo_param = DB::table('kompositor')
                        ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                        ->join('realisasi_kompositor', 'kompositor.id', '=', 'realisasi_kompositor.kompositor_id')
                        ->join('kompositor_parameter', 'kompositor.id', '=', 'kompositor_parameter.kompositor_id', 'left')
                        ->join('parameter', 'kompositor_parameter.parameter_id', '=', 'parameter.id', 'left')
                        ->where('indeks.nama_indeks', '=', $nama_kompositor)
                        //->where('kompositor.jenis_kompositor_id', '=', 2)
                        ->select(
                            'kompositor.*',
                            'parameter.nama_parameter',
                            'parameter.kalkulasi',
                            'parameter.value',
                            'realisasi_kompositor.nilai'
                        )
                        ->get();
                    $data['res_kompo_param'] = $res_kompo_param;
                    $realisasi_produksi_lifting_minyak = 0;
                    $realisasi_impor_minyak = 0;
                    $realisasi_impor_minyak = 0;
                    $realisasi_ekspor_minyak = 0;
                    $kebutuhan_kilang_minyak = 0;
                    foreach ($res_kompo_param as $subrow) {
                        if (trim($subrow->nama_kompositor) == "Realisasi Produksi/Lifting Minyak") {
                            $realisasi_produksi_lifting_minyak = $subrow->nilai;
                        } elseif (trim($subrow->nama_kompositor) == "Realisasi Impor Minyak Mentah") {
                            $realisasi_impor_minyak = $subrow->nilai;
                        } elseif (trim($subrow->nama_kompositor) == "Realisasi Ekspor Minyak Mentah") {
                            $realisasi_ekspor_minyak = $subrow->nilai;
                        } elseif (trim($subrow->nama_kompositor) == "Kebutuhan Kilang Minyak") {
                            $kebutuhan_kilang_minyak = $subrow->nilai;
                        }
                    }
                    $realisasi = (($realisasi_produksi_lifting_minyak + $realisasi_impor_minyak) - $realisasi_ekspor_minyak) / $kebutuhan_kilang_minyak;
                } elseif ($nama_kompositor == "Indeks Ketersediaan Hulu Gas") {
                    //query kompositor dan parameter
                    $res_kompo_param = DB::table('kompositor')
                        ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                        ->join('realisasi_kompositor', 'kompositor.id', '=', 'realisasi_kompositor.kompositor_id')
                        ->join('kompositor_parameter', 'kompositor.id', '=', 'kompositor_parameter.kompositor_id', 'left')
                        ->join('parameter', 'kompositor_parameter.parameter_id', '=', 'parameter.id', 'left')
                        ->where('indeks.nama_indeks', '=', $nama_kompositor)
                        //->where('kompositor.jenis_kompositor_id', '=', 2)
                        ->select(
                            'kompositor.*',
                            'parameter.nama_parameter',
                            'parameter.kalkulasi',
                            'parameter.value',
                            'realisasi_kompositor.nilai'
                        )
                        ->get();
                    $data['res_kompo_param'] = $res_kompo_param;
                    $realisasi_produksi_lifting_gas_bumi_bbtu = 0;
                    $realisasi_alokasi_gas_dom = 0;
                    foreach ($res_kompo_param as $subrow) {
                        if (trim($subrow->nama_kompositor) == "Realisasi Produksi/Lifting Gas Bumi BBTU") {
                            $realisasi_produksi_lifting_gas_bumi_bbtu = $subrow->nilai;
                        } elseif (trim($subrow->nama_kompositor) == "Realisasi Alokasi Gas Dom") {
                            $realisasi_alokasi_gas_dom = $subrow->nilai;
                        }
                    }
                    $realisasi = $realisasi_produksi_lifting_gas_bumi_bbtu / $realisasi_alokasi_gas_dom;
                } elseif ($nama_kompositor == "Produksi Minyak Bumi") {
                    //query kompositor dan parameter
                    $res_kompo_param = DB::table('kompositor')
                        ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                        ->join('realisasi_kompositor', 'kompositor.id', '=', 'realisasi_kompositor.kompositor_id')
                        ->join('kompositor_parameter', 'kompositor.id', '=', 'kompositor_parameter.kompositor_id', 'left')
                        ->join('parameter', 'kompositor_parameter.parameter_id', '=', 'parameter.id', 'left')
                        ->where('indeks.nama_indeks', '=', $nama_kompositor)
                        //->where('kompositor.jenis_kompositor_id', '=', 2)
                        ->select(
                            'kompositor.*',
                            'parameter.nama_parameter',
                            'parameter.kalkulasi',
                            'parameter.value',
                            'realisasi_kompositor.nilai'
                        )
                        ->get();
                    $data['res_kompo_param'] = $res_kompo_param;
                    $realisasi_produksi_lifting_minyak = 0;
                    $parameter_90000 = 0;
                    $parameter_181000 = 0;
                    $parameter_273000 = 0;
                    $parameter_365000 = 0;
                    foreach ($res_kompo_param as $subrow) {
                        if (trim($subrow->nama_kompositor) == "Realisasi Produksi/Lifting Minyak") {
                            $realisasi_produksi_lifting_minyak = $subrow->nilai;
                        } elseif (trim($subrow->nama_kompositor) == "Parameter 90000") {
                            $parameter_90000 = $subrow->nilai;
                        } elseif (trim($subrow->nama_kompositor) == "Parameter 181000") {
                            $parameter_181000 = $subrow->nilai;
                        } elseif (trim($subrow->nama_kompositor) == "Parameter 273000") {
                            $parameter_273000 = $subrow->nilai;
                        } elseif (trim($subrow->nama_kompositor) == "Parameter 365000") {
                            $parameter_365000 = $subrow->nilai;
                        }
                    }
                    if ($triwulan == 1) {
                        $realisasi = $realisasi_produksi_lifting_minyak / $parameter_90000;
                    } elseif ($triwulan == 2) {
                        $realisasi = $realisasi_produksi_lifting_minyak / $parameter_181000;
                    } elseif ($triwulan == 3) {
                        $realisasi = $realisasi_produksi_lifting_minyak / $parameter_273000;
                    } elseif ($triwulan == 4) {
                        $realisasi = $realisasi_produksi_lifting_minyak / $parameter_365000;
                    }
                } elseif ($nama_kompositor == "Produksi Gas Bumi") {
                    //query kompositor dan parameter
                    $res_kompo_param = DB::table('kompositor')
                        ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                        ->join('realisasi_kompositor', 'kompositor.id', '=', 'realisasi_kompositor.kompositor_id')
                        ->join('kompositor_parameter', 'kompositor.id', '=', 'kompositor_parameter.kompositor_id', 'left')
                        ->join('parameter', 'kompositor_parameter.parameter_id', '=', 'parameter.id', 'left')
                        ->where('indeks.nama_indeks', '=', $nama_kompositor)
                        //->where('kompositor.jenis_kompositor_id', '=', 2)
                        ->select(
                            'kompositor.*',
                            'parameter.nama_parameter',
                            'parameter.kalkulasi',
                            'parameter.value',
                            'realisasi_kompositor.nilai'
                        )
                        ->get();
                    $data['res_kompo_param'] = $res_kompo_param;
                    $realisasi_produksi_lifting_gas_bumi = 0;
                    $parameter_5658 = 0;
                    foreach ($res_kompo_param as $subrow) {
                        if (trim($subrow->nama_kompositor) == "Realisasi Produksi/Lifting Gas Bumi") {
                            $realisasi_produksi_lifting_gas_bumi = $subrow->nilai;
                        } elseif (trim($subrow->nama_kompositor) == "Parameter 5658") {
                            $parameter_5658 = $subrow->nilai;
                        }
                    }
                    $realisasi = $realisasi_produksi_lifting_gas_bumi / $parameter_5658;
                }
                break;
            case 'Indeks Ketersediaan Hulu Minyak':
                $res_realisasi = DB::table('indikator')
                    ->join('indikator_kompositor', 'indikator.id', '=', 'indikator_kompositor.indikator_id')
                    ->join('kompositor', 'indikator_kompositor.kompositor_id', '=', 'kompositor.id')
                    ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                    ->join('realisasi_kompositor', 'kompositor.id', '=', 'realisasi_kompositor.kompositor_id')
                    ->join('input_realisasi', 'input_realisasi.id', '=', 'realisasi_kompositor.input_realisasi_id')
                    ->where('indeks.nama_indeks', 'Like', $nama_kompositor)
                    //->where('input_realisasi.triwulan_id', $result->triwulan_id)
                    ->select(
                        'input_realisasi.*',
                        'realisasi_kompositor.*',
                        'kompositor.*',
                        'indeks.nama_indeks'
                    )->get();
                $realisasi_produksi_lifting_minyak = 0;
                $realisasi_impor_minyak = 0;
                $realisasi_ekspor_minyak = 0;
                $kebutuhan_kilang_minyak = 0;
                foreach ($res_realisasi as $realisasi) {
                    if (trim($realisasi->nama_kompositor) == 'Realisasi Produksi/Lifting Minyak') {
                        $realisasi_produksi_lifting_minyak = $realisasi->nilai;
                    } elseif (trim($realisasi->nama_kompositor) == 'Realisasi Impor Minyak') {
                        $realisasi_impor_minyak = $realisasi->nilai;
                    } elseif (trim($realisasi->nama_kompositor) == 'Realisasi Ekspor Minyak') {
                        $realisasi_ekspor_minyak = $realisasi->nilai;
                    } elseif (trim($realisasi->nama_kompositor) == 'Kebutuhan Kilang Minyak') {
                        $kebutuhan_kilang_minyak = $realisasi->nilai;
                    }
                }
                $realisasi = (($realisasi_produksi_lifting_minyak + $realisasi_impor_minyak) - $realisasi_ekspor_minyak) / $kebutuhan_kilang_minyak;
                break;
            case 'Indeks Ketersediaan Hulu Gas':
                //query kompositor dan parameter
                $res_kompo_param = DB::table('kompositor')
                    ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                    ->join('realisasi_kompositor', 'kompositor.id', '=', 'realisasi_kompositor.kompositor_id')
                    ->join('kompositor_parameter', 'kompositor.id', '=', 'kompositor_parameter.kompositor_id', 'left')
                    ->join('parameter', 'kompositor_parameter.parameter_id', '=', 'parameter.id', 'left')
                    ->where('indeks.nama_indeks', '=', $nama_kompositor)
                    //->where('kompositor.jenis_kompositor_id', '=', 2)
                    ->select(
                        'kompositor.*',
                        'parameter.nama_parameter',
                        'parameter.kalkulasi',
                        'parameter.value',
                        'realisasi_kompositor.nilai'
                    )
                    ->get();
                $data['res_kompo_param'] = $res_kompo_param;

                if ($nama_kompositor == "Realisasi Produksi/Lifting Gas Bumi MMSCF") {
                    $realisasi_produksi_lifting_gas_bumi_mmscf = 0;
                    $parameter_tw1 = 0;
                    $parameter_tw2 = 0;
                    $parameter_tw3 = 0;
                    $parameter_tw4 = 0;
                    $realisasi_produksi_lifting_gas_bumi_tw_before = 0;
                    foreach ($res_kompo_param as $subrow) {
                        if (trim($subrow->nama_kompositor) == "Realisasi Produksi/Lifting Gas Bumi") {
                            $realisasi_produksi_lifting_gas_bumi_mmscf = $subrow->nilai;
                        }
                        if (trim($subrow->nama_kompositor) == "Parameter TW I") {
                            $parameter_tw1 = $subrow->nilai;
                        }
                        if (trim($subrow->nama_kompositor) == "Parameter TW II") {
                            $parameter_tw2 = $subrow->nilai;
                        }
                        if (trim($subrow->nama_kompositor) == "Parameter TW III") {
                            $parameter_tw3 = $subrow->nilai;
                        }
                        if (trim($subrow->nama_kompositor) == "Parameter TW IV") {
                            $parameter_tw4 = $subrow->nilai;
                        }
                        if (trim($subrow->nama_kompositor) == "Realisasi Produksi/Lifting Gas Bumi (TW-1)") {
                            $realisasi_produksi_lifting_gas_bumi_tw_before = $subrow->nilai;
                        }
                    }
                    if ($triwulan == 1) {
                        $realisasi = ($realisasi_produksi_lifting_gas_bumi_mmscf * $parameter_tw1);
                    } elseif ($triwulan == 2) {
                        $realisasi = ($realisasi_produksi_lifting_gas_bumi_mmscf * $parameter_tw2) + $realisasi_produksi_lifting_gas_bumi_tw_before;
                    } elseif ($triwulan == 3) {
                        $realisasi = ($realisasi_produksi_lifting_gas_bumi_mmscf * $parameter_tw3) + $realisasi_produksi_lifting_gas_bumi_tw_before;
                    } elseif ($triwulan == 4) {
                        $realisasi = ($realisasi_produksi_lifting_gas_bumi_mmscf * $parameter_tw4) + $realisasi_produksi_lifting_gas_bumi_tw_before;
                    }
                } elseif ($nama_kompositor == "Realisasi Produksi/Lifting Gas Bumi BBTU") {
                    $realisasi_produksi_lifting_gas_bumi_bbtu = 0;
                    $parameter = 0;
                    foreach ($res_kompo_param as $subrow) {
                        if (trim($subrow->nama_kompositor) == "Realisasi Produksi/Lifting Gas Bumi MMSCF") {
                            $realisasi_produksi_lifting_gas_bumi_bbtu = $subrow->nilai;
                        } elseif (trim($subrow->nama_kompositor) == "Parameter 1027 Realisasi Produksi/Lifting Gas Bumi BBTU") {
                            $parameter = $subrow->value;
                        }
                    }
                    $realisasi = $realisasi_produksi_lifting_gas_bumi_bbtu * $parameter;
                } elseif ($nama_kompositor == "Realisasi Alokasi Gas Dom") {
                    $realisasi_produksi_lifting_gas_bumi_bbtu = 0;
                    $parameter_tw1 = 0;
                    $parameter_tw2 = 0;
                    $parameter_tw3 = 0;
                    $parameter_tw4 = 0;
                    $realisasi_produksi_lifting_gas_dom_tw_before = 0;
                    foreach ($res_kompo_param as $subrow) {
                        if (trim($subrow->nama_kompositor) == "Realisasi Alokasi Gas Dom") {
                            $realisasi_produksi_lifting_gas_bumi_bbtu = $subrow->nilai;
                        }
                        if (trim($subrow->nama_kompositor) == "Parameter TW I") {
                            $parameter_tw1 = $subrow->nilai;
                        }
                        if (trim($subrow->nama_kompositor) == "Parameter TW II") {
                            $parameter_tw2 = $subrow->nilai;
                        }
                        if (trim($subrow->nama_kompositor) == "Parameter TW III") {
                            $parameter_tw3 = $subrow->nilai;
                        }
                        if (trim($subrow->nama_kompositor) == "Parameter TW IV") {
                            $parameter_tw4 = $subrow->nilai;
                        }
                        if (trim($subrow->nama_kompositor) == "Realisasi Alokasi Gas Dom (TW-1)") {
                            $realisasi_produksi_lifting_gas_dom_tw_before = $subrow->nilai;
                        }
                    }
                    if ($triwulan == 1) {
                        $realisasi = ($realisasi_produksi_lifting_gas_bumi_bbtu * $parameter_tw1);
                    } elseif ($triwulan == 2) {
                        $realisasi = ($realisasi_produksi_lifting_gas_bumi_bbtu * $parameter_tw2) + $realisasi_produksi_lifting_gas_dom_tw_before;
                    } elseif ($triwulan == 3) {
                        $realisasi = ($realisasi_produksi_lifting_gas_bumi_bbtu * $parameter_tw3) + $realisasi_produksi_lifting_gas_dom_tw_before;
                    } elseif ($triwulan == 4) {
                        $realisasi = ($realisasi_produksi_lifting_gas_bumi_bbtu * $parameter_tw4) + $realisasi_produksi_lifting_gas_dom_tw_before;
                    }
                }
                break;
            case 'Indeks Ketersediaan Hulu Migas':
                $res_realisasi = DB::table('indikator')
                    ->join('indikator_kompositor', 'indikator.id', '=', 'indikator_kompositor.indikator_id')
                    ->join('kompositor', 'indikator_kompositor.kompositor_id', '=', 'kompositor.id')
                    ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                    ->join('realisasi_kompositor', 'kompositor.id', '=', 'realisasi_kompositor.kompositor_id')
                    ->join('input_realisasi', 'input_realisasi.id', '=', 'realisasi_kompositor.input_realisasi_id')
                    ->where('indeks.nama_indeks', 'Like', 'Indeks Ketersediaan Hulu Migas')
                    ->where('input_realisasi.triwulan_id', $result->triwulan_id)
                    ->select(
                        'input_realisasi.*',
                        'realisasi_kompositor.*',
                        'kompositor.*',
                        'indeks.nama_indeks'
                    )->get();
                $indeks_ketersediaan_hulu_minyak = 0;
                $indeks_ketersediaan_hulu_gas = 0;
                foreach ($res_realisasi as $realisasi) {
                    if (trim($realisasi->nama_kompositor) == 'Indeks Ketersediaan Hulu Minyak') {
                        $indeks_ketersediaan_hulu_minyak = $realisasi->nilai;
                    } elseif (trim($realisasi->nama_kompositor) == 'Indeks Ketersediaan Hulu Gas') {
                        $indeks_ketersediaan_hulu_gas = $realisasi->nilai;
                    }
                }
                $realisasi = ($indeks_ketersediaan_hulu_minyak + $indeks_ketersediaan_hulu_gas) / 2;
                break;
            case 'Indeks Ketersediaan BBM':
                $res_kompo_param = DB::table('kompositor')
                    ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                    ->join('realisasi_kompositor', 'kompositor.id', '=', 'realisasi_kompositor.kompositor_id')
                    ->join('input_realisasi', 'realisasi_kompositor.input_realisasi_id', '=', 'input_realisasi.id')
                    ->join('kompositor_parameter', 'kompositor.id', '=', 'kompositor_parameter.kompositor_id', 'left')
                    ->join('parameter', 'kompositor_parameter.parameter_id', '=', 'parameter.id', 'left')
                    ->where('indeks.nama_indeks', '=', $nama_kompositor)
                    ->where('input_realisasi.triwulan_id', '=', $triwulan)
                    ->select(
                        'kompositor.*',
                        'parameter.nama_parameter',
                        'parameter.kalkulasi',
                        'parameter.value',
                        'realisasi_kompositor.nilai'
                    )
                    ->get();
                $data['res_kompo_param'] = $res_kompo_param;
                $realisasi_produksi_bbm = 0;
                $realisasi_produksi_hasil_olahan = 0;
                $parameter_90 = 0;
                if ($nama_kompositor == 'Deviasi Kuantitas Impor Minyak Mentah untuk Feedstock Kilang dari Kuantitas yang Direkomendasikan') {
                    $selisih_realisasi_kuota = 0;
                    $kuota_impor_minyak_mentah = 0;
                    foreach ($res_kompo_param as $subrow) {
                        if (trim($subrow->nama_kompositor) == 'Selisih realisasi dan kuota (bbl)') {
                            $selisih_realisasi_kuota = $subrow->nilai;
                        } elseif (trim($subrow->nama_kompositor) == 'Kuota Impor Minyak Mentah') {
                            $kuota_impor_minyak_mentah = $subrow->nilai;
                        }
                    }
                    $realisasi = $selisih_realisasi_kuota / $kuota_impor_minyak_mentah;
                } elseif ($nama_kompositor == 'Deviasi Kuantitas Impor BBM dari Kuantitas yang Direkomendasikan') {
                    $realisasi_deviasi = 0;
                    foreach ($res_kompo_param as $subrow) {
                        if (trim($subrow->nama_kompositor) == "Realisasi Deviasi") {
                            $realisasi_deviasi = $subrow->nilai;
                        }
                    }
                    $realisasi = $realisasi_deviasi;
                } else {
                    foreach ($res_kompo_param as $subrow) {
                        if (trim($subrow->nama_kompositor) == "Realisasi Produksi BBM") {
                            $realisasi_produksi_bbm = $subrow->nilai;
                        } elseif (trim($subrow->nama_kompositor) == "Realisasi Produksi Hasil Olahan") {
                            $realisasi_produksi_hasil_olahan = $subrow->nilai;
                        } elseif (trim($subrow->nama_kompositor) == "Parameter 90") {
                            $parameter_90 = $subrow->nilai;
                        }
                    }
                    $realisasi = ($realisasi_produksi_bbm + $realisasi_produksi_hasil_olahan) / $parameter_90;
                }
            case 'Indeks Ketersediaan LPG':


            case 'Indeks Ketersediaan LNG':
                //query kompositor
                $res_realisasi = DB::table('indikator')
                    ->join('indikator_kompositor', 'indikator.id', '=', 'indikator_kompositor.indikator_id')
                    ->join('kompositor', 'indikator_kompositor.kompositor_id', '=', 'kompositor.id')
                    ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                    ->join('realisasi_kompositor', 'kompositor.id', '=', 'realisasi_kompositor.kompositor_id')
                    ->join('input_realisasi', 'input_realisasi.id', '=', 'realisasi_kompositor.input_realisasi_id')
                    ->where('indeks.nama_indeks', 'Like', 'Indeks Ketersediaan LNG')
                    ->where('input_realisasi.triwulan_id', $result->triwulan_id)
                    ->select(
                        'input_realisasi.*',
                        'realisasi_kompositor.*',
                        'kompositor.*',
                        'indeks.nama_indeks'
                    )->get();

                //foreach ($res_realisasi as $row) {
                //if($row->jenis_kompositor_id == '2'){
                //$nama_kompositor = $row->nama_kompositor;
                switch ($nama_kompositor):
                    case 'Realisasi Produksi LNG':
                        //query kompositor dan parameter
                        $res_kompo_param = DB::table('kompositor')
                            ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                            ->join('realisasi_kompositor', 'kompositor.id', '=', 'realisasi_kompositor.kompositor_id')
                            ->join('kompositor_parameter', 'kompositor.id', '=', 'kompositor_parameter.kompositor_id', 'left')
                            ->join('parameter', 'kompositor_parameter.parameter_id', '=', 'parameter.id', 'left')
                            ->where('indeks.nama_indeks', '=', $nama_kompositor)
                            ->select(
                                'kompositor.*',
                                'parameter.nama_parameter',
                                'parameter.kalkulasi',
                                'parameter.value',
                                'realisasi_kompositor.nilai'
                            )
                            ->get();
                        $data['res_kompo_param'] = $res_kompo_param;
                        $realisasi = 0;
                        $realisasi_produksi_lng = 0;
                        $parameter_realisasi_produksi_lng = 0;
                        $kalkulasi = '';
                        if ($res_kompo_param->count() > 0) {
                            foreach ($res_kompo_param as $subrow) {
                                if (trim($subrow->nama_kompositor) == 'Realisasi Produksi LNG') {
                                    $realisasi_produksi_lng = $subrow->nilai;
                                } else if (trim($subrow->nama_kompositor) == 'Parameter Realisasi Produksi LNG') {
                                    $parameter_realisasi_produksi_lng = $subrow->nilai;
                                    $kalkulasi = $subrow->kalkulasi;
                                }
                            }
                            //$data['realisasi_produksi_lng'] = $realisasi_produksi_lng;
                            //$data['parameter_realisasi_produksi_lng'] = $parameter_realisasi_produksi_lng;
                            //$data['kalkulasi'] = $kalkulasi;
                            //if($kalkulasi == '*'){
                            $realisasi = $realisasi_produksi_lng * $parameter_realisasi_produksi_lng;
                            //}
                        }
                        break;
                    case 'Realisasi LNG Domestik MMBTU':
                        //query kompositor dan parameter
                        $res_kompo_param = DB::table('kompositor')
                            ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                            ->join('realisasi_kompositor', 'kompositor.id', '=', 'realisasi_kompositor.kompositor_id')
                            ->join('kompositor_parameter', 'kompositor.id', '=', 'kompositor_parameter.kompositor_id', 'left')
                            ->join('parameter', 'kompositor_parameter.parameter_id', '=', 'parameter.id', 'left')
                            ->where('indeks.nama_indeks', '=', $nama_kompositor)
                            ->select(
                                'kompositor.*',
                                'parameter.nama_parameter',
                                'parameter.kalkulasi',
                                'parameter.value',
                                'realisasi_kompositor.nilai'
                            )
                            ->get();
                        $data['res_kompo_param'] = $res_kompo_param;
                        $realisasi = 0;
                        $realisasi_lng_domestik_mmbtu = 0;
                        $parameter_1000 = 0;
                        $parameter_tw = 0;
                        $kalkulasi = '';
                        if ($res_kompo_param->count() > 0) {
                            foreach ($res_kompo_param as $subrow) {
                                if (trim($subrow->nama_kompositor) == 'Realisasi LNG Domestik MMBTU') {
                                    $realisasi_lng_domestik_mmbtu = $subrow->nilai;
                                }
                                if (trim($subrow->nama_kompositor) == 'Parameter 1000 Realisasi LNG Domestik') {
                                    $parameter_1000 = $subrow->nilai;
                                    $kalkulasi = $subrow->kalkulasi;
                                }
                                if ($triwulan == '1' && trim($subrow->nama_kompositor) == 'Parameter TW I Realisasi LNG Domestik') {
                                    $parameter_tw = $subrow->nilai;
                                } elseif ($triwulan == '2' && trim($subrow->nama_kompositor) == 'Parameter TW II Realisasi LNG Domestik') {
                                    $parameter_tw = $subrow->nilai;
                                } elseif ($triwulan == '3' && trim($subrow->nama_kompositor) == 'Parameter TW III Realisasi LNG Domestik') {
                                    $parameter_tw = $subrow->nilai;
                                } elseif ($triwulan == '4' && trim($subrow->nama_kompositor) == 'Parameter TW IV Realisasi LNG Domestik') {
                                    $parameter_tw = $subrow->nilai;
                                }
                            }
                            //$data['realisasi_produksi_lng'] = $realisasi_produksi_lng;
                            //$data['parameter_realisasi_produksi_lng'] = $parameter_realisasi_produksi_lng;
                            //$data['kalkulasi'] = $kalkulasi;
                            //if($kalkulasi == '*'){
                            $realisasi = $realisasi_lng_domestik_mmbtu * $parameter_tw * $parameter_1000;
                            //}
                        }
                        break;
                    case 'Realisasi LNG Domestik TON':
                        //query kompositor dan parameter
                        $res_kompo_param = DB::table('kompositor')
                            ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                            ->join('realisasi_kompositor', 'kompositor.id', '=', 'realisasi_kompositor.kompositor_id')
                            ->join('kompositor_parameter', 'kompositor.id', '=', 'kompositor_parameter.kompositor_id', 'left')
                            ->join('parameter', 'kompositor_parameter.parameter_id', '=', 'parameter.id', 'left')
                            ->where('indeks.nama_indeks', '=', $nama_kompositor)
                            ->select(
                                'kompositor.*',
                                'parameter.nama_parameter',
                                'parameter.kalkulasi',
                                'parameter.value',
                                'realisasi_kompositor.nilai'
                            )
                            ->get();
                        $data['res_kompo_param'] = $res_kompo_param;
                        $realisasi = 0;
                        $realisasi_produksi_lng = 0;
                        $parameter_046 = 0;
                        $parameter_047 = 0;
                        $kalkulasi = '';
                        if ($res_kompo_param->count() > 0) {
                            foreach ($res_kompo_param as $subrow) {
                                if (trim($subrow->nama_kompositor) == 'Realisasi Produksi LNG') {
                                    $realisasi_produksi_lng = $subrow->nilai;
                                }
                                if (trim($subrow->nama_kompositor) == 'Parameter 0.46 Realisasi LNG Domestik') {
                                    $parameter_046 = $subrow->nilai;
                                    $kalkulasi = $subrow->kalkulasi;
                                }
                                if (trim($subrow->nama_kompositor) == 'Parameter 0.047 Realisasi LNG Domestik') {
                                    $parameter_047 = $subrow->nilai;
                                }
                            }

                            $realisasi = $realisasi_produksi_lng * $parameter_046 * $parameter_047;
                        }
                        break;
                    case 'Realisasi Ekspor LNG':
                        //query kompositor dan parameter
                        $res_kompo_param = DB::table('kompositor')
                            ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                            ->join('realisasi_kompositor', 'kompositor.id', '=', 'realisasi_kompositor.kompositor_id')
                            ->join('kompositor_parameter', 'kompositor.id', '=', 'kompositor_parameter.kompositor_id', 'left')
                            ->join('parameter', 'kompositor_parameter.parameter_id', '=', 'parameter.id', 'left')
                            ->where('indeks.nama_indeks', '=', $nama_kompositor)
                            ->select(
                                'kompositor.*',
                                'parameter.nama_parameter',
                                'parameter.kalkulasi',
                                'parameter.value',
                                'realisasi_kompositor.nilai'
                            )
                            ->get();
                        $data['res_kompo_param'] = $res_kompo_param;
                        $realisasi = 0;
                        $realisasi_ekspor_lng_skema_hulu = 0;
                        $realisasi_ekspor_hasil_pengolahan = 0;

                        if ($res_kompo_param->count() > 0) {
                            foreach ($res_kompo_param as $subrow) {
                                if (trim($subrow->nama_kompositor) == 'Realisasi Ekspor LNG Skema Hulu') {
                                    $realisasi_ekspor_lng_skema_hulu = $subrow->nilai;
                                }
                                if (trim($subrow->nama_kompositor) == 'Realisasi Ekspor Hasil Pengolahan (Kilang LNG Hilir)') {
                                    $realisasi_ekspor_hasil_pengolahan = $subrow->nilai;
                                }
                            }
                            $realisasi = $realisasi_ekspor_lng_skema_hulu + $realisasi_ekspor_hasil_pengolahan;
                        }
                        break;
                    case 'Realisasi Ekspor Hasil Pengolahan (Kilang LNG Hilir)':
                        //query kompositor dan parameter
                        $res_kompo_param = DB::table('kompositor')
                            ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                            ->join('realisasi_kompositor', 'kompositor.id', '=', 'realisasi_kompositor.kompositor_id')
                            ->join('kompositor_parameter', 'kompositor.id', '=', 'kompositor_parameter.kompositor_id', 'left')
                            ->join('parameter', 'kompositor_parameter.parameter_id', '=', 'parameter.id', 'left')
                            ->where('indeks.nama_indeks', '=', $nama_kompositor)
                            ->select(
                                'kompositor.*',
                                'parameter.nama_parameter',
                                'parameter.kalkulasi',
                                'parameter.value',
                                'realisasi_kompositor.nilai'
                            )
                            ->get();
                        $data['res_kompo_param'] = $res_kompo_param;
                        $realisasi = 0;
                        $realisasi_ekspor_hasil_pengolahan = 0;
                        $parameter_2337 = 0;

                        if ($res_kompo_param->count() > 0) {
                            foreach ($res_kompo_param as $subrow) {
                                if (trim($subrow->nama_kompositor) == 'Realisasi Ekspor Hasil Pengolahan (Kilang LNG Hilir)') {
                                    $realisasi_ekspor_hasil_pengolahan = $subrow->nilai;
                                }
                                if (trim($subrow->nama_kompositor) == 'Parameter 23.37 Realisasi Ekspor Hasil Pengolahan (Kilang LNG Hilir)') {
                                    $parameter_2337 = $subrow->nilai;
                                }
                            }
                            $realisasi = $realisasi_ekspor_hasil_pengolahan * $parameter_2337;
                        }
                        break;
                    case 'Indeks Ketersediaan LNG':
                        break;
                endswitch;
                //}
                //}
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
            case 'Deviasi Kuantitas Impor Minyak Mentah untuk Feedstock Kilang dari Kuantitas yang Direkomendasikan':
                $res_kompo_param = DB::table('kompositor')
                    ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                    ->join('realisasi_kompositor', 'kompositor.id', '=', 'realisasi_kompositor.kompositor_id')
                    ->join('input_realisasi', 'realisasi_kompositor.input_realisasi_id', '=', 'input_realisasi.id')
                    ->join('kompositor_parameter', 'kompositor.id', '=', 'kompositor_parameter.kompositor_id', 'left')
                    ->join('parameter', 'kompositor_parameter.parameter_id', '=', 'parameter.id', 'left')
                    ->where('indeks.nama_indeks', '=', $nama_kompositor)
                    ->where('input_realisasi.triwulan_id', '=', $triwulan)
                    ->select(
                        'kompositor.*',
                        'parameter.nama_parameter',
                        'parameter.kalkulasi',
                        'parameter.value',
                        'realisasi_kompositor.nilai'
                    )
                    ->get();
                $data['res_kompo_param'] = $res_kompo_param;
                if ($res_kompo_param->count() > 0) {
                    $kuota_impor_minyak_mentah = 0;
                    $realisasi_impor_minyak_mentah = 0;
                    foreach ($res_kompo_param as $subrow) {
                        if (trim($subrow->nama_kompositor) == 'Kuota Impor Minyak Mentah') {
                            $kuota_impor_minyak_mentah = $subrow->nilai;
                        }
                        if (trim($subrow->nama_kompositor) == 'Realisasi Impor Minyak Mentah') {
                            $realisasi_impor_minyak_mentah = $subrow->nilai;
                        }
                    }
                    $realisasi = $kuota_impor_minyak_mentah - $realisasi_impor_minyak_mentah;
                }
                break;
            case 'Deviasi Kuantitas Impor BBM dari Kuantitas yang Direkomendasikan':
                $res_kompo_param = DB::table('kompositor')
                    ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                    ->join('realisasi_kompositor', 'kompositor.id', '=', 'realisasi_kompositor.kompositor_id')
                    ->join('input_realisasi', 'realisasi_kompositor.input_realisasi_id', '=', 'input_realisasi.id')
                    ->join('kompositor_parameter', 'kompositor.id', '=', 'kompositor_parameter.kompositor_id', 'left')
                    ->join('parameter', 'kompositor_parameter.parameter_id', '=', 'parameter.id', 'left')
                    ->where('indeks.nama_indeks', '=', $nama_kompositor)
                    ->where('input_realisasi.triwulan_id', '=', $triwulan)
                    ->select(
                        'kompositor.*',
                        'parameter.nama_parameter',
                        'parameter.kalkulasi',
                        'parameter.value',
                        'realisasi_kompositor.nilai'
                    )
                    ->get();
                $data['res_kompo_param'] = $res_kompo_param;
                if ($res_kompo_param->count() > 0) {
                    $selisih_realisasi_dan_kuota_bbl = 0;
                    $temp_realisasi = 0;
                    foreach ($res_kompo_param as $subrow) {
                        if (trim($subrow->nama_kompositor) == 'selisih realisasi dan kuota (bbl)') {
                            $selisih_realisasi_dan_kuota_bbl = $subrow->nilai;
                            $temp_realisasi = $selisih_realisasi_dan_kuota_bbl;
                        }

                    }
                    $realisasi = $temp_realisasi;
                }
                break;
            case 'Realisasi Deviasi':
                $res_kompo_param = DB::table('kompositor')
                    ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                    ->join('realisasi_kompositor', 'kompositor.id', '=', 'realisasi_kompositor.kompositor_id')
                    ->join('input_realisasi', 'realisasi_kompositor.input_realisasi_id', '=', 'input_realisasi.id')
                    ->join('kompositor_parameter', 'kompositor.id', '=', 'kompositor_parameter.kompositor_id', 'left')
                    ->join('parameter', 'kompositor_parameter.parameter_id', '=', 'parameter.id', 'left')
                    ->where('indeks.nama_indeks', '=', $nama_kompositor)
                    ->where('input_realisasi.triwulan_id', '=', $triwulan)
                    ->select(
                        'kompositor.*',
                        'parameter.nama_parameter',
                        'parameter.kalkulasi',
                        'parameter.value',
                        'realisasi_kompositor.nilai'
                    )
                    ->get();
                $data['res_kompo_param'] = $res_kompo_param;
                if ($res_kompo_param->count() > 0) {
                    $rekomendasi_impor_bbm = 0;
                    $realisasi_impor_bbm = 0;
                    foreach ($res_kompo_param as $subrow) {
                        if (trim($subrow->nama_kompositor) == 'Rekomendasi Impor BBM') {
                            $rekomendasi_impor_bbm = $subrow->nilai;
                        }
                        if (trim($subrow->nama_kompositor) == 'Realisasi Impor BBM') {
                            $realisasi_impor_bbm = $subrow->nilai;
                        }
                    }
                    $realisasi = 15;//$rekomendasi_impor_bbm - $realisasi_impor_bbm;
                }
                break;
        }
        $data['input_realisasi'] = $result;
        //$data['res_realisasi'] = $res_realisasi;
        $data['realisasi'] = $realisasi; //round($realisasi, 2);*/
        return json_encode($data);
    }
}
