<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InputRealisasiPic extends Model
{
    use HasFactory;
    protected $table = 'input_realisasi_pic';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'input_realisasi_id',
        'pic_id',
        'nama_pic'
    ];
    
    public function inputRealisasi(){
        return $this->belongsTo(InputRealisasi::class);
    }
}
