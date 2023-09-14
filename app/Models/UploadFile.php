<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UploadFile extends Model
{
    use HasFactory;
    protected $table = 'upload_file';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'file_path',
        'nama_dokumen',
        'kategori_dokumen_id',
        'upload_date',
        'deskripsi',
        'evaluasi_akip_id',
        'revisi'
    ];
}
