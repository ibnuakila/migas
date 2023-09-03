<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Periode extends Model
{
    use HasFactory;
    protected $table = 'Periode';
    protected $primaryKey = 'Id';
    public $timestamps = false;
    protected $fillable = [
        'Periode',
        'Status'
    ];
    
}
