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
        //'indikator_id',
        'nama_kompositor',        
        'satuan',
        'indeks_id',
        'jenis_kompositor_id'
    ];
    
    public function inputRealisasi(){
        return $this->hasOne(InputRealisasi::class);
    }
    
    
}
