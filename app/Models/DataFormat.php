<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DataFormat extends Model
{
    use HasFactory;
    protected $table = 'data_format';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'format'        
    ];
}
