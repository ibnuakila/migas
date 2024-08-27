<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IndikatorPeriodePic extends Model
{
    use HasFactory;
    
    protected $table = 'indikator_periode_pic';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'indikator_periode_id',        
        'pic_id',      
        'nama_pic'
    ];
    
    public function indikatorPeriode() {
        return $this->belongsTo(IndikatorPeriode::class);
    }
    
    public function pic(){
        return $this->hasOne(PIC::class);
    }
}
