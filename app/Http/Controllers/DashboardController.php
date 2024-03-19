<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Redirect;

class DashboardController extends Controller
{
    //
    public function index()
    {
        return Inertia::render('Beranda', [
            'periode' => \App\Models\Periode::where('status', 'Active')->first(),
            'user_count' => \App\Models\User::all()->count(),
            'indikator_count' => \App\Models\Indikator::all()->count(),
            'pic_count' => \App\Models\PIC::all()->count(),
            'indeks_migas' => function(){
                $arr = [10, 30, 40, 70];
                return $arr;
            },
            'indeks_aksesibilitas' => function(){
                $arr = [10, 30, 40, 70];
                return $arr;
            },
            'indeks_keselamatan' => function(){
                $arr = [10, 30, 40, 70];
                return $arr;
            },
        ]);
    }
}
