<?php

namespace App\Http\Controllers;

use App\Models\Periode;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    //
    public function index()
    {
        //data periode


        $chartsConfig = [
            // Add your chartsConfig values here
        ];

        $chartsConfigXaxis = [
            // Add your chartsConfig['xaxis'] values here
        ];

        $websiteViewsChart = [
            "type" => "bar",
            "height" => 220,
            "series" => [
                [
                    "name" => "Views",
                    "data" => [50, 20, 10, 22, 50, 10, 40],
                ],
            ],
            "options" => array_merge(
                $chartsConfig,
                [
                    "colors" => "#388e3c",
                    "plotOptions" => [
                        "bar" => [
                            "columnWidth" => "16%",
                            "borderRadius" => 5,
                        ],
                    ],
                    "xaxis" => array_merge(
                        $chartsConfigXaxis,
                        [
                            "categories" => ["M", "T", "W", "T", "F", "S", "S"],
                        ]
                    ),
                ]
            ),
        ];

        // Output as JSON if needed
        //$websiteViewsChartJson = json_encode($websiteViewsChart, JSON_PRETTY_PRINT);

        $rerata_capaian_kinerja = DB::table('pic')
            ->join('laporan_capaian_pic', 'pic.id', '=', 'laporan_capaian_pic.pic_id')
            ->join('laporan_capaian', 'laporan_capaian_pic.laporan_capaian_id', '=', 'laporan_capaian.id')
            ->select('pic.nama_pic', DB::raw('AVG(laporan_capaian.kinerja_tahunan) AS rerata_kinerja'))
            ->where('parent_id', 1)
            ->groupBy('pic.nama_pic')
            ->get();

        return Inertia::render('Dashboard/home', [
            'periode' => \App\Models\Periode::where('status', 'Active')->first(),
            'user_count' => \App\Models\User::all()->count(),
            'indikator_count' => \App\Models\Indikator::all()->count(),
            'pic_count' => \App\Models\PIC::all()->count(),
            'indeks_migas' => function () {
                $arr = [10, 30, 40, 70];
                return $arr;
            },
            'indeks_aksesibilitas' => function () {
                $arr = [10, 30, 40, 70];
                return $arr;
            },
            'indeks_keselamatan' => function () {
                $arr = [10, 30, 40, 70];
                return $arr;
            },
            'websiteViewsChart' => $websiteViewsChart,
            'rerata_capaian_kinerja' => $rerata_capaian_kinerja
        ]);
    }

    public function dashboard()
    {
        return Inertia::render('Dashboard/dashboard', [
            'periode' => \App\Models\Periode::where('status', 'Active')->first(),
            'user_count' => \App\Models\User::all()->count(),
            'indikator_count' => \App\Models\Indikator::all()->count(),
            'pic_count' => \App\Models\PIC::all()->count(),
            'indeks_migas' => function () {
                $arr = [10, 30, 40, 70];
                return $arr;
            },
            'indeks_aksesibilitas' => function () {
                $arr = [10, 30, 40, 70];
                return $arr;
            },
            'indeks_keselamatan' => function () {
                $arr = [10, 30, 40, 70];
                return $arr;
            },
        ]);
    }
}
