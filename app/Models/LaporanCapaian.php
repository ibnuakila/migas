<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Znck\Eloquent\Relations\BelongsToThrough;

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
        'sumber_data',
        'indikator_id',
        'target',
        'target_format',
        'persentasi_kinerja',
        'file_path'
    ];
    
    public function indikator(){
        return $this->belongsTo(Indikator::class);
    }
    
    public function periode() {
        return $this->belongsTo(Periode::class);
    }
    
    public function triwulan() {
        return $this->belongsTo(Triwulan::class);
    }
    
    public function kategoriKinerja() {
        return $this->hasOne(KategoriKinerja::class);
    }
    
    public function laporanCapaianPic() {
        return $this->hasMany(LaporanCapaianPic::class);
    }
    
    
}
