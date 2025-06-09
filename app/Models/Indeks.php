<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Indeks extends Model
{
    use HasFactory;
    protected $table = 'indeks';
    protected $primaryKey = 'id';
    //protected $keyType = 'string';
    public $timestamps = false;
    protected $fillable = [        
        'nama_indeks',
        'parent_id',  
        'level'      
    ];
}
