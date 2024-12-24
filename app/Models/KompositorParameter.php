<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KompositorParameter extends Model
{
    use HasFactory;
    protected $table = 'kompositor_parameter';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'parameter_id',
        'kompositor_id'
    ];
    
    public function kompositor(){
        $this->belongsToMany(Kompositor::class);
    }
}
