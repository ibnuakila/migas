<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController;
use App\Http\Controllers\Controller;
use App\Models\LaporanCapaian;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends BaseController
{
    //
    public function index(){
        $rerata_capaian_kinerja =DB::table('pic')
            ->join('laporan_capaian_pic', 'pic.id', '=', 'laporan_capaian_pic.pic_id')
            ->join('laporan_capaian', 'laporan_capaian_pic.laporan_capaian_id', '=', 'laporan_capaian.id')
            ->select('pic.nama_pic', DB::raw('AVG(laporan_capaian.kinerja_tahunan) AS rerata_kinerja'))
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
        $data['rerata_capaian_kinerja'] = $rerata_capaian_kinerja;
        $data['capaian_pk'] = $capaian_pk;
        $data['dashboard_capaian'] = $qry_iksp;
        //return $this->sendResponse($data,'Success', $rerata_capaian_kinerja->count());
        return view('dashboard', $data);
    }

}
