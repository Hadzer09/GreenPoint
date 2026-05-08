<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KategoriSampah extends Model {
    protected $table = 'kategori_sampah';
    protected $fillable = ['nama_kategori', 'satuan', 'harga_beli', 'harga_jual'];
}
