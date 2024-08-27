<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubKomponen extends Model
{
    use HasFactory;
    protected $table = 'sub_komponen';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'nama_sub_komponen',
        'bobot',
        'ordering',
        'numbering',
        'komponen_id'
    ];
    
    public function komponen(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Komponen::class);
    }
}
