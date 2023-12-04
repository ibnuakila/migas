<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PeriodeController;
use App\Http\Controllers\IndikatorController;
use App\Http\Controllers\PICController;
use App\Http\Controllers\IndikatorPeriodeController;
use App\Http\Controllers\LaporanCapaianController;
use App\Http\Controllers\SatuanController;
use App\Http\Controllers\LevelController;
use App\Http\Controllers\KategoriKinerjaController;
use App\Http\Controllers\EvaluasiAkipController;
use App\Http\Controllers\UploadFileController;
use App\Http\Controllers\HasilEvaluasiController;
use App\Http\Controllers\KategoriDokumenController;
use App\Http\Controllers\InstrumentKinerjaController;
use App\Http\Controllers\IndikatorKompositorController;
use App\Http\Controllers\InputRealisasiController;
use App\Http\Controllers\HitungKompositorController;
use App\Http\Controllers\IndeksController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\KompositorController;
use App\Models\Periode;
use App\Models\Indikator;
use Illuminate\Support\Facades\DB;

/*
  |--------------------------------------------------------------------------
  | Web Routes
  |--------------------------------------------------------------------------
  |
  | Here is where you can register web routes for your application. These
  | routes are loaded by the RouteServiceProvider within a group which
  | contains the "web" middleware group. Now create something great!
  |
 */

