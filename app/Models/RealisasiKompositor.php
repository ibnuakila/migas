<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RealisasiKompositor extends Model
{
    use HasFactory;
    protected $table = 'realisasi_kompositor';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'kompositor_id',
        'input_realisasi_id',        
        'nilai'        
    ];
}
