<?php

namespace App\Models;

use DB;
//use Illuminate\Database\Eloquent\Factories\HasFactory;
//use Illuminate\Database\Eloquent\Model;

class CalculateRealization
{
    //use HasFactory;

    public function getRealization($params)
    {
        //$realisasi = 0;
        $input_realisasi_id = $params['input_realisasi_id'];
        $realisasi_kompositor_id = $params['realisasi_kompositor_id'];
        $result = InputRealisasi::query()
            ->join('realisasi_kompositor', 'input_realisasi.id', '=', 'realisasi_kompositor.input_realisasi_id')
            ->join('kompositor', 'realisasi_kompositor.kompositor_id', '=', 'kompositor.id')
            ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
            ->join('indikator_kompositor', 'kompositor.id', '=', 'indikator_kompositor.kompositor_id')
            ->join('indikator', 'indikator_kompositor.indikator_id', '=', 'indikator.id')
            ->where('realisasi_kompositor.input_realisasi_id', $input_realisasi_id)
            ->where('realisasi_kompositor.id', $realisasi_kompositor_id)
            ->where('kompositor.jenis_kompositor_id', 2)
            ->first();

        $params['nama_indikator'] = $result->nama_indikator;
        $realisasi = $this->getByIndikator($result); //CalculateRealization::getByIndikator($result);

        $realisasi['input_realisasi'] = $result;
        $data['realisasi'] = $realisasi;
        return $realisasi;
    }

    private function getByIndikator($result)
    {
        $realisasi = 0;
        $indikator = $this->getTopLevelIndikator($result);
        $data['indikator_iksp'] = $indikator;
        $nama_indikator_iksp = trim($indikator[0]->nama_indikator);

        switch ($nama_indikator_iksp) {
            //Indikator level 1 (IKSP)
            case 'Indeks Ketersediaan Migas':
                $indikator_iksk_2 = $this->getSecondLevelIndikator($result);
                $data['indikator_iksk_2'] = $indikator_iksk_2;
                if (count($indikator_iksk_2) > 0) {
                    $params['input_realisasi'] = $result;
                    $params['indikator_iksk_2'] = $indikator_iksk_2;
                    $return = $this->getByIndeksKetersediaanMigas($params);
                    $data['return'] = $return;
                    $realisasi = $return['realisasi'];

                } else {

                }


                break;
            case 'Akurasi Formulasi Harga Migas terhadap Harga yang Ditetapkan':

                break;
            case 'Persentase Tingkat Komponen Dalam Negeri (TKDN) pada Kegiatan Usaha Hulu Migas':

                break;
            case 'Persentase Realisasi Investasi Sub Sektor Migas':

                break;
            case 'Persentase Realisasi PNBP Subsektor Migas dan PNBP BLU Pengujian Migas':

                break;
            case 'Indeks Kepuasan Layanan Subsektor Migas':

                break;
            case 'Indeks Efektivitas Pembinaan dan Pengawasan Subsektor Migas':

                break;
            case 'Tingkat Maturitas SPIP Ditjen Migas':

                break;
            case 'Nilai Sistem Akuntabilitas Kinerja Pemerintah (SAKIP) Ditjen Migas':

                break;
            case 'Indeks Keselamatan migas':

                break;
            case 'Indeks Reformasi Birokrasi Ditjen Migas':

                break;
            case 'Nilai Evaluasi Kelembagaan Ditjen Migas':

                break;
            case 'Indeks Profesionalitas ASN Ditjen Migas':

                break;
            case 'Nilai Indikator Kinerja Pelaksanaan Anggaran (IKPA) Ditjen Migas':

                break;
        }
        $data['realisasi'] = $realisasi;
        return $data;
    }


    private function getTopLevelIndikator($input_realisasi)
    {//IKSP
        $id = $input_realisasi->indikator_id;
        $query = "
            WITH RECURSIVE Hierarchy AS (
                SELECT 
                    id,
                    nama_indikator,
                    parent_id
                FROM indikator
                WHERE id = ?
                UNION ALL
                SELECT 
                    t.id,
                    t.nama_indikator,
                    t.parent_id
                FROM indikator t
                INNER JOIN Hierarchy h ON t.id = h.parent_id
            )
            SELECT * FROM Hierarchy WHERE parent_id = 0
        ";
        return DB::select($query, [$id]);
    }

