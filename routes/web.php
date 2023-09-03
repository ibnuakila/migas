<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PeriodeController;
use App\Http\Controllers\IndikatorController;
use App\Http\Controllers\PICController;
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
    Route::post('/periode/create', [PeriodeController::class, 'create'])->name('periode.create');
    Route::post('/periode/update', [PeriodeController::class, 'update'])->name('periode.update');
});

Route::middleware('auth')->group(function(){
    Route::get('/indikator', [IndikatorController::class, 'index'])->name('indikator.index');
    Route::post('/indikator', [IndikatorController::class, 'create'])->name('indikator.create');
});

Route::middleware('auth')->group(function(){
    Route::get('/pic', [PICController::class, 'index'])->name('pic.index');
    Route::post('/pic', [PICController::class, 'create'])->name('pic.create');
});

Route::get('/test', function(){
    $periode = Periode::findOrFail(9);
    $data = [
        'Periode' => '4321',
        'Status' => 'New'
    ];
    $periode->fill($data);
    $save = $periode->save();
    return ('test update: '.$save);
});

require __DIR__.'/auth.php';
