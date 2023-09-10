<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Satuan extends Model
{
    use HasFactory;
    
    protected $table = 'Satuan';
    protected $primaryKey = 'Id';
    public $timestamps = false;
    protected $fillable = [
        'NamaStatus'
    ];
}
