<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Triwulan extends Model
{
    use HasFactory;
    protected $table = 'triwulan';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'triwulan'
    ];
    
    public function laporanCapaian(){
        return $this->hasMany(LaporanCapaian::class);
    }
    
    public function inputRealisasi(){
        return $this->hasMany(InputRealisasi::class);
    }
}
