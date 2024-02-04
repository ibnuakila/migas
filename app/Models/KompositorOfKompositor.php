<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KompositorOfKompositor extends Model
{
    use HasFactory;
    protected $table = 'kompositor_of_kompositor';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'kompositor_id',
        'ref_kompositor_id'
    ];
    
    public function kompositor(){
        $this->belongsToMany(Kompositor::class);
    }
}
