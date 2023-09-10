<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Level extends Model
{
    use HasFactory;
    protected $table = 'Level';
    protected $primaryKey = 'Id';
    public $timestamps = false;
    protected $fillable = [
        'NamaLevel'
    ];
}
