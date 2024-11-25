<?php

namespace App\Http\Controllers;

//use Illuminate\Support\Facades\Request;
use App\Models\InputRealisasi;
use App\Models\InputRealisasiPic;
use App\Models\KategoriKinerja;
use App\Models\KinerjaTriwulan;
use App\Models\LaporanCapaianPic;
use App\Models\RealisasiKompositor;
use App\Models\RealisasiKompositorPic;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\LaporanCapaian;
use App\Http\Resources\LaporanCapaianCollection;
use App\Http\Resources\LaporanCapaianResource;
use App\Http\Requests\LaporanCapaianRequest;
use Illuminate\Support\Facades\DB;
use Storage;
use Validator;


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
                    'triwulans' => \App\Models\Triwulan::all(),
                    'def_pics' => ($this->getPics($laporancapaian)),
                    'kategori_kinerja' => \App\Models\KategoriKinerja::all()
        ]);
    }

    function getPics($laporancapaian) {
        //$indikator_kompositor = \App\Models\Indikator::where('id', $indikator->indikator_kompositor_id)->first();
        $temp_res = DB::table('laporan_capaian')
                ->join('laporan_capaian_pic', 'laporan_capaian.id', '=', 'laporan_capaian_pic.laporan_capaian_id')
                ->where('laporan_capaian.id', '=', $laporancapaian->id)
                ->select('laporan_capaian_pic.*')
                ->get();
        $def_pics = [];
        $i = 0;
        foreach ($temp_res as $row) {
            $def_pics[$i] = ['value' => $row->pic_id, 'label' => $row->nama_pic];
            $i++;
        }
        return $def_pics;
    }

    public function index(Request $request) {
        
        $select = LaporanCapaian::query()
                ->join('indikator', 'laporan_capaian.indikator_id', '=', 'indikator.id')
                ->join('periode', 'laporan_capaian.periode_id', '=', 'periode.id')
                ->join('level', 'indikator.level_id', '=', 'level.id')
                ->join('satuan', 'indikator.satuan_id', '=', 'satuan.id')
                ->with('kinerjaTriwulan')
                ->with('laporanCapaianPic')
                ->with('inputRealisasi')
                ->with('kategoriKinerja')
                ->when(\Illuminate\Support\Facades\Request::input('flevel'), function ($query, $search) {
                    if ($search != '') {
                        $query->where('level.nama_level', 'like', "%{$search}%");
                    }
                })
                ->when(\Illuminate\Support\Facades\Request::input('fpic'), function ($query, $search) {
                    if ($search != '') {
                        $query->join('laporan_capaian_pic', 'laporan_capaian.id', '=', 'laporan_capaian_pic.laporan_capaian_id');
                        $query->where('laporan_capaian_pic.nama_pic', 'like', "%{$search}%");
                    }
                })
                ->when(\Illuminate\Support\Facades\Request::input('findikator'), function ($query, $search) {
                    if ($search != '') {
                        $query->where('indikator.nama_indikator', 'like', "%{$search}%");
                    }
                })
                ->when(\Illuminate\Support\Facades\Request::input('fperiode'), function ($query, $search) {
                    if ($search != '') {
                        $query->where('periode.periode', '=', "{$search}");
                    }
                })
                ->when($request->user(), function($query) use ($request){
                    $roles = $request->user()->getRoleNames();
                    if($roles[0] !=='Administrator'){
                        $user_id = $request->user()->only('id');
                        $user = \App\Models\User::where('id',$user_id)->first();
                        $query->join('laporan_capaian_pic', 'laporan_capaian.id', '=', 'laporan_capaian_pic.laporan_capaian_id');
                        $query->where('laporan_capaian_pic.pic_id', '=', $user->pic_id);
                    }
                })
                ->select('laporan_capaian.*',
                        'indikator.nama_indikator',
                        'indikator.numbering',
                        'periode.periode',
                        'level.nama_level',
                        'satuan.nama_satuan')
                ->orderBy('indikator.level_id')
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
        $input = $request->all();
        $validation = Validator::make($input, [
            'periode_id' => 'required',
            'indikator_id' => 'required',
            'kategori_kinerja_id' => 'nullable',
            'target' => 'required',
            'target_format' => 'nullable',
            'status_kinerja' => 'nullable',
            'kinerja_tahunan' => 'nullable',
            'sumber_data' => 'nullable'
        ]);
        
        $laporancapaian->update([
            'periode_id' => $input['periode_id'],
            'indikator_id' => $input['indikator_id'],
            'kategori_kinerja_id' => $input['kategori_kinerja_id'],
            'target' => (float)str_replace(',','',$input['target']),
            'target_format' => $input['target_format'],
            'status_kinerja' => $input['status_kinerja'],
            'kinerja_tahunan' => $input['kinerja_tahunan'],
            'sumber_data' => $input['sumber_data']       
        ]);
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
            // $indikators = DB::table('indikator')
            //         ->select('indikator.*')
            //         ->leftJoin('laporan_capaian', 'indikator.id', '=', 'laporan_capaian.indikator_id')
            //         ->whereNull('laporan_capaian.id')
            //         ->get();
            $indikators = \App\Models\Indikator::whereNotIn('id', function($query)use($periode) {
                $query->select('indikator_id')
                      ->from('laporan_capaian')
                      ->where('periode_id','=', $periode->id);
            })->get();
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
                    $pics = \App\Models\IndikatorPic::where('indikator_id', $indikator->id)->get();
                    if (($pics->count()) > 0) {
                        foreach ($pics as $pic) {
                            $obj_lc_pic = \App\Models\LaporanCapaianPic::where('laporan_capaian_id', '=', $obj_lap_capaian->id)
                                        ->where('pic_id', '=', $pic->pic_id)->first();
                            if(is_object($obj_lc_pic)){
                                $obj_lc_pic->delete();
                            }
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
                            if (!is_object($obj_input_realisasi)) {
                                $input = \App\Models\InputRealisasi::create($object);
                            } else {
                                $input = $obj_input_realisasi;
                            }
                            //insert input_realisasi_pic;
                            if (!is_object($obj_input_realisasi)) {
                                
                                foreach ($pics as $rowpic) {
                                    $obj_ir_pic = InputRealisasiPic::where('input_realisasi_id', '=', $input->id)
                                        ->where('pic_id', '=', $rowpic->pic_id)->first();
                                        if(is_object($obj_ir_pic)){
                                            $obj_ir_pic->delete();
                                        }
                                    $temp_lap_pic = ['input_realisasi_id' => $input->id,
                                        'pic_id' => $rowpic->pic_id,
                                        'nama_pic' => $rowpic->nama_pic];
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

    public function deleteAllByPeriode($periode_id){
        $laporan_capaians = LaporanCapaian::where('periode_id', '=', $periode_id)->get();
        foreach($laporan_capaians as $lc){
            //hapus laporan capaian pic
            $lc_pics = LaporanCapaianPic::where('laporan_capaian_id', '=', $lc->id)->delete();
            
            //hapus kinerja triwulan
            $kinerja_triwulan = KinerjaTriwulan::where('laporan_capaian_id', '=', $lc->id)->delete();
            
            //hapus input realisasi
            $input_realisasi = InputRealisasi::where('laporan_capaian_id', '=', $lc->id)->get();
            foreach($input_realisasi as $ir){
                //hapus input realisasi pic
                
                $ir_pic = InputRealisasiPic::where('input_realisasi_id', '=', $ir->id)->delete();
                
                $realisasi_kompositor = RealisasiKompositor::where('input_realisasi_id', '=', $ir->id)->delete();
                /*foreach($realisasi_kompositor as $rk){
                    $rk_ic = RealisasiKompositorPic::where('realisasi_kompositor_id', '=', $rk->id)->delete();
                }*/
                $ir->delete();
            }
            $lc->delete();
        }
        return response()->json(['message' => "Laporan capaian deleted!", 'success' => true]);
    }

    public function uploadMatrixCapaian(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'file' => ['required', 'extensions:xlsx', 'max:2048'],
            'periode' => 'required'
        ]);
        if ($validator->fails()) {
            return Redirect::back($validator->errors());
        }
        if ($request->file()) {            
            $file_name = $request->file('file')->getClientOriginalName();
            $file_type = $request->file('file')->getMimeType(); //getClientOriginalExtension() //; //getClientMimeType();
            $file_path = $request->file('file')->store($input['periode']);
            $params['file_path'] = $file_path;
            $this->readMatrix($params);
        }
    }

    private function readMatrix($params)
    {
        $file_path = Storage::disk('local')->path($params['file_path']); //base_path($params['file_path']);
        $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($file_path);
        $spreadsheet->setActiveSheetIndex(0);
        $start_row = 4;
        $indikator = trim($spreadsheet->getActiveSheet()->getCell('B' . strval($start_row))->getValue());
        $level = trim($spreadsheet->getActiveSheet()->getCell('C' . strval($start_row))->getValue());
        $target = $spreadsheet->getActiveSheet()->getCell('F' . strval($start_row))->getCalculatedValue();
        $realisasi_tw1 = $spreadsheet->getActiveSheet()->getCell('G' . strval($start_row))->getCalculatedValue();
        $realisasi_tw2 = $spreadsheet->getActiveSheet()->getCell('H' . strval($start_row))->getCalculatedValue();
        $realisasi_tw3 = $spreadsheet->getActiveSheet()->getCell('I' . strval($start_row))->getCalculatedValue();
        $realisasi_tw4 = $spreadsheet->getActiveSheet()->getCell('J' . strval($start_row))->getCalculatedValue();
        $kinerja_tw1 = $spreadsheet->getActiveSheet()->getCell('K' . strval($start_row))->getCalculatedValue();
        $kinerja_tw2 = $spreadsheet->getActiveSheet()->getCell('L' . strval($start_row))->getCalculatedValue();
        $kinerja_tw3 = $spreadsheet->getActiveSheet()->getCell('M' . strval($start_row))->getCalculatedValue();
        $kinerja_tw4 = $spreadsheet->getActiveSheet()->getCell('N' . strval($start_row))->getCalculatedValue();
        $kinerja_tahunan = $spreadsheet->getActiveSheet()->getCell('O' . strval($start_row))->getCalculatedValue();
        $kategori_kinerja = $spreadsheet->getActiveSheet()->getCell('P' . strval($start_row))->getCalculatedValue();
        $status_kinerja = $spreadsheet->getActiveSheet()->getCell('Q' . strval($start_row))->getCalculatedValue();


    }
    
}