Route::get('/', function () {
    return Inertia::render('Auth/Login', [
        'canLogin' => Route::has('login'),
        //'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/home', function () {
    return Inertia::render('Home');
})->middleware(['auth', 'verified'])->name('home');

Route::middleware('auth')->group(function () {
    Route::get('/periode', [PeriodeController::class, 'index'])->name('periode.index');
    Route::get('/periode/edit/{periode}', [PeriodeController::class, 'edit'])->name('periode.edit');
    Route::get('/periode/create', [PeriodeController::class, 'create'])->name('periode.create');
    Route::post('/periode/store', [PeriodeController::class, 'store'])->name('periode.store');
    Route::put('/periode/{periode}', [PeriodeController::class, 'update'])->name('periode.update');
    Route::delete('/periode/{periode}', [PeriodeController::class, 'destroy'])->name('periode.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/indikator', [IndikatorController::class, 'index'])->name('indikator.index');
    Route::get('/indikator/create', [IndikatorController::class, 'create'])->name('indikator.create');
    Route::post('/indikator/store', [IndikatorController::class, 'store'])->name('indikator.store');
    Route::get('/indikator/edit/{indikator}', [IndikatorController::class, 'edit'])->name('indikator.edit');
    Route::put('/indikator/update/{indikator}', [IndikatorController::class, 'update'])->name('indikator.update');
    Route::delete('/indikator/delete/{indikator}', [IndikatorController::class, 'destroy'])->name('indikator.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/kompositor/index/', [KompositorController::class, 'index'])->name('kompositor.index');
    Route::get('/kompositor/create/{indikator}', [KompositorController::class, 'create'])->name('kompositor.create');
    Route::post('/kompositor/store', [KompositorController::class, 'store'])->name('kompositor.store');
    Route::get('/kompositor/edit/{kompositor}', [KompositorController::class, 'edit'])->name('kompositor.edit');
    Route::put('/kompositor/{kompositor}', [KompositorController::class, 'update'])->name('kompositor.update');
    Route::delete('/kompositor/{kompositor}', [KompositorController::class, 'destroy'])->name('kompositor.destroy');
    Route::get('/kompositor/index-indikator/{indikator}', [KompositorController::class, 'indexIndikator'])->name('kompositor.index-indikator');
    Route::get('/kompositor/agregasi-kompositor/{indeks}', [KompositorController::class, 'agregasiKompositor'])->name('kompositor.agregasi-kompositor');
});

Route::middleware('auth')->group(function () {
    Route::get('/hitung-kompositor/{indikatorkompositor}', [HitungKompositorController::class, 'index'])->name('hitung-kompositor.index');
    Route::get('/hitung-kompositor/create/{indikatorkompositor}', [HitungKompositorController::class, 'create'])->name('hitung-kompositor.create');
    Route::post('/hitung-kompositor/store', [HitungKompositorController::class, 'store'])->name('hitung-kompositor.store');
    Route::get('/hitung-kompositor/edit/{hitungkompositor}', [HitungKompositorController::class, 'edit'])->name('hitung-kompositor.edit');
    Route::put('/hitung-kompositor/{hitungkompositor}', [HitungKompositorController::class, 'update'])->name('hitung-kompositor.update');
    Route::delete('/hitung-kompositor/{hitungkompositor}', [HitungKompositorController::class, 'destroy'])->name('hitung-kompositor.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/pic', [PICController::class, 'index'])->name('pic.index');
    Route::get('/pic/create', [PICController::class, 'create'])->name('pic.create');
    Route::post('/pic/store', [PICController::class, 'store'])->name('pic.store');
    Route::get('/pic/edit/{pic}', [PICController::class, 'edit'])->name('pic.edit');
    Route::put('/pic/{pic}', [PICController::class, 'update'])->name('pic.update');
    Route::delete('/pic/{pic}', [PICController::class, 'destroy'])->name('pic.destroy');
});

/*Route::middleware('auth')->group(function () {
    Route::get('/indikator-periode', [IndikatorPeriodeController::class, 'index'])->name('indikator-periode.index');
    Route::get('/indikator-periode/edit/{indikatorperiode}', [IndikatorPeriodeController::class, 'edit'])->name('indikator-periode.edit');
    Route::get('/indikator-periode/create', [IndikatorPeriodeController::class, 'create'])->name('indikator-periode.create');
    Route::post('/indikator-periode/store', [IndikatorPeriodeController::class, 'store'])->name('indikator-periode.store');
    Route::put('/indikator-periode/{indikatorperiode}', [IndikatorPeriodeController::class, 'update'])->name('indikator-periode.update');
    Route::delete('/indikator-periode/{indikatorperiode}', [IndikatorPeriodeController::class, 'destroy'])->name('indikator-periode.destroy');
    Route::get('/indikator-periode/importindikator', [IndikatorPeriodeController::class, 'importIndikator'])->name('indikator-periode.importindikator');
});*/

Route::middleware('auth')->group(function () {
    Route::get('/laporan-capaian', [LaporanCapaianController::class, 'index'])->name('laporan-capaian.index');
    Route::get('/laporan-capaian/edit/{laporancapaian}', [LaporanCapaianController::class, 'edit'])->name('laporan-capaian.edit');
    Route::get('/laporan-capaian/create', [LaporanCapaianController::class, 'create'])->name('laporan-capaian.create');
    Route::post('/laporan-capaian/store', [LaporanCapaianController::class, 'store'])->name('laporan-capaian.store');
    Route::put('/laporan-capaian/{laporancapaian}', [LaporanCapaianController::class, 'update'])->name('laporan-capaian.update');
    Route::delete('/laporan-capaian/{laporancapaian}', [LaporanCapaianController::class, 'destroy'])->name('laporan-capaian.destroy');
    Route::get('/laporan-capaian/importindikator', [LaporanCapaianController::class, 'importIndikator'])->name('laporan-capaian.importindikator');
    Route::get('/laporan-capaian/calculatekinerja', [LaporanCapaianController::class, 'calculateKinerja'])->name('laporan-capaian.calculatekinerja');
});

Route::middleware('auth')->group(function () {
    Route::get('/input-realisasi/index/', [InputRealisasiController::class, 'index'])->name('input-realisasi.index');
    Route::get('/input-realisasi/index-indikator/{laporancapaian}', [InputRealisasiController::class, 'indexIndikator'])->name('input-realisasi.index-indikator');
    Route::get('/input-realisasi/create', [InputRealisasiController::class, 'create'])->name('input-realisasi.create');
    Route::post('/input-realisasi/store', [InputRealisasiController::class, 'store'])->name('input-realisasi.store');
    Route::get('/input-realisasi/edit/{inputrealisasi}', [InputRealisasiController::class, 'edit'])->name('input-realisasi.edit');
    Route::put('/input-realisasi/{inputrealisasi}', [InputRealisasiController::class, 'update'])->name('input-realisasi.update');
    Route::delete('/input-realisasi/{inputrealisasi}', [InputRealisasiController::class, 'destroy'])->name('input-realisasi.destroy');
    Route::get('/input-realisasi/import-kompositor', [InputRealisasiController::class, 'importKompositor'])->name('input-realisasi.import-kompositor');
    Route::post('/input-realisasi/calculate-realization/', [InputRealisasiController::class, 'calculateRealization'])
            ->name('input-realisasi.calculate-realization');
});

Route::middleware('auth')->group(function () {
    Route::get('/satuan', [SatuanController::class, 'index'])->name('satuan.index');
    Route::get('/satuan/edit/{satuan}', [SatuanController::class, 'edit'])->name('satuan.edit');
    Route::get('/satuan/create', [SatuanController::class, 'create'])->name('satuan.create');
    Route::post('/satuan/store', [SatuanController::class, 'store'])->name('satuan.store');
    Route::put('/satuan/{satuan}', [SatuanController::class, 'update'])->name('satuan.update');
    Route::delete('/satuan/{satuan}', [SatuanController::class, 'destroy'])->name('satuan.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/level', [LevelController::class, 'index'])->name('level.index');
    Route::get('/level/edit/{level}', [LevelController::class, 'edit'])->name('level.edit');
    Route::get('/level/create', [LevelController::class, 'create'])->name('level.create');
    Route::post('/level/store', [LevelController::class, 'store'])->name('level.store');
    Route::put('/level/{level}', [LevelController::class, 'update'])->name('level.update');
    Route::delete('/level/{level}', [LevelController::class, 'destroy'])->name('level.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/indeks', [IndeksController::class, 'index'])->name('indeks.index');
    Route::get('/indeks/edit/{indeks}', [IndeksController::class, 'edit'])->name('indeks.edit');
    Route::get('/indeks/create', [IndeksController::class, 'create'])->name('indeks.create');
    Route::post('/indeks/store', [IndeksController::class, 'store'])->name('indeks.store');
    Route::put('/indeks/{indeks}', [IndeksController::class, 'update'])->name('indeks.update');
    Route::delete('/indeks/{indeks}', [IndeksController::class, 'destroy'])->name('indeks.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/kategori-kinerja', [KategoriKinerjaController::class, 'index'])->name('kategori-kinerja.index');
    Route::get('/kategori-kinerja/edit/{KategoriKinerja}', [KategoriKinerjaController::class, 'edit'])->name('kategori-kinerja.edit');
    Route::get('/kategori-kinerja/create', [KategoriKinerjaController::class, 'create'])->name('kategori-kinerja.create');
    Route::post('/kategori-kinerja/store', [KategoriKinerjaController::class, 'store'])->name('kategori-kinerja.store');
    Route::put('/kategori-kinerja/{KategoriKinerja}', [KategoriKinerjaController::class, 'update'])->name('kategori-kinerja.update');
    Route::delete('/kategori-kinerja/{KategoriKinerja}', [KategoriKinerjaController::class, 'destroy'])->name('kategori-kinerja.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/role', [RoleController::class, 'index'])->name('role.index');
    Route::get('/role/edit/{role}', [RoleController::class, 'edit'])->name('role.edit');
    Route::get('/role/create', [RoleController::class, 'create'])->name('role.create');
    Route::post('/role/store', [RoleController::class, 'store'])->name('role.store');
    Route::put('/role/{role}', [RoleController::class, 'update'])->name('role.update');
    Route::delete('/role/{role}', [RoleController::class, 'destroy'])->name('role.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/user', [UserController::class, 'index'])->name('user.index');
    Route::get('/user/edit/{user}', [UserController::class, 'edit'])->name('user.edit');
    Route::get('/user/create', [UserController::class, 'create'])->name('user.create');
    Route::post('/user/store', [UserController::class, 'store'])->name('user.store');
    Route::put('/user/{user}', [UserController::class, 'update'])->name('user.update');
    Route::delete('/user/{user}', [UserController::class, 'destroy'])->name('user.destroy');
});

/*Route::middleware('auth')->group(function () {
    Route::get('/hasil-evaluasi', [HasilEvaluasiController::class, 'index'])->name('hasil-evaluasi.index');
    Route::get('/hasil-evaluasi/edit{HasilEvalasi}/', [HasilEvaluasiController::class, 'edit'])->name('hasil-evaluasi.edit');
    Route::get('/hasil-evaluasi/create', [HasilEvaluasiController::class, 'create'])->name('hasil-evaluasi.create');
    Route::post('/hasil-evaluasi/store', [HasilEvaluasiController::class, 'store'])->name('hasil-evaluasi.store');
    Route::put('/hasil-evaluasi/{HasilEvaluasi}', [HasilEvaluasiController::class, 'update'])->name('hasil-evaluasi.update');
    Route::delete('/hasil-evaluasi/{HasilEvaluasi}', [HasilEvaluasiController::class, 'destroy'])->name('hasil-evaluasi.destroy');
});*/

/*Route::middleware('auth')->group(function () {
    Route::get('/kategori-dokumen', [KategoriDokumenController::class, 'index'])->name('kategori-dokumen.index');
    Route::get('/kategori-dokumen/edit/{KategoriDokumen}', [KategoriDokumenController::class, 'edit'])->name('kategori-dokumen.edit');
    Route::get('/kategori-dokumen/create', [KategoriDokumenController::class, 'create'])->name('kategori-dokumen.create');
    Route::post('/kategori-dokumen/store', [KategoriDokumenController::class, 'store'])->name('kategori-dokumen.store');
    Route::put('/kategori-dokumen/{KategoriDokumen}', [KategoriDokumenController::class, 'update'])->name('kategori-dokumen.update');
    Route::delete('/kategori-dokumen/{KategoriDokumen}', [KategoriDokumenController::class, 'destroy'])->name('kategori-dokumen.destroy');
});*/

/*Route::middleware('auth')->group(function () {
    Route::get('/instrument-kinerja', [InstrumentKinerjaController::class, 'index'])->name('instrument-kinerja.index');
    Route::get('/instrument-kinerja/create-komponen', [InstrumentKinerjaController::class, 'createKomponen'])->name('instrument-kinerja.create-komponen');
    Route::post('/instrument-kinerja/store-komponen', [InstrumentKinerjaController::class, 'storeKomponen'])->name('instrument-kinerja.store-komponen');
    Route::get('/instrument-kinerja/edit-komponen/{komponen}', [InstrumentKinerjaController::class, 'editKomponen'])->name('instrument-kinerja.edit-komponen');
    Route::put('/instrument-kinerja/{komponen}', [InstrumentKinerjaController::class, 'updateKomponen'])->name('instrument-kinerja.update-komponen');
    Route::delete('/instrument-kinerja/{komponen}', [InstrumentKinerjaController::class, 'destroyKomponen'])->name('instrument-kinerja.destroy-komponen');

    Route::get('/instrument-kinerja/create-sub-komponen/{komponen}', [InstrumentKinerjaController::class, 'createSubKomponen'])->name('instrument-kinerja.create-sub-komponen');
    Route::post('/instrument-kinerja/store-sub-komponen', [InstrumentKinerjaController::class, 'storeSubKomponen'])->name('instrument-kinerja.store-sub-komponen');
});*/

Route::get('/test', function () {
    
    $result = App\Models\InputRealisasi::query()
                ->join('triwulan', 'input_realisasi.triwulan_id', '=', 'triwulan.id')
                ->join('realisasi_kompositor', 'input_realisasi.id', '=', 'realisasi_kompositor.input_realisasi_id')
                ->join('kompositor', 'realisasi_kompositor.kompositor_id', '=', 'kompositor.id')    
                ->join('indikator_kompositor', 'kompositor.id', '=', 'indikator_kompositor.kompositor_id')
                ->join('indikator', 'indikator_kompositor.indikator_id', '=', 'indikator.id')
                ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                ->join('jenis_kompositor', 'kompositor.jenis_kompositor_id', '=', 'jenis_kompositor.id')
                ->where('input_realisasi.laporan_capaian_id', 8)
                //->where('input_realisasi.triwulan_id', $laporancapaian->triwulan_id)
                ->select('input_realisasi.*',
                        'kompositor.nama_kompositor',
                        'kompositor.satuan',
                        'triwulan.triwulan',                        
                        'indeks.nama_indeks',
                        'jenis_kompositor.nama_jenis_kompositor'
                )
                ->with('inputRealisasiPic')
                ->get();
            
    $laporan_capaian = App\Models\LaporanCapaian::query()            
                ->join('indikator', 'laporan_capaian.indikator_id', '=', 'indikator.id')
                ->join('periode', 'laporan_capaian.periode_id', '=', 'periode.id')                
                ->join('level', 'indikator.level_id', '=', 'level.id')
                ->join('satuan', 'indikator.satuan_id', '=', 'satuan.id')
                ->with('kinerjaTriwulan')
                ->with('laporanCapaianPic')
                ->with('inputRealisasi')
                ->when(Request::input('flevel'), function ($query, $search) {
                    $query->where('level.nama_level', 'like', "%{$search}%");
                })
                ->when(Request::input('fpic'), function ($query, $search) {
                    $query->join('laporan_capaian_pic', 'laporan_capaian.id', '=', 'laporan_capaian_pic.laporan_capaian_id');
                    $query->where('laporan_capaian_pic.nama_pic', 'like', "%{$search}%");
                })
                ->when(Request::input('findikator'), function ($query, $search) {
                    $query->where('indikator.nama_indikator', 'like', "%{$search}%");
                })
                ->select('laporan_capaian.*',
                        'indikator.nama_indikator',
                        'periode.periode',
                        'level.nama_level',
                        'satuan.nama_satuan')
                ->paginate(10);
    /*$input_realisasi = App\Models\InputRealisasi::query()->with('inputRealisasiPic')
                ->join('kompositor', 'input_realisasi.kompositor_id', '=', 'kompositor.id')
                ->join('indikator_kompositor', 'indikator_kompositor.kompositor_id', '=', 'kompositor.id')
                ->join('indikator', 'indikator_kompositor.indikator_id', '=', 'indikator.id')
                ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                ->join('jenis_kompositor', 'kompositor.jenis_kompositor_id', '=', 'jenis_kompositor.id')
                ->join('laporan_capaian','indikator.id', '=', 'laporan_capaian.indikator_id')
                ->join('triwulan', 'input_realisasi.triwulan_id', '=', 'triwulan.id')
                //->join('periode', 'laporan_capaian.periode_id', '=', 'periode.id')
                ->where('laporan_capaian.id', 8)
                ->where('input_realisasi.triwulan_id', 1)
                ->select('input_realisasi.*', 
                        'kompositor.nama_kompositor',
                        'kompositor.satuan',
                        'triwulan.triwulan',
                        //'periode.periode',
                        'indeks.nama_indeks',
                        'jenis_kompositor.nama_jenis_kompositor'
                        )
                ->get();*/
    return $result;
});

Route::get('/test2', function () {
    /* $periode = DB::table('periode')
      ->where('status','=','Active')
      ->get();
      //echo($periode->first()->id);
      //retrieve indikators data
      $indikators = null;
      if($periode->count()==1){
      //loop through indikators
      $indikators = DB::table('indikator')
      ->select('indikator.*')
      ->leftJoin('indikator_periode', 'indikator.id', '=', 'indikator_periode.indikator_id')
      ->whereNull('indikator_periode.id')
      ->get();
      //print_r(DB::getQueryLog());
      echo 'count: '.$indikators->count().'</br>';
      //insert or update into indikator periode
      if($indikators->count()>1){
      for ($i=0;$i<$indikators->count();$i++){
      $indikator = $indikators[$i];
      $obj_ind_periode = new \App\Models\IndikatorPeriode();
      $obj_ind_periode->indikator_id = $indikator->id;
      $obj_ind_periode->periode_id = $periode->first()->id;

      $res = $obj_ind_periode->save();
      /*$res = DB::table('indikator_periode')->insert([
      'indikator_id' => $indikator->id,
      'periode_id' => $periode->first()->id
      ]); */
    /* if($res){
      echo 'Indikator saved';
      echo '</br>';
      }
      }
      }else{
      echo 'No indikator left';
      }
      }else{

      } */

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
        //$data['sql'] = DB::getQueryLog();
        //insert or update into indikator periode
        if ($indikators->count() > 0) {
            for ($i = 0; $i < $indikators->count(); $i++) {
                //looping for triwulan
                $triwulans = DB::table('triwulan')->get();
                if ($triwulans->count() > 0) {
                    for ($j = 0; $j < $triwulans->count(); $j++) {
                        $indikator_periode = $indikators[$i];
                        $triwulan = $triwulans[$j];
                        $obj_lap_capaian = new App\Models\LaporanCapaian();
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
    return json_encode($data);
    //return Redirect::back()->with($json_data);
});

Route::get('/test-import/{id}', function ($id) {
    //check active periode
    $periode = DB::table('periode')
            ->where('status', '=', 'Active')
            ->get();
    $data['message'] = 'Undefined message';
    if ($periode->count() == 1) {

        $result = DB::table('indikator_kompositor')
                ->where('indikator_id', '=', $id)
                ->get();
        if ($result->count() > 0) {
            foreach ($result as $row) {
                //looping for triwulan
                $triwulans = DB::table('triwulan')->get();
                if ($triwulans->count() > 0) {
                    foreach ($triwulans as $trw) {
                        $obj = new App\Models\InputRealisasi();
                        $obj->indikator_kompositor_id = $row->id;
                        $obj->triwulan_id = $trw->id;
                        $obj->periode_id = $periode->first()->id;
                        $obj->save();
                    }
                }
                $data['result'][$row->id] = 'Import ' . $row->nama_kompositor . ' successfull';
                $data['message'] = 'All Import successfull';
            }
        }
    }
    return $data;
});

Route::get('/test-calculation/{id}', function ($id) {
    /* $hitung_kompositors = DB::table('hitung_kompositor')
      ->groupBy('lvl', 'indikator_kompositor_id')
      ->having('indikator_kompositor_id', '=', $id)
      ->select('hitung_kompositor.lvl', 'hitung_kompositor.indikator_kompositor_id')
      ->get();
      $data['group_by'] = $hitung_kompositors; */

    $left_operand = 0;
    $right_operand = 0;
    $operator = '';
    $result = 0;
    $select_0 = getData(['p_field_id' => 0, 'indikator_kompositor_id' => $id]);
    print_r($select_0);
    if ($select_0->count() > 0) {
        //looping level 0 ------------------------------------------------------------
        foreach ($select_0 as $level_0) {
            if ($level_0->f_type == 'Operator') {
                $operator = $level_0->field;
                $select_1 = getData(['p_field_id' => $level_0->id, 'indikator_kompositor_id' => $id]);
                print_r($select_1);
                if ($select_1->count() > 0) {
                    $operator_1 = '';
                    $left_operand_1 = 0;
                    $right_operand_1 = 0;
                    //looping level 1 -------------------------------------------------------
                    foreach ($select_1 as $level_1) {
                        if ($level_1->f_type == 'Operator') {
                            $operator_1 = $level_1->field;
                            if ($left_operand == 0) {
                                $left_operand = $operator_1;
                            } else {
                                $right_operand = $operator_1;
                            }
                            $select_2 = getData(['p_field_id' => $level_1->id, 'indikator_kompositor_id' => $id]);
                            print_r($select_2);
                            if ($select_2->count() > 0) {
                                $operator_2 = '';
                                $left_operand_2 = 0;
                                $right_operand_2 = 0;
                                //looping level 2 -------------------------------------------
                                foreach ($select_2 as $level_2) {
                                    if ($level_2->f_type == 'Operator') {
                                        $operator_2 = $level_2->field;
                                        if ($left_operand_1 == 0) {
                                            $left_operand_1 = $operator_2;
                                        } else {
                                            $right_operand_1 = $operator_2;
                                        }
                                        $select_3 = getData(['p_field_id' => $level_2->id, 'indikator_kompositor_id' => $id]);
                                        print_r($select_3);
                                        if ($select_3->count() > 0) {
                                            $operator_3 = '';
                                            $left_operand_3 = 0;
                                            $right_operand_3 = 0;
                                            //looping level 3 -------------------------------------------
                                            foreach ($select_3 as $level_3) {
                                                if ($level_3->f_type == 'Operator') {
                                                    $operator_3 = $level_3->field;
                                                    if ($left_operand_2 == 0) {
                                                        $left_operand_2 = $operator_3;
                                                    } else {
                                                        $right_operand_2 = $operator_3;
                                                    }
                                                } elseif ($level_3->f_type == 'Input') {
                                                    //$left_operand_3 = $level_3->field;
                                                    if ($left_operand_3 == 0) {
                                                        $left_operand_3 = $level_3->field;
                                                    } else {
                                                        $right_operand_3 = $level_3->field;
                                                    }
                                                    if ($operator_2 == '/') {
                                                        $operator_2 = $left_operand_3 / $right_operand_3;
                                                    } elseif ($operator_2 == '*') {
                                                        $operator_2 = $left_operand_3 * $right_operand_3;
                                                    } elseif ($operator_2 == '+') {
                                                        $operator_2 = $left_operand_3 + $right_operand_3;
                                                    } elseif ($operator_2 == '-') {
                                                        $operator_2 = $left_operand_3 - $right_operand_3;
                                                    }
                                                } elseif ($level_3->f_type == 'Value') {
                                                    
                                                }
                                            }// end looping level 3 -------------------------------------
                                            echo 'operator_3: ' . $operator_3 . ', left_operand_3: ' . $left_operand_3 . ', right_operand_3: ' . $right_operand_3 . '</br>';
                                        }
                                    } elseif ($level_2->f_type == 'Input') {
                                        if ($left_operand_2 == 0) {
                                            $left_operand_2 = $level_2->field;
                                        } else {
                                            $right_operand_2 = $level_2->field;
                                        }
                                        if ($operator_1 == '/') {
                                            $operator_1 = $left_operand_2 / $right_operand_2;
                                        } elseif ($operator_1 == '*') {
                                            $operator_1 = $left_operand_2 * $right_operand_2;
                                        } elseif ($operator_2 == '+') {
                                            $operator_1 = $left_operand_2 + $right_operand_2;
                                        } elseif ($operator_2 == '-') {
                                            $operator_1 = $left_operand_2 - $right_operand_2;
                                        }
                                    } elseif ($level_2->f_type == 'Value') {
                                        
                                    }
                                }// end looping level 2 ------------------------------------
                                echo 'operator_2: ' . $operator_2 . ', left_operand_2: ' . $left_operand_2 . ', right_operand_2: ' . $right_operand_2 . '</br>';
                            }
                        } elseif ($level_1->f_type == 'Input') {
                            if ($left_operand == 0) {
                                $left_operand = $level_1->field;
                            } else {
                                $right_operand = $level_1->field;
                            }
                            if ($operator == '/') {
                                $operator = $left_operand_1 / $right_operand_1;
                            } elseif ($operator_1 == '*') {
                                $operator = $left_operand_1 * $right_operand_1;
                            } elseif ($operator_2 == '+') {
                                $operator = $left_operand_1 + $right_operand_1;
                            } elseif ($operator_2 == '-') {
                                $operator = $left_operand_1 - $right_operand_1;
                            }
                        } elseif ($level_1->f_type == 'Value') {
                            
                        }
                    }//end looping level 1 --------------------------------------------------
                    echo 'operator_1: ' . $operator_1 . ', left_operand_1: ' . $left_operand_1 . ', right_operand_1: ' . $right_operand_1 . '</br>';
                }
            } elseif ($level_1->f_type == 'Input') {
                
            } elseif ($level_1->f_type == 'Value') {
                
            }
        }//end looping level 0 ------------------------------------------------------
    }


    echo 'operator: ' . $operator . ', left_operand: ' . $left_operand . ', right_operand: ' . $right_operand;

    /* if ($operator == '/') {
      $result = $left_operand / $right_operand;
      } elseif ($operator == '*') {
      $result = $left_operand * $right_operand;
      } elseif ($operator == '+') {
      $result = $left_operand + $right_operand;
      } elseif ($operator == '-') {
      $result = $left_operand - $right_operand;
      } */
    //echo 'Result: '.$result;
});

function getData($params) {
    $select = DB::table('hitung_kompositor')
            ->where('p_field_id', '=', $params['p_field_id'])
            ->where('indikator_kompositor_id', '=', $params['indikator_kompositor_id'])
            ->get();
    return $select;
}

Route::get('/test-formula', function () {
    /* $select = DB::table('formula_table')
      ->where('id', '=', 3)
      ->get(); */
    $result1 = \App\Models\InputRealisasi::query()
            ->join('indikator_kompositor', 'input_realisasi.indikator_kompositor_id', '=', 'indikator_kompositor.id')
            ->with('periode')
            ->with('triwulan')
            ->with('inputRealisasiPic')
            ->with('indikatorKompositor')
            ->where('indikator_kompositor.id', '=', '2')
            ->get();
    $result2 = Indikator::query()
            ->with('level')
            ->with('satuan')
            ->with('indikatorKompositor')
            ->with('indikatorPeriode')
            ->get();
    $select = DB::table('laporan_capaian')
            ->join('indikator_periode', 'laporan_capaian.indikator_periode_id', '=', 'indikator_periode.id')
            ->join('indikator', 'indikator_periode.indikator_id', '=', 'indikator.id')
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
    //$result3 = new  \Illuminate\Database\Eloquent\Collection(App\Models\LaporanCapaian::query($select));
    /* ->when(Request::input('search'), function ($query, $search) {
      //$query->join('indikator_periode', 'laporan_capaian.indikator_periode_id','=', 'indikator_periode.id')
      //->join('indikator', 'indikator_periode.indikator_id','=', 'indikator.id')
      $query->where('indikator.nama_indikator', 'like', "%{$search}%");
      })
      ->join('indikator_periode', 'laporan_capaian.indikator_periode_id', '=', 'indikator_periode.id')
      ->join('indikator', 'indikator_periode.indikator_id', '=', 'indikator.id')
      ->join('satuan', 'indikator.satuan_id', '=', 'satuan.id')
      ->join('level', 'indikator.level_id', '=', 'level.id')
      ->with('triwulan')
      ->with('periode')
      ->with('laporanCapaianPic')
      ->with('indikatorPeriode')

      ->paginate(10)
      ->withQueryString(); */
    $result3 = new \Illuminate\Database\Eloquent\Collection($select->appends(['pics' => \App\Models\LaporanCapaian::with('laporanCapaianPic')]));

    $all_result = ['inputRealisasi' => $result1, 'laporanCapaian' => $result3];
    return $all_result;
});
Route::get('/test-calculate/{id}', function ($id) {
    $input_realisasi = App\Models\InputRealisasi::where('id', $id)->first();
        $indikator_kompositor = \App\Models\Kompositor::where('id', $input_realisasi->kompositor_id)->first();
        $result = DB::table('kompositor')
                ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                ->where('kompositor.id', $input_realisasi->kompositor_id)
                ->get()->first();
        $nama_indeks = trim($result->nama_kompositor);
        $realisasi = 0;
        //var_dump($result);
        switch ($nama_indeks){
            case 'Indeks Ketersediaan Hulu Minyak':
                $res_realisasi = App\Models\InputRealisasi::query()
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
                $res_realisasi = App\Models\InputRealisasi::query()
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
                $res_realisasi = App\Models\InputRealisasi::query()
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
                $res_realisasi = DB::table('indikator')
                    ->join('indikator_kompositor', 'indikator.id', '=', 'indikator_kompositor.indikator_id')
                    ->join('kompositor','indikator_kompositor.kompositor_id', '=', 'kompositor.id')
                    ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                    ->join('input_realisasi', 'input_realisasi.kompositor_id', '=', 'kompositor.id')
                    ->where('indeks.nama_indeks', 'Like', 'Indeks Ketersediaan BBM')
                    ->select('input_realisasi.*', 
                            'kompositor.*')->get();
    //var_dump($res_realisasi);
                $data['result'] = $res_realisasi;
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
                $res_realisasi = App\Models\InputRealisasi::query()
                    ->join('indikator_kompositor', 'input_realisasi.indikator_kompositor_id', '=', 'indikator_kompositor.id')
                    ->join('indikator','indikator_kompositor.indikator_id', '=', 'indikator.id')
                    //->join('indeks', 'indikator_kompositor.indeks_id', '=', 'indeks.id')
                    ->where('nama_indikator', 'Like', 'Indeks Ketersediaan LPG')
                    ->select('input_realisasi.*', 
                            'indikator_kompositor.nama_kompositor')->get();
                $realisasi_produksi_lpg = 0; $kuota_impor_lpg = 0;
                $kuota_ekspor_lpg = 0; $realisasi_impor_lpg = 0;
                $realisasi_ekspor_lpg = 0;
                foreach($res_realisasi as $realisasi){
                    if(trim($realisasi->nama_kompositor) == 'Realisasi Produksi LPG'){                        
                        $realisasi_produksi_lpg = $realisasi->realisasi;
                    }elseif(trim($realisasi->nama_kompositor) == 'Kuota Impor LPG '){
                        $kuota_impor_lpg = $realisasi->realisasi;
                    }elseif(trim($realisasi->nama_kompositor) == 'Kuota Ekspor LPG '){
                        $kuota_ekspor_lpg = $realisasi->realisasi;
                    }elseif(trim($realisasi->nama_kompositor) == 'Realisasi Impor LPG'){
                        $realisasi_impor_lpg = $realisasi->realisasi;
                    }elseif(trim($realisasi->nama_kompositor) == 'Realisasi Ekspor LPG '){
                        $realisasi_ekspor_lpg =$realisasi->realisasi;
                    }
                }
                $realisasi = (($realisasi_produksi_lpg + $kuota_impor_lpg) - $kuota_ekspor_lpg) / (($realisasi_produksi_lpg + $realisasi_impor_lpg) - $realisasi_ekspor_lpg);
                break;
            case 'Indeks Ketersediaan LNG':
                $res_realisasi = App\Models\InputRealisasi::query()
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
        //return json_encode($data);
});
require __DIR__ . '/auth.php';
