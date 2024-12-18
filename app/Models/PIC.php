<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PIC extends Model
{
    use HasFactory;
    protected $table = 'pic';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'nama_pic',
        'parent_id',
        'keterangan'
    ];
    
    public function indikatorPeriodePic() {
        return $this->belongsToMany(IndikatorPeriodePic::class);
    }
    
    public function users()
    {
        return $this->hasMany(User::class);
    }
    
    
}