    private function getSecondLevelIndikator($input_realisasi)
    {//IKSK-2
        $id = $input_realisasi->indikator_id;
        $query = "
            WITH RECURSIVE Hierarchy AS (
                SELECT 
                    id,
                    nama_indikator,
                    parent_id
                FROM indikator
                WHERE id = ?
                UNION ALL
                SELECT 
                    t.id,
                    t.nama_indikator,
                    t.parent_id
                FROM indikator t
                INNER JOIN Hierarchy h ON t.id = h.parent_id
            )
            SELECT * FROM Hierarchy WHERE parent_id = 1
        ";
        return DB::select($query, [$id]);
    }

    private function getThirdLevelIndikator($input_realisasi)
    {//IKSK-3
        $id = $input_realisasi->indikator_id;
        $query = "
            WITH RECURSIVE Hierarchy AS (
                SELECT 
                    id,
                    nama_indikator,
                    parent_id
                FROM indikator
                WHERE id = ?
                UNION ALL
                SELECT 
                    t.id,
                    t.nama_indikator,
                    t.parent_id
                FROM indikator t
                INNER JOIN Hierarchy h ON t.id = h.parent_id
            )
            SELECT * FROM Hierarchy WHERE parent_id = 2
        ";
        return DB::select($query, [$id]);
    }

    private function getFourthLevelIndikator($input_realisasi)
    {//IKSK-4
        $id = $input_realisasi->indikator_id;
        $query = "
            WITH RECURSIVE Hierarchy AS (
                SELECT 
                    id,
                    nama_indikator,
                    parent_id
                FROM indikator
                WHERE id = ?
                UNION ALL
                SELECT 
                    t.id,
                    t.nama_indikator,
                    t.parent_id
                FROM indikator t
                INNER JOIN Hierarchy h ON t.id = h.parent_id
            )
            SELECT * FROM Hierarchy WHERE parent_id = 3
        ";
        return DB::select($query, [$id]);
    }

