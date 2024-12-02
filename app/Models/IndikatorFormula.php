<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IndikatorFormula extends Model
{
    use HasFactory;
    protected $table = 'indikator_formula';
    protected $primaryKey = 'id';
    //protected $keyType = 'string';
    public $timestamps = false;
    protected $fillable = [
        //'id',
        'indikator_id',
        'formula_realisasi',
        'mapping_realisasi',
        'formula_kinerja',
        'mapping_kinerja'
    ];
}
