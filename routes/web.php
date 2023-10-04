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
        'canRegister' => Route::has('register'),
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

Route::get('/home', function(){
    return Inertia::render('Home');
})->middleware(['auth', 'verified'])->name('home');

Route::middleware('auth')->group(function(){
    Route::get('/periode', [PeriodeController::class, 'index'])->name('periode.index');
    Route::get('/periode/edit/{periode}', [PeriodeController::class, 'edit'])->name('periode.edit');
    Route::get('/periode/create', [PeriodeController::class, 'create'])->name('periode.create');
    Route::post('/periode/store', [PeriodeController::class, 'store'])->name('periode.store');
    Route::put('/periode/{periode}', [PeriodeController::class, 'update'])->name('periode.update');
    Route::delete('/periode/{periode}', [PeriodeController::class, 'destroy'])->name('periode.destroy');
});

Route::middleware('auth')->group(function(){
    Route::get('/indikator', [IndikatorController::class, 'index'])->name('indikator.index');
    Route::get('/indikator/create', [IndikatorController::class, 'create'])->name('indikator.create');
    Route::post('/indikator/store', [IndikatorController::class, 'store'])->name('indikator.store');
    Route::get('/indikator/edit/{indikator}', [IndikatorController::class, 'edit'])->name('indikator.edit');
    Route::put('/indikator/{indikator}', [IndikatorController::class, 'update'])->name('indikator.update');
    Route::delete('/indikator/{indikator}', [IndikatorController::class, 'destroy'])->name('indikator.destroy');
    Route::post('/indikator/store-indikator-kompositor', [IndikatorController::class, 'storeIndikatorKompositor'])
            ->name('indikator.store-indikator-kompositor');
    Route::get('/indikator/create-kompositor/{indikator}', [IndikatorController::class, 'createKompositor'])->name('indikator.create-kompositor');
});

Route::middleware('auth')->group(function(){
    Route::get('/pic', [PICController::class, 'index'])->name('pic.index');
    Route::get('/pic/create', [PICController::class, 'create'])->name('pic.create');
    Route::post('/pic/store', [PICController::class, 'store'])->name('pic.store');
    Route::get('/pic/edit/{pic}', [PICController::class, 'edit'])->name('pic.edit');
    Route::put('/pic/{pic}', [PICController::class, 'update'])->name('pic.update');
    Route::delete('/pic/{pic}', [PICController::class, 'destroy'])->name('pic.destroy');
});

Route::middleware('auth')->group(function(){
    Route::get('/indikator-periode', [IndikatorPeriodeController::class, 'index'])->name('indikator-periode.index');
    Route::get('/indikator-periode/edit/{indikatorperiode}', [IndikatorPeriodeController::class, 'edit'])->name('indikator-periode.edit');
    Route::get('/indikator-periode/create', [IndikatorPeriodeController::class, 'create'])->name('indikator-periode.create');
    Route::post('/indikator-periode/store', [IndikatorPeriodeController::class, 'store'])->name('indikator-periode.store');
    Route::put('/indikator-periode/{indikatorperiode}', [IndikatorPeriodeController::class, 'update'])->name('indikator-periode.update');
    Route::delete('/indikator-periode/{indikatorperiode}', [IndikatorPeriodeController::class, 'destroy'])->name('indikator-periode.destroy');
    Route::get('/indikator-periode/importindikator', [IndikatorPeriodeController::class, 'importIndikator'])->name('indikator-periode.importindikator');
});

Route::middleware('auth')->group(function(){
    Route::get('/laporan-capaian', [LaporanCapaianController::class, 'index'])->name('laporan-capaian.index');
    Route::get('/laporan-capaian/edit/{laporancapaian}', [LaporanCapaianController::class, 'edit'])->name('laporan-capaian.edit');
    Route::get('/laporan-capaian/create', [LaporanCapaianController::class, 'create'])->name('laporan-capaian.create');
    Route::post('/laporan-capaian/store', [LaporanCapaianController::class, 'store'])->name('laporan-capaian.store');
    Route::put('/laporan-capaian/{laporancapaian}', [LaporanCapaianController::class, 'update'])->name('laporan-capaian.update');
    Route::delete('/laporan-capaian/{laporancapaian}', [LaporanCapaianController::class, 'destroy'])->name('laporan-capaian.destroy');
    Route::get('/laporan-capaian/importtarget', [LaporanCapaianController::class, 'importTarget'])->name('laporan-capaian.importtarget');
});

