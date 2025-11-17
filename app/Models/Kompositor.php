<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kompositor extends Model
{
    use HasFactory;
    protected $table = 'kompositor';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'kalkulasi',
        'nama_kompositor',        
        'satuan',
        'indeks_id',
        'jenis_kompositor_id',
        'sumber_kompositor_id',
        //'status'
    ];
    
    public function realisasiKompositor(){
        return $this->hasOne(RealisasiKompositor::class);
    }
    
    public function inputRealisasi(){
        return $this->hasOne(InputRealisasi::class);
    }
    
    public function indikatorKompositor(){
        return $this->hasMany(IndikatorKompositor::class);
    }
    
    public function kompositorParameter(){
        return $this->hasMany(KompositorParameter::class);
    }
    
    public function kompositorOfKompositor(){
        return $this->hasMany(KompositorOfKompositor::class);
    }
    
    public function parameter(){
        return $this->hasManyThrough(Parameter::class, KompositorParameter::class);
    }
    
    public function kompositorPics()
    {
        return $this->hasMany(KompositorPic::class);
    }
    
    public function jenisKompositor(){
        return $this->belongsTo(JenisKompositor::class);
    }

    public function statusKompositor() {
        return $this->belongsTo(StatusKompositor::class);
    }
}
