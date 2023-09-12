<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UploadFile extends Model
{
    use HasFactory;
    protected $table = 'UploadFile';
    protected $primaryKey = 'Id';
    public $timestamps = false;
    protected $fillable = [
        'FilePath',
        'NamaDokumen',
        'IdKategoriDokumen',
        'UploadDate',
        'Deskripsi',
        'IdEvaluasiAkip',
        'Revisi'
    ];
}
