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
use Symfony\Component\HttpFoundation\StreamedResponse;
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
    { //delete not tested yet!
        $this->authorize('input-realisasi-delete');

        $inputrealisasi->delete();
        return Redirect::route('input-realisasi.index')->with('success', 'Input Realisasi deleted!');
    }

    public function destroyKompositor(RealisasiKompositor $realisasikompositor, Request $request)
    { //delete kompositor
        $this->authorize('input-realisasi-delete');
        try {
            DB::beginTransaction();
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

            // if ($kompositor->jenis_kompositor_id == 2) {
            //     $input_realisasi->realisasi = 0; //realisasi yg ada dibiarkan saja
            //     $input_realisasi->update();
            // }
            DB::commit();
        } catch (\Illuminate\Database\QueryException $e) {
            DB::rollBack();
            $message = $e->errorInfo[2];
            return Redirect::back()->with('message', $message);
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

    public function laporanCapaianTriwulan(\Illuminate\Http\Request $request, \App\Models\LaporanCapaian $laporancapaian, \App\Models\Triwulan $triwulan)
    {
        $this->authorize('input-realisasi-list');
        $indikator = \App\Models\Indikator::where('id', $laporancapaian->indikator_id)
            ->with('level')
            ->first();
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
                ->join('level', 'indikator.level_id', '=', 'level.id')
                ->with(['realisasiKompositorPics'])
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
                ->when($request->user(), function ($query) use ($request) {
                    $user = $request->user();
                    $roles = $user->getRoleNames();

                    if (!$roles->contains('Administrator')) {
                        //$query->join('laporan_capaian_pic as lcp_user', 'laporan_capaian.id', '=', 'lcp_user.laporan_capaian_id');
                        $query->whereIn('kompositor.jenis_kompositor_id', ['1', '3']);
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
                    'jenis_kompositor.nama_jenis_kompositor',
                    'level.nama_level'
                )->distinct()
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
        try {
            DB::beginTransaction();
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
            if (strtolower(trim($kompositor->nama_kompositor)) == strtolower(trim($indikator->nama_indikator))) {
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

            activity()
                ->causedBy(auth()->user())
                ->performedOn($laporancapaian)
                ->withProperties([
                    'ip' => request()->ip(),
                    'user_agent' => request()->header('User-Agent'),
                    'laporan_capaian_id' => $request->input('laporan_capaian_id'),
                    'indikator_id' => $lapcapaian->indikator_id,
                    'realisasi' => (float) str_replace(',', '', $request->input('realisasi')),
                    'realisasi_format' => $request->input('realisasi_format'),
                    'triwulan_id' => $request->input('triwulan_id')
                ])
                ->createdAt(now()->subDays(10))
                ->event('update')
                ->log('Input Realisasi updated');
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            return $e;
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
        try {
            DB::beginTransaction();
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
                activity()
                    ->causedBy(auth()->user())
                    ->performedOn($laporan_capaian)
                    ->withProperties([
                        'ip' => request()->ip(),
                        'user_agent' => request()->header('User-Agent'),
                        'kompositor imported' => $result->count()
                    ])
                    ->createdAt(now()->subDays(10))
                    ->event('import kompositor')
                    ->log('Kompositor Import');
            }
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            return $e;
        }
        return Redirect::back()->with('message', 'Import Berhasil!');
    }

    public function _calculateRealization(\Illuminate\Http\Request $request)
    {
        $input_realisasi_id = $request->input('input_realisasi_id');
        $sumber_kompositor_id = $request->input('sumber_kompositor_id');
        $kompositor_id = $request->input('kompositor_id');
        $nama_kompositor = $request->input('nama_kompositor');
        $check_formula = $request->input('check_formula');
        $input_realisasi = InputRealisasi::find($input_realisasi_id);

        $realisasi_kompositor_id = $request->input('realisasi_kompositor_id');
        $data['input_realisasi'] = $input_realisasi;
        $laporan_capaian = LaporanCapaian::find($input_realisasi->laporan_capaian_id);
        $indikator_formula = IndikatorFormula::where('indikator_id', $laporan_capaian->indikator_id)->first();

        $data['indikator_formula'] = $indikator_formula;
        $spreadsheet = new Spreadsheet();

        if (is_object($indikator_formula)) {
            $data['indikator_formula'] = $indikator_formula;
            $data['mapping'] = json_decode($indikator_formula->mapping_realisasi);
            $formula = json_decode($indikator_formula->formula_realisasi);
            $data['formula'] = $formula;
            $formula_map = json_decode($indikator_formula->mapping_realisasi);

            //cek apakah existing indikator (sumber_kompositor_id=2)
            $realisasi_kompositor = RealisasiKompositor::query()
                ->join('input_realisasi', 'realisasi_kompositor.input_realisasi_id', '=', 'input_realisasi.id')
                ->join('kompositor', 'kompositor.id', '=', 'realisasi_kompositor.kompositor_id')
                ->where('nama_kompositor', '=', $nama_kompositor)
                ->where('input_realisasi.triwulan_id', $input_realisasi->triwulan_id)
                ->where('input_realisasi.realisasi', '<>', 0)
                ->where('realisasi_kompositor.nilai', '<>', 0)
                ->first();
            $data['temp_realisasi_kompositor'] = $realisasi_kompositor;
            if ($sumber_kompositor_id == 2) { //existing indikator

                $realisasi = 0;

                //check jenis_kompositor_id
                $kompositor = Kompositor::find($kompositor_id);
                if ($kompositor->jenis_kompositor_id == 2) { // agregasi

                } else { //input

                }
                $realisasi = $realisasi_kompositor->nilai;
                $data['realisasi'] = $realisasi;
                $data['realisasi_kompositor'] = $realisasi_kompositor;

                $sheet = $spreadsheet->getActiveSheet();

                //mapping each formula to each cell
                foreach ($formula as $cell => $value) {
                    $sheet->setCellValue($cell, $value);
                }

                //untuk menampilkan nilai formula mapping
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

                $kompositorMap = [];
                foreach ($realisasi_kompositor as $kompositor) {
                    if ($kompositor['nama_kompositor'] == 'Triwulan') {
                        $kompositor['nilai'] = $input_realisasi->triwulan_id;
                    }
                    if ($kompositor['nilai'] !== 0) {
                        $kompositorMap[$kompositor['nama_kompositor']] = $kompositor['nilai'];
                    }
                }
                //mapping kompositor to its formula
                foreach ($formula_map as $key => $name) {
                    if (isset($kompositorMap[$name])) {
                        $formula_map->$key = $kompositorMap[$name];
                    }
                }

                //mapping formula to it's parameter value
                foreach ($formula_map as $cell => $value) {
                    $sheet->setCellValue($cell, $value);
                }
                $result = $sheet->getCell('A1')->getCalculatedValue();
            } else { //new 
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
                $data['realisasi_kompositor'] = $realisasi_kompositor;
                //$data['realisasi'] = $realisasi_kompositor->nilai;
                if (count($realisasi_kompositor) > 0) {
                    //mapping formula to kompositor ----------------------------------------------
                    $kompositorMap = [];
                    foreach ($realisasi_kompositor as $kompositor) {
                        if ($kompositor['nama_kompositor'] == 'Triwulan') {
                            $kompositor['nilai'] = $input_realisasi->triwulan_id;
                        }
                        if ($kompositor['nilai'] !== 0) {
                            $kompositorMap[$kompositor['nama_kompositor']] = $kompositor['nilai'];
                        }
                    }

                    foreach ($formula_map as $key => $name) {
                        if (isset($kompositorMap[$name])) {
                            $formula_map->$key = $kompositorMap[$name];
                        }
                    }
                    $data['formula_map'] = $formula_map;

                    //calculate the formula in virtual spreadsheet ------------------------------

                    $sheet = $spreadsheet->getActiveSheet();
                    //if(is_array($formula)){
                    //mapping each formula to each cell
                    foreach ($formula as $cell => $value) {
                        $sheet->setCellValue($cell, $value);
                    }
                    //}
                    //if(is_array($formula_map)){
                    //mapping formula to it's parameter value
                    foreach ($formula_map as $cell => $value) {
                        $sheet->setCellValue($cell, $value);
                    }
                    //}

                    $result = $sheet->getCell('A1')->getCalculatedValue(); //$calculation->calculateFormula($formula, $sheet->getCell('A1'));
                    $data['realisasi'] = $result;
                    //unset($spreadsheet);
                }
            }
        } else {
            $data['message'] = 'Formula not available';
        }

        if ($request->isMethod('get')) {

            $writer = new Xlsx($spreadsheet);
            $response = new StreamedResponse(function () use ($writer) {
                $writer->save('php://output');
            });
            $response->headers->set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            //$response->headers->set('Content-Disposition', 'attachment;filename="data-usulan-akreditasi.xlsx"');
            //$response->headers->set('Cache-Control', 'max-age=0');

            return $response;
        } else {
            return $data;
        }
    }


    public function calculateRealization(\Illuminate\Http\Request $request)
    {
        //get input
        $input_realisasi_id = $request->input('input_realisasi_id');
        $sumber_kompositor_id = $request->input('sumber_kompositor_id');
        $kompositor_id = $request->input('kompositor_id');
        $nama_kompositor = $request->input('nama_kompositor');
        $check_formula = $request->input('check_formula');
        $input_realisasi = InputRealisasi::find($input_realisasi_id);
        $laporan_capaian = LaporanCapaian::find($input_realisasi->laporan_capaian_id);
        $indikator_formula = IndikatorFormula::where('indikator_id', $laporan_capaian->indikator_id)->first();

        //get kompositor
        $kompositor = Kompositor::find($kompositor_id);
        $data['kompositor'] = $kompositor;
        //initialize spreadsheet
        $spreadsheet = new Spreadsheet();

        //check for existing indikator
        if (is_object($kompositor)) {
            $result = 0;
            if ($sumber_kompositor_id == 1) { //new indikator
                if ($kompositor->jenis_kompositor_id == 2) { //agregasi
                    //get sub kompositor
                    $realisasi_kompositor = \App\Models\RealisasiKompositor::query()
                        ->join('input_realisasi', 'realisasi_kompositor.input_realisasi_id', '=', 'input_realisasi.id')
                        ->join('triwulan', 'input_realisasi.triwulan_id', '=', 'triwulan.id')
                        ->join('laporan_capaian', 'input_realisasi.laporan_capaian_id', '=', 'laporan_capaian.id')
                        ->join('kompositor', 'realisasi_kompositor.kompositor_id', '=', 'kompositor.id')
                        ->join('indikator_kompositor', 'kompositor.id', '=', 'indikator_kompositor.kompositor_id')
                        ->join('indikator', 'indikator_kompositor.indikator_id', '=', 'indikator.id')
                        ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                        ->join('jenis_kompositor', 'kompositor.jenis_kompositor_id', '=', 'jenis_kompositor.id')
                        ->where('input_realisasi.laporan_capaian_id', $input_realisasi->laporan_capaian_id)
                        ->where('input_realisasi.triwulan_id', $input_realisasi->triwulan_id)
                        ->where('laporan_capaian.periode_id', $laporan_capaian->periode_id)
                        ->select(
                            'input_realisasi.*',
                            'triwulan.triwulan',
                            'realisasi_kompositor.id as realisasi_kompositor_id',
                            'realisasi_kompositor.nilai',
                            'kompositor.nama_kompositor',
                            'kompositor.satuan',
                            'kompositor.id as kompositor_id',
                            'kompositor.sumber_kompositor_id',
                            'kompositor.jenis_kompositor_id',
                            'indeks.nama_indeks',
                            'jenis_kompositor.nama_jenis_kompositor'
                        )->get();
                    $data['temp_realisasi_kompositor'] = $realisasi_kompositor;

                    //get formula
                    $formula = json_decode($indikator_formula->formula_realisasi);
                    $formula_map = json_decode($indikator_formula->mapping_realisasi);
                    $data['formula'] = $formula;
                    //mapping formula
                    $kompositorMap = [];
                    foreach ($realisasi_kompositor as $kompositor) {
                        if ($kompositor['nama_kompositor'] == 'Triwulan') {
                            $kompositor['nilai'] = $input_realisasi->triwulan_id;
                        }
                        if ($kompositor['nilai'] !== 0) {
                            $kompositorMap[$kompositor['nama_kompositor']] = $kompositor['nilai'];
                        }
                    }
                    //mapping kompositor to its formula
                    foreach ($formula_map as $key => $name) {
                        if (isset($kompositorMap[$name])) {
                            $formula_map->$key = $kompositorMap[$name];
                        }
                    }
                    $sheet = $spreadsheet->getActiveSheet();

                    //mapping each formula to each cell
                    foreach ($formula as $cell => $value) {
                        $sheet->setCellValue($cell, $value);
                    }

                    //mapping formula to it's parameter value
                    foreach ($formula_map as $cell => $value) {
                        $sheet->setCellValue($cell, $value);
                    }
                    $result = $sheet->getCell('A1')->getCalculatedValue();
                    $data['formula_map'] = $formula_map;
                } else { //input
                    //get formula

                    //mapping formula
                }

                
            } else if($sumber_kompositor_id == 2) { // existing indikator
                //check for jenis_kompositor
                if ($kompositor->jenis_kompositor_id == 2) { //agregasi
                    $realisasi_kompositor = RealisasiKompositor::query()
                        ->join('input_realisasi', 'realisasi_kompositor.input_realisasi_id', '=', 'input_realisasi.id')
                        ->join('kompositor', 'kompositor.id', '=', 'realisasi_kompositor.kompositor_id')
                        ->where('nama_kompositor', '=', $nama_kompositor)
                        ->where('jenis_kompositor_id', '=', 2) //agregasi
                        ->where('input_realisasi.triwulan_id', $input_realisasi->triwulan_id)
                        ->where('input_realisasi.realisasi', '<>', 0)
                        ->where('realisasi_kompositor.nilai', '<>', 0)
                        ->first();
                    $data['realisasi_kompositor'] = $realisasi_kompositor;
                    if (is_object($realisasi_kompositor)) {
                        $result = $realisasi_kompositor->nilai;
                        $data['realisasi'] = $result;
                    }
                    //get sub kompositor
                    $temp_realisasi_kompositor = \App\Models\RealisasiKompositor::query()
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
                            'kompositor.jenis_kompositor_id',
                            'indeks.nama_indeks',
                            'jenis_kompositor.nama_jenis_kompositor'
                        )->get();
                    $data['temp_realisasi_kompositor'] = $temp_realisasi_kompositor;

                    //get formula
                    $formula = json_decode($indikator_formula->formula_realisasi);
                    $formula_map = json_decode($indikator_formula->mapping_realisasi);
                    $data['formula'] = $formula;
                    if (is_array($formula) && is_array($formula_map)) {
                        //mapping formula
                        $kompositorMap = [];
                        foreach ($temp_realisasi_kompositor as $kompositor) {
                            if ($kompositor['nama_kompositor'] == 'Triwulan') {
                                $kompositor['nilai'] = $input_realisasi->triwulan_id;
                            }
                            //if ($kompositor['nilai'] !== 0) {
                            $kompositorMap[$kompositor['nama_kompositor']] = $kompositor['nilai'];
                            //}
                        }
                        //mapping kompositor to its formula
                        foreach ($formula_map as $key => $name) {
                            if (isset($kompositorMap[$name])) {
                                $formula_map->$key = $kompositorMap[$name];
                            }
                        }
                        $sheet = $spreadsheet->getActiveSheet();

                        //mapping each formula to each cell
                        foreach ($formula as $cell => $value) {
                            $sheet->setCellValue($cell, $value);
                        }

                        //mapping formula to it's parameter value
                        foreach ($formula_map as $cell => $value) {
                            $sheet->setCellValue($cell, $value);
                        }
                    }
                    $data['formula_map'] = $formula_map;
                    //$result = $sheet->getCell('A1')->getCalculatedValue();
                } else { //input
                    //get formula

                    //mapping formula
                }
            }else if($sumber_kompositor_id == 3){

            }

            $data['realisasi'] = $result;
        } else {
            $data['message'] = "Indikator not found!";
        }

        if ($request->isMethod('get')) {

            $writer = new Xlsx($spreadsheet);
            $response = new StreamedResponse(function () use ($writer) {
                $writer->save('php://output');
            });
            $response->headers->set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            //$response->headers->set('Content-Disposition', 'attachment;filename="data-usulan-akreditasi.xlsx"');
            //$response->headers->set('Cache-Control', 'max-age=0');

            return $response;
        } else {
            return $data;
        }
    }
}
