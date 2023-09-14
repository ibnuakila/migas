<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Periode extends Model
{
    use HasFactory;
    protected $table = 'periode';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'periode',
        'status'
    ];
    
    public function indikatorPeriode() {
        return $this->belongsTo(IndikatorPeriode::class);
    }
    
    public function laporanCapaian() {
        return $this->belongsTo(LaporanCapaian::class);
    }
    
    public function evaluasiAkip() {
        return $this->belongsTo(EvaluasiAkip::class);
    }
    
    /*public function indikatorPeriodes() {
        return $this->hasMany(IndikatorPeriode::class);
    }*/
}
