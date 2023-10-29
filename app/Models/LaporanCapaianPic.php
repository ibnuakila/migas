<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LaporanCapaianPic extends Model
{
    use HasFactory;
    protected $table = 'laporan_capaian_pic';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'laporan_capaian_id',
        'pic_id',
        'nama_pic'
    ];
}
