<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IndikatorPic extends Model
{
    use HasFactory;
    protected $table = 'indikator_pic';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'indikator_id',
        'pic_id',
        'nama_pic'
    ];
    
    public function indikator(){
        return $this->belongsTo(Indikator::class);
    }
}
