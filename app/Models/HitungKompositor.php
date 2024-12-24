<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HitungKompositor extends Model
{
    use HasFactory;
    protected $table = 'hitung_kompositor';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'field',
        'f_type',
        'p_field_id',
        'indikator_kompositor_id',
        'lvl'        
    ];
}
