<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Parameter extends Model
{
    use HasFactory;
    protected $table = 'parameter';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'nama_parameter',
        'value',
        'indeks_id',
        'kalkulasi'
    ];
}
