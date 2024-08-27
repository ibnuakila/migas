<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KategoriDokumen extends Model
{
    use HasFactory;
    protected $table = 'kategori_dokumen';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'kategori_komponen'
    ];
}