Route::middleware('auth')->group(function(){
    Route::get('/satuan', [SatuanController::class, 'index'])->name('satuan.index');
    Route::get('/satuan/edit/{satuan}', [SatuanController::class, 'edit'])->name('satuan.edit');
    Route::get('/satuan/create', [SatuanController::class, 'create'])->name('satuan.create');
    Route::post('/satuan/store', [SatuanController::class, 'store'])->name('satuan.store');
    Route::put('/satuan/{satuan}', [SatuanController::class, 'update'])->name('satuan.update');
    Route::delete('/satuan/{satuan}', [SatuanController::class, 'destroy'])->name('satuan.destroy');
});

Route::middleware('auth')->group(function(){
    Route::get('/level', [LevelController::class, 'index'])->name('level.index');
    Route::get('/level/edit/{level}', [LevelController::class, 'edit'])->name('level.edit');
    Route::get('/level/create', [LevelController::class, 'create'])->name('level.create');
    Route::post('/level/store', [LevelController::class, 'store'])->name('level.store');
    Route::put('/level/{level}', [LevelController::class, 'update'])->name('level.update');
    Route::delete('/level/{level}', [LevelController::class, 'destroy'])->name('level.destroy');
});

Route::middleware('auth')->group(function(){
    Route::get('/kategori-kinerja', [KategoriKinerjaController::class, 'index'])->name('kategori-kinerja.index');
    Route::get('/kategori-kinerja/edit/{KategoriKinerja}', [KategoriKinerjaController::class, 'edit'])->name('kategori-kinerja.edit');
    Route::get('/kategori-kinerja/create', [KategoriKinerjaController::class, 'create'])->name('kategori-kinerja.create');
    Route::post('/kategori-kinerja/store', [KategoriKinerjaController::class, 'store'])->name('kategori-kinerja.store');
    Route::put('/kategori-kinerja/{KategoriKinerja}', [KategoriKinerjaController::class, 'update'])->name('kategori-kinerja.update');
    Route::delete('/kategori-kinerja/{KategoriKinerja}', [KategoriKinerjaController::class, 'destroy'])->name('kategori-kinerja.destroy');
});

Route::middleware('auth')->group(function(){
    Route::get('/evaluasi-akip', [EvaluasiAkipController::class, 'index'])->name('evaluasi-akip.index');
    Route::get('/evaluasi-akip/edit/{EvaluasiAkip}', [EvaluasiAkipController::class, 'edit'])->name('evaluasi-akip.edit');
    Route::get('/evaluasi-akip/create', [EvaluasiAkipController::class, 'create'])->name('evaluasi-akip.create');
    Route::post('/evaluasi-akip/store', [EvaluasiAkipController::class, 'store'])->name('evaluasi-akip.store');
    Route::put('/evaluasi-akip/{EvaluasiAkip}', [EvaluasiAkipController::class, 'update'])->name('evaluasi-akip.update');
    Route::delete('/evaluasi-akip/{EvaluasiAkip}', [EvaluasiAkipController::class, 'destroy'])->name('evaluasi-akip.destroy');
});

Route::middleware('auth')->group(function(){
    Route::get('/upload-file', [UploadFileController::class, 'index'])->name('upload-file.index');
    Route::get('/upload-file/edit/{level}', [UploadFileController::class, 'edit'])->name('upload-file.edit');
    Route::get('/upload-file/create', [UploadFileController::class, 'create'])->name('upload-file.create');
    Route::post('/upload-filep/store', [UploadFileController::class, 'store'])->name('upload-file.store');
    Route::put('/upload-file/{level}', [UploadFileController::class, 'update'])->name('upload-file.update');
    Route::delete('/upload-file/{level}', [UploadFileController::class, 'destroy'])->name('upload-file.destroy');
});

Route::middleware('auth')->group(function(){
    Route::get('/hasil-evaluasi', [HasilEvaluasiController::class, 'index'])->name('hasil-evaluasi.index');
    Route::get('/hasil-evaluasi/edit{HasilEvalasi}/', [HasilEvaluasiController::class, 'edit'])->name('hasil-evaluasi.edit');
    Route::get('/hasil-evaluasi/create', [HasilEvaluasiController::class, 'create'])->name('hasil-evaluasi.create');
    Route::post('/hasil-evaluasi/store', [HasilEvaluasiController::class, 'store'])->name('hasil-evaluasi.store');
    Route::put('/hasil-evaluasi/{HasilEvaluasi}', [HasilEvaluasiController::class, 'update'])->name('hasil-evaluasi.update');
    Route::delete('/hasil-evaluasi/{HasilEvaluasi}', [HasilEvaluasiController::class, 'destroy'])->name('hasil-evaluasi.destroy');
});

