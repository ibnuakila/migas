<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KompositorPic extends Model
{
    use HasFactory;
    protected $table = 'kompositor_pic';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'indikator_id',
        'pic_id',
        'nama_pic'
    ];
    
    public function kompositor(){
        return $this->belongsTo(Kompositor::class);
    }
}
