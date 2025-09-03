<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KinerjaTriwulan extends Model 
{
    use HasFactory;     
    protected $table = 'kinerja_triwulan';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [       
        'laporan_capaian_id',                
        'triwulan_id',
        'kinerja',
        'kinerja_format'
    ];
    
    public function laporanCapaian(){
        return $this->belongsTo(LaporanCapaian::class);
    }
}
