<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Znck\Eloquent\Relations\BelongsToThrough;

class Indikator extends Model
{
    use HasFactory;
    protected $table = 'indikator';
    protected $primaryKey = 'id';
    //protected $keyType = 'string';
    public $timestamps = false;
    protected $fillable = [
        'id',
        'nama_indikator',
        'satuan_id',
        'level_id',
        'parent_id',
        'ordering',
        'numbering'
    ];
    
    public function satuan()
    {
        return $this->belongsTo(Satuan::class);
    }
    
    public function indikatorPeriode()
    {
        return $this->hasMany(IndikatorPeriode::class);
    }
    
    public function level()
    {
        return $this->belongsTo(Level::class);        
    }
    
    public function indikatorKompositors()
    {
        return $this->hasMany(IndikatorKompositor::class);
    }
    
    public function laporanCapaians()
    {
        return $this->hasMany(LaporanCapaian::class);
    }
    
    public function indikatorPics()
    {
        return $this->hasMany(IndikatorPic::class);
    }
    
    public function indikatorFormula() {
        return $this->hasOne(IndikatorFormula::class);
    }
    
}
