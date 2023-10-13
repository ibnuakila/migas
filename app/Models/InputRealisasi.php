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
        'indikator_kompositor_id',
        'realisasi',        
        'satuan',
        'triwulan_id',
        'pic_id',
        'periode_id',
        'laporan_capaian_id'
    ];
}
