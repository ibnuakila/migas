<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HasilEvaluasi extends Model
{
    use HasFactory;
    protected $table = 'hasil_evaluasi';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'evaluasi_akip_id',
        'tanggal_evaluasi',
        'file_path',
        'status',
        'keterangan',
        'evaluator'
    ];
}
