<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IndikatorKompositor extends Model
{
    use HasFactory;
    protected $table = 'indikator_kompositor';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'indikator_id',
        'nama_kompositor',
        'kalkulasi',
        'satuan',
        'indeks_id',
        'jenis_kompositor_id'
    ];
}