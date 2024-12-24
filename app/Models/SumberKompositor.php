<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SumberKompositor extends Model
{
    use HasFactory;
    protected $table = 'sumber_kompositor';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [        
        'nama_sumber_kompositor',        
        
    ];
}
