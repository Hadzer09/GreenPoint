<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StaffProfile extends Model
{
    protected $table = 'staff_profiles';
    protected $fillable = ['user_id', 'id_pegawai', 'area_tugas', 'is_active'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