    private function getFourthLevelIndeks($input_realisasi)
    {
        $nama = $input_realisasi->nama_kompositor; //nama kompositor = nama indeks (berarti agregasi)
        $query = "WITH RECURSIVE Hierarchy AS (
            -- Base case: Select the root node
            SELECT 
                id,
                nama_indeks,
                parent_id,
                level
            FROM indeks
            WHERE nama_indeks = ?            
            UNION ALL            
            -- Recursive case: Get child nodes
            SELECT 
                t.id,
                t.nama_indeks,
                t.parent_id,
                t.level
            FROM indeks t
            INNER JOIN Hierarchy h ON t.parent_id = h.id
        )
        -- Retrieve the hierarchy
        SELECT * FROM Hierarchy 
        ORDER BY level, id;";
        return DB::select($query, [$nama]);
    }

    private function getByIndeksKetersediaanMigas($params)
    {
        $realisasi = 0;
        $input_realisasi = $params['input_realisasi'];
        $indikator_iksk_2 = $params['indikator_iksk_2'];
        $nama_indikator_iksk_2 = trim($indikator_iksk_2[0]->nama_indikator);
        switch ($nama_indikator_iksk_2) {
            case 'Indeks Ketersediaan Hulu Migas':
                $indikator_iksk_3 = $this->getThirdLevelIndikator($input_realisasi);
                $data['indikator_iksk_3'] = $indikator_iksk_3;
                if (count($indikator_iksk_3) > 0) {
                    $nama_indikator_iksk_3 = $indikator_iksk_3[0]->nama_indikator;
                    switch ($nama_indikator_iksk_3) {
                        case 'Produksi Minyak dan Gas Bumi':
                            $indikator_iksk_4 = $this->getFourthLevelIndikator($input_realisasi);
                            $data['indikator_iksk_4'] = $indikator_iksk_4;

                            if (count($indikator_iksk_4) > 0) {//jika indikator iksk 4
                                $nama_indikator_iksk_4 = $indikator_iksk_4[0]->nama_indikator;
                                switch ($nama_indikator_iksk_4) {
                                    case 'Produksi Minyak Bumi':
                                        $res_kompo_param = DB::table('kompositor')
                                            ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                                            ->join('realisasi_kompositor', 'kompositor.id', '=', 'realisasi_kompositor.kompositor_id')
                                            ->join('kompositor_parameter', 'kompositor.id', '=', 'kompositor_parameter.kompositor_id', 'left')
                                            ->join('parameter', 'kompositor_parameter.parameter_id', '=', 'parameter.id', 'left')
                                            ->where('indeks.nama_indeks', '=', $nama_indikator_iksk_4)
                                            //->where('kompositor.jenis_kompositor_id', '=', 2)
                                            ->select(
                                                'kompositor.*',
                                                'parameter.nama_parameter',
                                                'parameter.kalkulasi',
                                                'parameter.value',
                                                'realisasi_kompositor.nilai'
                                            )->get();
                                        $data['res_kompo_param'] = $res_kompo_param;
                                        if (count($res_kompo_param) > 0) {
                                            $realisasi_produksi_lifting_minyak = 0;
                                            $parameter_90000 = 0;
                                            $parameter_181000 = 0;
                                            $parameter_273000 = 0;
                                            $parameter_365000 = 0;
                                            foreach ($res_kompo_param as $subrow) {
                                                if (trim($subrow->nama_kompositor) == "Realisasi Produksi/Lifting Minyak") {
                                                    $realisasi_produksi_lifting_minyak = $subrow->nilai;
                                                } elseif (trim($subrow->nama_kompositor) == "Parameter TW1 90000") {
                                                    $parameter_90000 = $subrow->nilai;
                                                } elseif (trim($subrow->nama_kompositor) == "Paramater TW2 181000") {
                                                    $parameter_181000 = $subrow->nilai;
                                                } elseif (trim($subrow->nama_kompositor) == "Parameter TW3 273000") {
                                                    $parameter_273000 = $subrow->nilai;
                                                } elseif (trim($subrow->nama_kompositor) == "Parameter TW4 365000") {
                                                    $parameter_365000 = $subrow->nilai;
                                                }
                                            }
                                            if ($input_realisasi->triwulan_id == 1) {
                                                $realisasi = $realisasi_produksi_lifting_minyak / $parameter_90000;
                                            } elseif ($input_realisasi->triwulan_id == 2) {
                                                $realisasi = $realisasi_produksi_lifting_minyak / $parameter_181000;
                                            } elseif ($input_realisasi->triwulan_id == 3) {
                                                $realisasi = $realisasi_produksi_lifting_minyak / $parameter_273000;
                                            } elseif ($input_realisasi->triwulan_id == 4) {
                                                $realisasi = $realisasi_produksi_lifting_minyak / $parameter_365000;
                                            }
                                        } else {

                                        }
                                        break;
                                    case 'Produksi Gas Bumi':
                                        $res_kompo_param = DB::table('kompositor')
                                            ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                                            ->join('realisasi_kompositor', 'kompositor.id', '=', 'realisasi_kompositor.kompositor_id')
                                            ->join('kompositor_parameter', 'kompositor.id', '=', 'kompositor_parameter.kompositor_id', 'left')
                                            ->join('parameter', 'kompositor_parameter.parameter_id', '=', 'parameter.id', 'left')
                                            ->where('indeks.nama_indeks', '=', $nama_indikator_iksk_4)
                                            //->where('kompositor.jenis_kompositor_id', '=', 2)
                                            ->select(
                                                'kompositor.*',
                                                'parameter.nama_parameter',
                                                'parameter.kalkulasi',
                                                'parameter.value',
                                                'realisasi_kompositor.nilai'
                                            )
                                            ->get();
                                        $data['res_kompo_param'] = $res_kompo_param;
                                        $realisasi_produksi_lifting_gas_bumi = 0;
                                        $parameter_5658 = 0;
                                        foreach ($res_kompo_param as $subrow) {
                                            if (trim($subrow->nama_kompositor) == "Realisasi Produksi/Lifting Gas Bumi") {
                                                $realisasi_produksi_lifting_gas_bumi = $subrow->nilai;
                                            } elseif (trim($subrow->nama_kompositor) == "Parameter 5658") {
                                                $parameter_5658 = $subrow->nilai;
                                            }
                                        }
                                        $realisasi = $realisasi_produksi_lifting_gas_bumi / $parameter_5658;
                                        break;
                                }

                            } else {//indikator iksk 3
                                if ($input_realisasi->sumber_kompositor_id == 1) {//new indikator
                                    $res_kompo_param = DB::table('kompositor')
                                        ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                                        ->join('realisasi_kompositor', 'kompositor.id', '=', 'realisasi_kompositor.kompositor_id')
                                        ->join('input_realisasi', 'realisasi_kompositor.input_realisasi_id', '=', 'input_realisasi.id')
                                        ->where('kompositor.jenis_kompositor_id', '=', 2)
                                        ->where('indeks.nama_indeks', '=', $nama_indikator_iksk_3)
                                        ->where('input_realisasi.triwulan_id', '=', $input_realisasi->triwulan_id)
                                        ->where('kompositor.sumber_kompositor_id', '=', 1)
                                        ->select(
                                            'kompositor.nama_kompositor',
                                            'realisasi_kompositor.nilai'
                                        )
                                        ->distinct()
                                        ->get();
                                    $data['res_kompo_param'] = $res_kompo_param;
                                    $produksi_minyak_bumi = 0;
                                    $produksi_gas_bumi = 0;
                                    foreach ($res_kompo_param as $subrow) {
                                        if (trim($subrow->nama_kompositor) == "Produksi Minyak Bumi") {
                                            $produksi_minyak_bumi = $subrow->nilai;
                                        } elseif (trim($subrow->nama_kompositor) == "Produksi Gas Bumi") {
                                            $produksi_gas_bumi = $subrow->nilai;
                                        }
                                    }
                                    $realisasi = $produksi_minyak_bumi + $produksi_gas_bumi;
                                } elseif($input_realisasi->sumber_kompositor_id == 2) {// existing indikator
                                    $res_kompo_param = DB::table('kompositor')
                                        //->join()
                                        ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                                        ->join('realisasi_kompositor', 'kompositor.id', '=', 'realisasi_kompositor.kompositor_id')
                                        ->join('input_realisasi', 'realisasi_kompositor.input_realisasi_id', '=', 'input_realisasi.id')
                                        ->where('kompositor.jenis_kompositor_id', '=', 2)
                                        ->where('indeks.nama_indeks', '=', $nama_indikator_iksk_3)
                                        ->where('input_realisasi.triwulan_id', '=', $input_realisasi->triwulan_id)
                                        ->where('kompositor.sumber_kompositor_id', '=', 1)
                                        ->select(
                                            'kompositor.nama_kompositor',
                                            'realisasi_kompositor.nilai'
                                        )
                                        ->distinct()
                                        ->get();
                                    $data['res_kompo_param'] = $res_kompo_param;
                                    $produksi_minyak_bumi = 0;
                                    $produksi_gas_bumi = 0;
                                    foreach ($res_kompo_param as $subrow) {
                                        if (trim($subrow->nama_kompositor) == "Produksi Minyak Bumi" && 
                                            $input_realisasi->nama_kompositor == "Produksi Minyak Bumi") {
                                            $produksi_minyak_bumi = $subrow->nilai;
                                            $realisasi = $produksi_minyak_bumi;
                                        } elseif (trim($subrow->nama_kompositor) == "Produksi Gas Bumi" &&
                                        $input_realisasi->nama_kompositor == "Produksi Gas Bumi") {
                                            $produksi_gas_bumi = $subrow->nilai;
                                            $realisasi = $produksi_gas_bumi;
                                        }
                                    }
                                    
                                    //$realisasi = $produksi_minyak_bumi + $produksi_gas_bumi;
                                }elseif($input_realisasi->sumber_kompositor_id == 3){//existing kompositor

                                }else{//existing parameter (4)

                                }
                            }

                            break;
                        case 'Deviasi Kuantitas Ekspor Minyak Mentah dari kuantitas yang Direkomendasikan':
                            $indikator_iksk_4 = $this->getFourthLevelIndikator($input_realisasi);
                            $data['indikator_iksk_4'] = $indikator_iksk_4;
                            if(count($indikator_iksk_4) > 0){//jika indikator iksk 4 kosong, cari indeks level 4
                                $res_kompo_param = DB::table('kompositor')
                                    ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                                    ->join('realisasi_kompositor', 'kompositor.id', '=', 'realisasi_kompositor.kompositor_id')
                                    ->join('input_realisasi', 'realisasi_kompositor.input_realisasi_id', '=', 'input_realisasi.id')
                                    ->where('kompositor.jenis_kompositor_id', '=', 2)
                                    ->where('indeks.nama_indeks', '=', $nama_indikator_iksk_3)
                                    ->where('input_realisasi.triwulan_id', '=', $input_realisasi->triwulan_id)
                                    ->select(
                                        'kompositor.nama_kompositor',
                                        'realisasi_kompositor.nilai'
                                    )
                                    ->distinct()
                                    ->get();
                                $data['res_kompo_param'] = $res_kompo_param;
                                if(count($res_kompo_param) > 0){
                                    $realisasi_deviasi = 0;
                                    foreach ($res_kompo_param as $subrow) {
                                        if (trim($subrow->nama_kompositor) == "Realisasi Deviasi"){
                                            $realisasi_deviasi = $subrow->nilai;
                                            $realisasi = $realisasi_deviasi;
                                        } 
                                    }
                                }
                            }else{//iksk 3
                                if ($input_realisasi->sumber_kompositor_id == 1) {//new indikator
                                    $res_kompo_param = DB::table('kompositor')
                                        ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                                        ->join('realisasi_kompositor', 'kompositor.id', '=', 'realisasi_kompositor.kompositor_id')
                                        ->join('input_realisasi', 'realisasi_kompositor.input_realisasi_id', '=', 'input_realisasi.id')
                                        ->where('kompositor.jenis_kompositor_id', '=', 2)
                                        ->where('indeks.nama_indeks', '=', $nama_indikator_iksk_3)
                                        ->where('input_realisasi.triwulan_id', '=', $input_realisasi->triwulan_id)
                                        ->where('kompositor.sumber_kompositor_id', '=', 1)
                                        ->select(
                                            'kompositor.*',
                                            'realisasi_kompositor.nilai'
                                        )
                                        ->distinct()
                                        ->get();
                                    $data['res_kompo_param'] = $res_kompo_param;
                                    $nama_kompositor = $res_kompo_param[0]->nama_kompositor;
                                    if(count($res_kompo_param) > 0){
                                        $res_sub_kompo_param = DB::table('kompositor')
                                        ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                                        ->join('realisasi_kompositor', 'kompositor.id', '=', 'realisasi_kompositor.kompositor_id')
                                        ->join('input_realisasi', 'realisasi_kompositor.input_realisasi_id', '=', 'input_realisasi.id')
                                        //->where('kompositor.jenis_kompositor_id', '=', 2)
                                        ->where('indeks.nama_indeks', '=', $nama_kompositor)
                                        ->where('input_realisasi.triwulan_id', '=', $input_realisasi->triwulan_id)
                                        ->where('kompositor.sumber_kompositor_id', '=', 1)
                                        ->select(
                                            'kompositor.*',
                                            'realisasi_kompositor.nilai'
                                        )
                                        ->distinct()
                                        ->get();
                                        $data['res_sub_kompo_param'] = $res_sub_kompo_param;
                                        if(count($res_sub_kompo_param) > 0){
                                            $nama_sub_kompositor = $res_sub_kompo_param[0]->nama_kompositor;
                                            $res_sub_sub_kompo_param = DB::table('kompositor')
                                            ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                                            ->join('realisasi_kompositor', 'kompositor.id', '=', 'realisasi_kompositor.kompositor_id')
                                            ->join('input_realisasi', 'realisasi_kompositor.input_realisasi_id', '=', 'input_realisasi.id')
                                            ->where('kompositor.jenis_kompositor_id', '=', 2)
                                            ->where('indeks.nama_indeks', '=', $nama_sub_kompositor)
                                            ->where('input_realisasi.triwulan_id', '=', $input_realisasi->triwulan_id)
                                            ->where('kompositor.sumber_kompositor_id', '=', 1)
                                            ->select(
                                                'kompositor.*',
                                                'realisasi_kompositor.nilai'
                                            )
                                            ->distinct()
                                            ->get();
                                            $data['res_sub_sub_kompo_param'] = $res_sub_sub_kompo_param;
                                            if(count($res_sub_sub_kompo_param) > 0){

                                            }else{
                                                $selisih_realisasi_kuota_bbl = 0;
                                                $kuota_per_surat_rekomendasi = 0;
                                                foreach($res_sub_kompo_param as $subrow){
                                                    if (trim($subrow->nama_kompositor) == "selisih realisasi dan kuota (bbl)"){
                                                        $selisih_realisasi_kuota_bbl = $subrow->nilai;
                                                        //$realisasi = $selisih_realisasi_kuota_bbl ;
                                                    } elseif (trim($subrow->nama_kompositor) == "Kuota per surat rekomendasi (bbl)"){
                                                        $kuota_per_surat_rekomendasi = $subrow->nilai;
                                                    }
                                                }
                                                //Realisasi Deviasi
                                                $realisasi = $selisih_realisasi_kuota_bbl / $kuota_per_surat_rekomendasi;
                                            }
                                        }else{

                                        }
                                    }else{

                                    }
                                }elseif($input_realisasi->sumber_kompositor_id == 2){//existing indikator
                                    $res_kompo_param = DB::table('kompositor')
                                        //->join()
                                        ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                                        ->join('realisasi_kompositor', 'kompositor.id', '=', 'realisasi_kompositor.kompositor_id')
                                        ->join('input_realisasi', 'realisasi_kompositor.input_realisasi_id', '=', 'input_realisasi.id')
                                        ->where('kompositor.jenis_kompositor_id', '=', 2)
                                        ->where('indeks.nama_indeks', '=', $nama_indikator_iksk_3)
                                        ->where('input_realisasi.triwulan_id', '=', $input_realisasi->triwulan_id)
                                        ->where('kompositor.sumber_kompositor_id', '=', 1)
                                        ->select(
                                            'kompositor.nama_kompositor',
                                            'realisasi_kompositor.nilai'
                                        )
                                        ->distinct()
                                        ->get();
                                    $data['res_kompo_param'] = $res_kompo_param;
                                }elseif($input_realisasi->sumber_kompositor_id == 3){//existing kompositor

                                }else{//existing parameter

                                }
                                /*$indeks_level_4 = $this->getFourthLevelIndeks($input_realisasi);
                                $data['indeks_level_4'] = $indeks_level_4;
                                $nama_indeks = $indeks_level_4[0]->nama_indeks;
                                $indeks_id = $indeks_level_4[0]->id;
                                if(count($indeks_level_4) > 0){
                                    $res_kompo_param = DB::table('kompositorx')
                                    ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                                    ->join('realisasi_kompositor', 'kompositor.id', '=', 'realisasi_kompositor.kompositor_id')
                                    ->join('input_realisasi', 'realisasi_kompositor.input_realisasi_id', '=', 'input_realisasi.id')
                                    ->where('kompositor.indeks_id', '=', $indeks_id)                                    
                                    ->select(
                                        'kompositor.*',
                                        'realisasi_kompositor.nilai',
                                        'indeks.nama_indeks',
                                        'indeks.parent_id'
                                    )->get();
                                    $data['res_kompo_param'] = $res_kompo_param;
                                }*/
                                
                            }                           

                            break;
                        case 'Deviasi Kuantitas Ekspor LNG skema hulu dari kuantitas yang direkomendasikan':
                            $res_kompo_param = DB::table('kompositor')
                                ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                                ->join('realisasi_kompositor', 'kompositor.id', '=', 'realisasi_kompositor.kompositor_id')
                                ->join('input_realisasi', 'realisasi_kompositor.input_realisasi_id', '=', 'input_realisasi.id')
                                ->where('kompositor.jenis_kompositor_id', '=', 2)
                                ->where('indeks.nama_indeks', 'like', $input_realisasi->nama_kompositor)
                                ->where('input_realisasi.triwulan_id', '=', $input_realisasi->triwulan_id)
                                ->select(
                                    'kompositor.nama_kompositor',
                                    'realisasi_kompositor.nilai'
                                )
                                ->distinct()
                                ->get();
                            $data['res_kompo_param'] = $res_kompo_param;
                            break;
                    }
                } else {

                }
                break;
            case 'Persentase Pemanfaatan Gas Bumi Domestik':
                break;
            case 'Indeks Ketersediaan BBM':
                break;
            case 'Indeks Ketersediaan LPG':
                break;
            case 'Penyediaan Elpiji 3 kg bagi Masyarakat, Usaha Mikro, Nelayan, dan Petani Sasaran':
                break;
            case 'Indeks Ketersediaan LNG':
                break;
            case 'Reserve to Production Ratio Minyak Bumi':
                break;
            case 'Reserve to Production Ratio Gas Bumi':
                break;
            case 'Jumlah Hari Cadangan BBM Operasional':
                break;
            case 'Jumlah Hari Cadangan LPG Operasional':
                break;
            case 'Persentase Rekomendasi kebijakan dan Dokumen Perencanaan yang Diterima Oleh Stakeholder':
                break;
        }
        $data['realisasi'] = $realisasi;
        return $data;
    }

    private function getByAkurasiFormulasiHargaMigas($result)
    {
        $nama_indikator_iksk_2 = trim($result[0]->nama_indikator);
        switch ($nama_indikator_iksk_2) {
            case 'Deviasi Penetapan Harga Minyak Mentah Indonesia (ICP)':
                break;
            case 'Deviasi Harga Gas Skema Hulu (Gas Pipa,LNG, LPG dan Gas Suar)':
                break;
            case 'Deviasi Harga Jual Eceran BBM dan LPG':
                break;
            case 'Deviasi Harga Gas Hilir':
                break;
            case 'Penyediaan Paket Konversi Minyak Tanah ke LPG Tabung 3 Kg':
                break;
            case 'Penyediaan Konverter Kit BBM ke Bahan Bakar Gas untuk Nelayan':
                break;
            case 'Penyediaan Konverter Kit BBM ke Bahan Bakar Gas untuk Petani':
                break;
            case 'Infrastruktur Jaringan Gas Bumi untuk Rumah Tangga (APBN)':
                break;
            case 'Studi Pendahuluan Pembangunan Jaringan Gas Bumi untuk Rumah Tangga melalui Skema KPBU':
                break;
            case 'Indeks Fasilitas Niaga Migas':
                break;
            case 'Indeks Fasilitas Pengangkutan Migas':
                break;
            case 'Indeks Fasilitas Pengolahan Migas':
                break;
            case 'Fasilitasi Peningkatan Infrastruktur Kilang Minyak Bumi (Tahapan)':
                break;
            case 'Indeks Fasilitas Penyimpanan Migas':
                break;
        }
    }

    private function getByPersentaseTingkatKomponenDN($result)
    {
        $nama_indikator_iksk_2 = trim($result[0]->nama_indikator);
        switch ($nama_indikator_iksk_2) {
            case 'Persentase Tingkat Komponen Dalam Negeri (TKDN) pada Kegiatan Usaha Hulu Migas':
                break;

        }
    }

    private function getByPersentaseRealisasiInvestasiSSM($result)
    {
        $nama_indikator_iksk_2 = trim($result[0]->nama_indikator);
        switch ($nama_indikator_iksk_2) {
            case 'Persentase Realisasi Investasi subsektor Migas':
                break;

        }
    }

    private function getByPersentaseRealisasiPNBP($result)
    {
        $nama_indikator_iksk_2 = trim($result[0]->nama_indikator);
        switch ($nama_indikator_iksk_2) {
            case 'Persentase Realisasi Penerimaan Negara Migas':
                break;

        }
    }

    private function getByIndeksKepuasanLayananSM($result)
    {
        $nama_indikator_iksk_2 = trim($result[0]->nama_indikator);
        switch ($nama_indikator_iksk_2) {
            case 'Indeks Kepuasan Layanan Hulu Migas':
                break;
            case 'Indeks Kepuasan Layanan Hilir Migas':
                break;
            case 'Indeks Kepuasan Layanan Keselamatan Migas':
                break;
            case 'Indeks Kepuasan Layanan Program Migas':
                break;
            case 'Indeks Kepuasan Layanan Informasi Migas':
                break;

        }
    }

    private function getByIndeksEfektivitasPembinaanPSM($result)
    {
        $nama_indikator_iksk_2 = trim($result[0]->nama_indikator);
        switch ($nama_indikator_iksk_2) {
            case 'Indeks Efektivitas Pembinaan dan Pengawasan Hulu Migas':
                break;
            case 'Indeks Efektivitas Pembinaan dan Pengawasan Hilir Migas':
                break;
            case 'Indeks Efektivitas Pembinaan dan Pengawasan Direktorat Teknik dan Lingkungan Migas':
                break;
            case 'Indeks Efektivitas Pembinaan dan Pengawasan Program Migas':
                break;
        }
    }

    private function getByTingkatMaturitasSPIPDM($result)
    {
        $nama_indikator_iksk_2 = trim($result[0]->nama_indikator);
        switch ($nama_indikator_iksk_2) {
            case 'Tingkat Maturitas SPIP Ditjen Migas':
                break;
        }
    }

    private function getByNilaiSistemAkuntabilitasKinerjaPDM($result)
    {
        $nama_indikator_iksk_2 = trim($result[0]->nama_indikator);
        switch ($nama_indikator_iksk_2) {
            case 'Nilai Sistem Akuntabilitas Kinerja Pemerintah (SAKIP) Ditjen Migas':
                break;
        }
    }

    private function getByIndeksKeselamatanMigas($result)
    {
        $nama_indikator_iksk_2 = trim($result[0]->nama_indikator);
        switch ($nama_indikator_iksk_2) {
            case 'Indeks Keselamatan migas':
                break;
        }
    }

    private function getByIndeksReformasiBirokrasiDM($result)
    {
        $nama_indikator_iksk_2 = trim($result[0]->nama_indikator);
        switch ($nama_indikator_iksk_2) {
            case 'Indeks Reformasi Birokrasi':
                break;
            case 'Tingkat Kepuasan Pelayanan Internal Ditjen Migas':
                break;
        }
    }

    private function getByNilaiEvaluasiKelembagaanDM($result)
    {
        $nama_indikator_iksk_2 = trim($result[0]->nama_indikator);
        switch ($nama_indikator_iksk_2) {
            case 'Nilai Evaluasi Kelembagaan':
                break;
        }
    }

    private function getByIndeksProfesionalitasASNDM($result)
    {
        $nama_indikator_iksk_2 = trim($result[0]->nama_indikator);
        switch ($nama_indikator_iksk_2) {
            case 'Indeks Profesionalitas ASN':
                break;
            case 'Persentase Pegawai Direktorat Pembinaan Progam Migas yang Bebas Hukuman Disiplin':
                break;
            case 'Persentase Pegawai Direktorat Pembinaan Progam Migas yang Mencapai/ Melebihi Target Kinerja':
                break;
            case 'Persentase Pegawai Direktorat Pembinaan Usaha Hulu Migas yang Bebas Hukuman Disiplin':
                break;
            case 'Persentase Pegawai Direktorat Pembinaan Usaha Hulu Migas yang Mencapai/ Melebihi Target Kinerja':
                break;
            case 'Persentase Pegawai Direktorat Pembinaan Usaha Hilir Migas yang Bebas Hukuman Disiplin':
                break;
            case 'Persentase Pegawai Direktorat Pembinaan Usaha Hilir Migas yang Mencapai/ Melebihi Target Kinerja':
                break;
            case 'Persentase Pegawai Direktorat Teknik dan Lingkungan Migas yang Bebas Hukuman Disiplin':
                break;
            case 'Persentase Pegawai Direktorat Teknik dan Lingkungan Migas yang Mencapai/ Melebihi Target Kinerja':
                break;
            case 'Persentase Pegawai Direktorat Perencanaan dan Pembangunan Infrastruktur Migas yang Bebas Hukuman Disiplin':
                break;
            case 'Persentase Pegawai Direktorat Perencanaan dan Pembangunan Infrastruktur Migas yang Mencapai/ Melebihi Target Kinerja':
                break;
            case 'Persentase Pegawai Sekretariat Direktorat Jenderal Migas yang Bebas Hukuman Disiplin':
                break;
            case 'Persentase Pegawai Sekretariat Direktorat Jenderal Migas yang Mencapai/ Melebihi Target Kinerja':
                break;
        }
    }

    private function getByNilaiIndikatorKinerjaPADM($result)
    {
        $nama_indikator_iksk_2 = trim($result[0]->nama_indikator);
        switch ($nama_indikator_iksk_2) {
            case 'Persentase Realisasi Anggaran Direktorat Pembinaan Program Migas':
                break;
            case 'Persentase Realisasi Anggaran Direktorat Pembinaan Usaha Hulu Migas':
                break;
            case 'Persentase Realisasi Anggaran Direktorat Pembinaan Usaha Hilir Migas':
                break;
            case 'Persentase Realisasi Anggaran Direktorat Teknik dan Lingkungan Migas':
                break;
            case 'Persentase Realisasi Anggaran Direktorat Perencanaan dan Pembangunan Infrastruktur Migas':
                break;
            case 'Persentase Realisasi Anggaran Sekretariat Direktorat Jenderal Migas':
                break;
            case 'Nilai Indikator Kinerja Pelaksanaan Anggaran':
                break;
        }
    }

}
