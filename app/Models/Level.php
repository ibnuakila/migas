<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Level extends Model
{
    use HasFactory;
    protected $table = 'level';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'nama_level'
    ];
    
    public function indikator(){
        return $this->hasMany(Indikator::class);
    }
}
