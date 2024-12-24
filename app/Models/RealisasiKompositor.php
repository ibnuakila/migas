<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RealisasiKompositor extends Model
{
    use HasFactory;
    protected $table = 'realisasi_kompositor';
    protected $primaryKey = 'id';
    //protected $primaryKey = 'identifier';
    public $timestamps = false;
    protected $fillable = [
        'kompositor_id',
        'input_realisasi_id',        
        'nilai'        
    ];
    
    public function inputRealisasi(){
        return $this->belongsTo(InputRealisasi::class);
    }
    
    public function realisasiKompositorPics(){
        return $this->hasMany(RealisasiKompositorPic::class);
    }
}
