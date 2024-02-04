<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EvaluasiAkip extends Model
{
    use HasFactory;
    protected $table = 'evaluasi_akip';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'tanggal_ajuan',
        'periode_id',
        'status',
        'keterangan'
    ];
}
