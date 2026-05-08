<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setoran extends Model
{
    protected $fillable = ['nasabah_profile_id', 'berat', 'nominal', 'jenis_sampah'];

public function nasabah()
{
    return $this->belongsTo(NasabahProfile::class);
}

}
