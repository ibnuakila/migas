<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JenisKompositor extends Model
{
    use HasFactory;
    protected $table = 'jenis_kompositor';
    protected $primaryKey = 'id';    
    public $timestamps = false;
    protected $fillable = [
        'id',
        'nama_jenis_kompositor'
    ];
    
    public function kompositor(){
        return $this->hasMany(Kompositor::class);
    }
}
