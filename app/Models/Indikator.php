<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Indikator extends Model
{
    use HasFactory;
    protected $table = 'indikator';
    protected $primaryKey = 'id';
    //protected $keyType = 'string';
    public $timestamps = false;
    protected $fillable = [
        'id',
        'nama_indikator',
        'satuan_id',
        'level_id',
        'parent_id',
        'ordering',
        'numbering'
    ];
    
    public function satuan()
    {
        return $this->hasMany(Satuan::class);
    }
}
