<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NasabahProfile extends Model {
    protected $fillable = ['user_id', 'no_hp', 'alamat', 'latitude', 'longitude', 'saldo'];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function setoran()
{
    return $this->hasMany(Setoran::class);
}

}
