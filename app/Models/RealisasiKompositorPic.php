<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RealisasiKompositorPic extends Model
{
    use HasFactory;
    protected $table = 'realisasi_kompositor_pic';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'realisasi_kompositor_id',
        'pic_id',
        'nama_pic'
    ];
    
    public function realisasiKompositor(){
        return $this->belongsTo(RealisasiKompositor::class);
    }
}
