<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SimpleDemo extends Model
{
    use HasFactory;
    protected $table = 'SimpleDemo';
    protected $primaryKey = 'id';
    //protected $keyType = 'string';
    public $timestamps = false;
    protected $fillable = [
        'Level',
        'Location',
        'LocationType'        
    ];
}
