<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IndikatorPeriode extends Model
{
    use HasFactory;
    protected $table = 'indikator_periode';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'indikator_id',
        'periode_id',
        'target',
        //'pic_id',
        'level_id'
    ];
    
    public function periode()
    {
        return $this->hasOne(Periode::class);
    }
    
    public function indikator()
    {
        return $this->hasOne(Indikator::class);
    }
    
    public function level()
    {
        return $this->hasOne(Level::class);
    }
    
    public function indikatorPeriodePic() {
        return $this->hasMany(IndikatorPeriodePic::class);
    }
    
    public function laporanCapaian()
    {
        return $this->belongsTo(LaporanCapaian::class);
    }
    
    /*public function pic(){
        return $this->hasManyThrough(PIC::class, IndikatorPeriodePic::class);
    }*/
    
}
