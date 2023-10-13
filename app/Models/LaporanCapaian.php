<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LaporanCapaian extends Model
{
    use HasFactory;
    protected $table = 'laporan_capaian';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'indikator_periode_id',
        'triwulan_id',
        'realisasi',
        'kinerja',
        'periode_id',
        'kategori_kinerja_id',
        'sumber_data'
    ];
    
    public function indikatorPeriode(){
        $this->hasOne(IndikatorPeriode::class);
    }
    
    public function periode() {
        $this->hasOne(Periode::class);
    }
    
    public function triwulan() {
        $this->hasOne(Triwulan::class);
    }
    
    public function kategoriKinerja() {
        $this->hasOne(KategoriKinerja::class);
    }
}
