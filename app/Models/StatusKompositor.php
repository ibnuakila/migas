<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StatusKompositor extends Model
{
    use HasFactory;
    protected $table = 'status_kompositor';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'status_kompositor'
    ];
    
    public function kompositor(){
        return $this->hasMany(Kompositor::class);
    }
        
}
