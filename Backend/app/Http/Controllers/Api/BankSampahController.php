<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BankSampahController extends Controller
{
    public function index() {
    // Nanti datanya bisa kamu ambil dari tabel 'bank_sampahs'
    return response()->json([
        'success' => true,
        'data' => [
            [
                'nama' => 'Bank Sampah Induk Aceh',
                'lat' => 5.5482,
                'lng' => 95.3238,
                'alamat' => 'Jl. Banda Aceh - Medan'
            ],
            // Tambahkan lokasi lainnya
        ]
    ]);
}
}
