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
        'periode_id',                
        'indikator_id',
        'kategori_kinerja_id',
        'target',
        'target_format',
        'status_kinerja',
        'kinerja_tahunan',
        'sumber_data',
    ];
    
    public function indikator(){
        return $this->belongsTo(Indikator::class);
    }
    
    public function periode() {
        return $this->belongsTo(Periode::class);
    }
        
    public function kategoriKinerja() {
        return $this->hasOne(KategoriKinerja::class);
    }
    
    public function laporanCapaianPic() {
        return $this->hasMany(LaporanCapaianPic::class);
    }
    
    public function kinerjaTriwulan(){
        return $this->hasMany(KinerjaTriwulan::class);
    }
    
    public function inputRealisasi(){
        return $this->hasMany(InputRealisasi::class);
    }
    
}
