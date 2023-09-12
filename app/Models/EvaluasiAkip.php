<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EvaluasiAkip extends Model
{
    use HasFactory;
    protected $table = 'EvaluasiAkip';
    protected $primaryKey = 'Id';
    public $timestamps = false;
    protected $fillable = [
        'TanggalAjuan',
        'IdPeriode',
        'Status',
        'Keterangan'
    ];
}
