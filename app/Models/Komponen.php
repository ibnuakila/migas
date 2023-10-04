<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Komponen extends Model
{
    use HasFactory;
    protected $table = 'komponen';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'nama_komponen',
        'bobot'
    ];
    
    public function subKomponen(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(SubKomponen::class);
    }
}
