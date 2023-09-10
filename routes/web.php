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
use App\Models\Periode;
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
    Route::get('/periode/{periode}/edit', [PeriodeController::class, 'edit'])->name('periode.edit');
    Route::get('/periode/create', [PeriodeController::class, 'create'])->name('periode.create');
    Route::post('/periode/store', [PeriodeController::class, 'store'])->name('periode.store');
    Route::put('/periode/{periode}', [PeriodeController::class, 'update'])->name('periode.update');
    Route::delete('/periode/{periode}', [PeriodeController::class, 'destroy'])->name('periode.destroy');
});

Route::middleware('auth')->group(function(){
    Route::get('/indikator', [IndikatorController::class, 'index'])->name('indikator.index');
    Route::get('/indikator/create', [IndikatorController::class, 'create'])->name('indikator.create');
    Route::post('/indikator/store', [IndikatorController::class, 'store'])->name('indikator.store');
    Route::get('/indikator/{indikator}/edit', [IndikatorController::class, 'edit'])->name('indikator.edit');
    Route::put('/indikator/{indikator}', [IndikatorController::class, 'update'])->name('indikator.update');
    Route::delete('/indikator/{indikator}', [IndikatorController::class, 'destroy'])->name('indikator.destroy');
});

Route::middleware('auth')->group(function(){
    Route::get('/pic', [PICController::class, 'index'])->name('pic.index');
    Route::get('/pic/create', [PICController::class, 'create'])->name('pic.create');
    Route::post('/pic/store', [PICController::class, 'store'])->name('pic.store');
    Route::get('/pic/{pic}/edit', [PICController::class, 'edit'])->name('pic.edit');
    Route::put('/pic/{pic}', [PICController::class, 'update'])->name('pic.update');
    Route::delete('/pic/{pic}', [PICController::class, 'destroy'])->name('pic.destroy');
});

Route::middleware('auth')->group(function(){
    Route::get('/indikator-periode', [IndikatorPeriodeController::class, 'index'])->name('indikator-periode.index');
    Route::get('/indikator-periode/{indikatorPeriode}/edit', [IndikatorPeriodeController::class, 'edit'])->name('indikator-periode.edit');
    Route::get('/indikator-periode/create', [IndikatorPeriodeController::class, 'create'])->name('indikator-periode.create');
    Route::post('/indikator-periode/store', [IndikatorPeriodeController::class, 'store'])->name('indikator-periode.store');
    Route::put('/indikator-periode/{indikatorPeriode}', [IndikatorPeriodeController::class, 'update'])->name('indikator-periode.update');
    Route::delete('/indikator-periode/{indikatorPeriode}', [IndikatorPeriodeController::class, 'destroy'])->name('indikator-periode.destroy');
});

Route::middleware('auth')->group(function(){
    Route::get('/laporan-capaian', [LaporanCapaianController::class, 'index'])->name('laporan-capaian.index');
    Route::get('/laporan-capaian/{laporanCapaian}/edit', [LaporanCapaianController::class, 'edit'])->name('laporan-capaian.edit');
    Route::get('/laporan-capaian/create', [LaporanCapaianController::class, 'create'])->name('laporan-capaian.create');
    Route::post('/laporan-capaian/store', [LaporanCapaianController::class, 'store'])->name('laporan-capaian.store');
    Route::put('/laporan-capaian/{laporanCapaian}', [LaporanCapaianController::class, 'update'])->name('laporan-capaian.update');
    Route::delete('/laporan-capaian/{laporanCapaian}', [LaporanCapaianController::class, 'destroy'])->name('laporan-capaian.destroy');
});

Route::get('/test', function(){
    $periode = Periode::findOrFail(9);
    $data = [
        [
            'filter' => Request::all('search', 'trashed'),
            /*'periodes' => new App\Http\Resources\PeriodeCollection(
                    Periode::
                    //filter(Request::only('search', 'trashed'))
                    paginate(10)
                    ->appends(Request::all())
            )*/
            'periodes' => Periode::query()
            ->when(\Illuminate\Support\Facades\Request::input('search'), function($query, $search){
                $query->where('Periode','like', "{$search}%");
            })
            ->paginate(10)
                ]
    ];
    
    return ($data);
});

require __DIR__.'/auth.php';
