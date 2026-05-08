<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\KategoriSampah;
use Illuminate\Http\Request;

class MasterDataController extends Controller
{
    // Ambil semua data sampah (untuk Next.js)
    public function getKategori()
    {
        $data = KategoriSampah::all();
        return response()->json([
            'success' => true,
            'data' => $data
        ]);
    }

    // Tambah kategori baru (untuk Admin)
    public function storeKategori(Request $request)
    {
        $validated = $request->validate([
            'nama_kategori' => 'required|string',
            'harga_beli' => 'required|numeric',
            'harga_jual' => 'required|numeric',
        ]);

        $kategori = KategoriSampah::create($validated);
        return response()->json(['message' => 'Kategori berhasil ditambah', 'data' => $kategori]);
    }

    
}
