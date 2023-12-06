<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InputRealisasi extends Model
{
    use HasFactory;
    
    protected $table = 'input_realisasi';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'realisasi',
        'realisasi_format',                
        'triwulan_id',        
        'laporan_capaian_id'
    ];
    
    public function periode(){
        return $this->belongsTo(Periode::class);
    }
    
    public function triwulan(){
        return $this->belongsTo(Triwulan::class);
    }
    
    public function inputRealisasiPic(){
        return $this->hasMany(InputRealisasiPic::class);
    }
    
    public function realisasiKompositor(){
        return $this->hasMany(RealisasiKompositor::class);
    }
    
    public function laporanCapaian(){
        return $this->belongsTo(LaporanCapaian::class);
    }
}
