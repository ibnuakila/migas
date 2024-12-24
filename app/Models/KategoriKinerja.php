<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KategoriKinerja extends Model
{
    use HasFactory;
    protected $table = 'kategori_kinerja';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'name'
    ];

    public function laporanCapaian()
    {
        return $this->hasMany(LaporanCapaian::class);
    }
}
