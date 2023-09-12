<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HasilEvaluasi extends Model
{
    use HasFactory;
    protected $table = 'HasilEvaluasi';
    protected $primaryKey = 'Id';
    public $timestamps = false;
    protected $fillable = [
        'IdEvaluasiAkip',
        'TanggalEvaluasi',
        'FilePath',
        'Status',
        'Keterangan',
        'Evaluator'
    ];
}
