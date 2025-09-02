<?php

namespace App\Http\Controllers;

use App\Models\Periode;
use App\Models\LaporanCapaian;
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
            ->select('pic.nama_pic', DB::raw('AVG(laporan_capaian.kinerja_tahunan::numeric) AS rerata_kinerja'))
            ->where('parent_id', 1)
            ->groupBy('pic.nama_pic')
            ->get();

        $biru = DB::table('indikator')
            ->join('laporan_capaian', 'indikator.id', '=', 'laporan_capaian.indikator_id')
            ->where('indikator.level_id', '=', '1')
            ->where('kinerja_tahunan', '>', 1)
            ->get();
        $hijau = DB::table('indikator')
            ->join('laporan_capaian', 'indikator.id', '=', 'laporan_capaian.indikator_id')
            ->where('indikator.level_id', '=', '1')
            ->whereBetween('kinerja_tahunan', [0.75, 1])
            ->get();
        $kuning = DB::table('indikator')
            ->join('laporan_capaian', 'indikator.id', '=', 'laporan_capaian.indikator_id')
            ->where('indikator.level_id', '=', '1')
            ->whereBetween('kinerja_tahunan', [0.5, 0.74])
            ->get();
        $merah = DB::table('indikator')
            ->join('laporan_capaian', 'indikator.id', '=', 'laporan_capaian.indikator_id')
            ->where('indikator.level_id', '=', '1')
            ->where('kinerja_tahunan', '<', 0.5)
            ->get();
        $capaian_pk = [
            ['label' => 'Biru (> 100%)', 'value' => $biru->count()],
            ['label' => 'Hijau (75% - 100%)', 'value' => $hijau->count()],
            ['label' => 'Kuning (50% - 74%)', 'value' => $kuning->count()],
            ['label' => 'Merah (< 50%)', 'value' => $merah->count()]
        ];

        $pics = DB::table('pic')
            ->where('parent_id', '=', '1')
            ->get();
        
        $qry_iksp = LaporanCapaian::query()
                ->join('indikator', 'laporan_capaian.indikator_id', '=', 'indikator.id')
                ->join('periode', 'laporan_capaian.periode_id', '=', 'periode.id')
                ->join('level', 'indikator.level_id', '=', 'level.id')
                ->join('satuan', 'indikator.satuan_id', '=', 'satuan.id')
                ->with('kinerjaTriwulan')
                ->with('laporanCapaianPic')
                ->with('inputRealisasi')
                ->with('kategoriKinerja')
                ->select('laporan_capaian.*',
                        'indikator.nama_indikator',
                        'indikator.numbering',
                        'periode.periode',
                        'level.nama_level',
                        'satuan.nama_satuan')
                ->orderBy('indikator.id', 'asc')
                ->where('level.id', '=', "1")
                ->where('periode.status', '=', 'Active')
                ->get();
        $capaian_iksp = [];

        $periode = \App\Models\Periode::where('status', 'Active')->first();
        $user_count = \App\Models\User::all()->count();
        $indikator_count = \App\Models\Indikator::all()->count();
        $pic_count = \App\Models\PIC::all()->count();
        $chards = [
            [
                'color' => 'gray',
                'icon' => 'BanknotesIcon',
                'title' => 'Current Periode',
                'value' => $periode->periode,
                'footer' => ['color' => 'text-green-500', 'value' => 'Last Periode', 'label' => ($periode->periode - 1)]
            ],
            [
                'color' => 'gray',
                'icon' => 'UsersIcon',
                'title' => 'PICS',
                'value' => $pic_count,
                'footer' => ['color' => 'text-green-500', 'value' => 'PICS', 'label' => $pic_count]
            ],
            [
                'color' => 'gray',
                'icon' => 'UserPlusIcon',
                'title' => 'Users',
                'value' => $user_count,
                'footer' => ['color' => 'text-green-500', 'value' => 'Active Users', 'label' => $user_count]
            ],
            [
                'color' => 'gray',
                'icon' => 'ChartBarIcon',
                'title' => 'Total Indikator',
                'value' => $indikator_count,
                'footer' => ['color' => 'text-green-500', 'value' => 'Total Indikator', 'label' => $indikator_count]
            ]
            ];

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
            'rerata_capaian_kinerja' => $rerata_capaian_kinerja,
            'capaian_pk' => $capaian_pk,
            'chards' => $chards,
            'capaian_iksp' => $qry_iksp,
            'pics' => $pics
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

    public function getIksk(Request $request)
    {
        $pic = $request['pic'];
        $level = $request['level'];
        if($level == 'IKSP'){
            $qry_iksp = LaporanCapaian::query()
                ->join('indikator', 'laporan_capaian.indikator_id', '=', 'indikator.id')
                ->join('periode', 'laporan_capaian.periode_id', '=', 'periode.id')
                ->join('level', 'indikator.level_id', '=', 'level.id')
                ->join('satuan', 'indikator.satuan_id', '=', 'satuan.id')
                ->with('kinerjaTriwulan')
                ->with('laporanCapaianPic')
                ->with('inputRealisasi')
                ->with('kategoriKinerja')
                ->select('laporan_capaian.*',
                        'indikator.nama_indikator',
                        'indikator.numbering',
                        'periode.periode',
                        'level.nama_level',
                        'satuan.nama_satuan')
                ->orderBy('indikator.id', 'asc')
                ->where('level.id', '=', "1")
                ->where('periode.status', '=', 'Active')
                ->get();
        }else{
        $qry_iksp = LaporanCapaian::query()
                ->join('indikator', 'laporan_capaian.indikator_id', '=', 'indikator.id')
                ->join('indikator_pic', 'indikator.id', '=', 'indikator_pic.indikator_id')
                ->join('pic', 'pic.id', '=','indikator_pic.pic_id')
                ->join('periode', 'laporan_capaian.periode_id', '=', 'periode.id')
                ->join('level', 'indikator.level_id', '=', 'level.id')
                ->join('satuan', 'indikator.satuan_id', '=', 'satuan.id')                
                ->with('kinerjaTriwulan')
                ->with('laporanCapaianPic')
                ->with('inputRealisasi')
                ->with('kategoriKinerja')
                ->select('laporan_capaian.*',
                        'indikator.nama_indikator',
                        'indikator.numbering',
                        'periode.periode',
                        'level.nama_level',
                        'satuan.nama_satuan')
                ->orderBy('indikator.id', 'asc')
                ->where('level.id', '=', "2")
                ->where('periode.status', '=', 'Active')
                ->where('pic.parent_id', '=', '1')
                ->where('pic.id', '=', $pic)
                ->get();
        }
        return $qry_iksp;
    }
}
