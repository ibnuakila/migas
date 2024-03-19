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
            'pic_count' => \App\Models\PIC::all()->count()
        ]);
    }
}