Route::middleware('auth')->group(function(){
    Route::get('/kategori-dokumen', [KategoriDokumenController::class, 'index'])->name('kategori-dokumen.index');
    Route::get('/kategori-dokumen/edit/{KategoriDokumen}', [KategoriDokumenController::class, 'edit'])->name('kategori-dokumen.edit');
    Route::get('/kategori-dokumen/create', [KategoriDokumenController::class, 'create'])->name('kategori-dokumen.create');
    Route::post('/kategori-dokumen/store', [KategoriDokumenController::class, 'store'])->name('kategori-dokumen.store');
    Route::put('/kategori-dokumen/{KategoriDokumen}', [KategoriDokumenController::class, 'update'])->name('kategori-dokumen.update');
    Route::delete('/kategori-dokumen/{KategoriDokumen}', [KategoriDokumenController::class, 'destroy'])->name('kategori-dokumen.destroy');
});

Route::middleware('auth')->group(function(){
    Route::get('/instrument-kinerja', [InstrumentKinerjaController::class, 'index'])->name('instrument-kinerja.index');
    Route::get('/instrument-kinerja/create-komponen', [InstrumentKinerjaController::class, 'createKomponen'])->name('instrument-kinerja.create-komponen');
    Route::post('/instrument-kinerja/store-komponen', [InstrumentKinerjaController::class, 'storeKomponen'])->name('instrument-kinerja.store-komponen');
    Route::get('/instrument-kinerja/edit-komponen/{komponen}', [InstrumentKinerjaController::class, 'editKomponen'])->name('instrument-kinerja.edit-komponen');
    Route::put('/instrument-kinerja/{komponen}', [InstrumentKinerjaController::class, 'updateKomponen'])->name('instrument-kinerja.update-komponen');
    Route::delete('/instrument-kinerja/{komponen}', [InstrumentKinerjaController::class, 'destroyKomponen'])->name('instrument-kinerja.destroy-komponen');
    
    Route::get('/instrument-kinerja/create-sub-komponen/{komponen}', [InstrumentKinerjaController::class, 'createSubKomponen'])->name('instrument-kinerja.create-sub-komponen');
    Route::post('/instrument-kinerja/store-sub-komponen', [InstrumentKinerjaController::class, 'storeSubKomponen'])->name('instrument-kinerja.store-sub-komponen');
});

Route::get('/test', function(){
    /*$periode = Periode::findOrFail(9);
    $data = [
        [
            'filter' => Request::all('search', 'trashed'),
            /*'periodes' => new App\Http\Resources\PeriodeCollection(
                    Periode::
                    //filter(Request::only('search', 'trashed'))
                    paginate(10)
                    ->appends(Request::all())
            )*/
            /*'periodes' => Periode::query()
            ->when(\Illuminate\Support\Facades\Request::input('search'), function($query, $search){
                $query->where('Periode','like', "{$search}%");
            })
            ->paginate(10)
                ]
    ];*/
    $select = DB::table('laporan_capaian')
            ->join('indikator_periode', 'laporan_capaian.indikator_periode_id', '=', 'indikator_periode.id')
            ->join('indikator', 'indikator_periode.indikator_id', '=', 'indikator.id')
            ->join('periode', 'laporan_capaian.periode_id', '=', 'periode.id')
             ->join('indikator_periode_pic','indikator_periode.id', '=', 'indikator_periode_pic.indikator_periode_id')
            ->join('pic', 'indikator_periode_pic.pic_id', '=', 'pic.id')
            ->join('triwulan', 'laporan_capaian.triwulan_id', '=', 'triwulan.id')
            ->select('laporan_capaian.id',
                    'laporan_capaian.realisasi',
                    'laporan_capaian.kinerja',
                    'laporan_capaian.sumber_data',
                    'indikator_periode.target',
                    'indikator.*',
                    'periode.periode',
                    'pic.nama_pic',
                    'triwulan.triwulan')
            ->paginate(10);
            
            
    return $select;
    
});

Route::get('/test2', function(){
   /*$periode = DB::table('periode')
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
                ]);*/
                /*if($res){
                    echo 'Indikator saved';
                    echo '</br>';
                }
            }
        }else{
            echo 'No indikator left';
        }
    }else{
        
    }*/
    
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
                if($triwulans->count() > 0){
                    for($j = 0; $j < $triwulans->count(); $j++){
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
    return json_encode($data);
    //return Redirect::back()->with($json_data);
});

Route::get('/test-component', function(){
    return Inertia::render('Dashboard');
});

require __DIR__.'/auth.php';
