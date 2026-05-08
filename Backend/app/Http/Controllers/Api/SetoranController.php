<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Setoran;
use App\Models\NasabahProfile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class SetoranController extends Controller
{
    /**
     * Menampilkan riwayat laporan setoran (Laporan Saya / Dashboard Terbatas)
     */
    public function index(Request $request)
    {
        $user = Auth::user();

        // 1. Cari profil nasabah
        $profile = NasabahProfile::where('user_id', $user->id)->first();

        if (!$profile) {
            return response()->json([
                'success' => false,
                'message' => 'Profil nasabah tidak ditemukan.',
            ], 404);
        }

        // 2. Siapkan query dasar
        $query = Setoran::where('nasabah_profile_id', $profile->id)
                    ->orderBy('created_at', 'desc');

        // 3. Terapkan limit jika ada (Misal: ?limit=5 di Dashboard)
        if ($request->has('limit')) {
            $query->limit($request->limit);
        }

        $riwayat = $query->get();

        return response()->json([
            'success' => true,
            'message' => 'Riwayat setoran berhasil diambil',
            'data'    => $riwayat
        ]);
    }

    /**
     * Menyimpan setoran baru (Form Setor Sampah)
     */
    public function store(Request $request)
    {
        // 1. Validasi Input
        $request->validate([
            'jenis_sampah' => 'required|string',
            'berat' => 'required|numeric|min:0.1',
        ]);

        try {
            return DB::transaction(function () use ($request) {
                $user = Auth::user();
                $profile = NasabahProfile::where('user_id', $user->id)->first();

                if (!$profile) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Profil nasabah tidak ditemukan.'
                    ], 404);
                }

                // 2. Logika harga (Gunakan lowercase agar aman)
                $jenis = strtolower($request->jenis_sampah);
                $hargaPerKg = 5000;
                if ($jenis == 'kertas') $hargaPerKg = 3000;
                if ($jenis == 'logam') $hargaPerKg = 10000;

                $nominal = $request->berat * $hargaPerKg;
                $poin = floor($request->berat * 10);

                // 3. Simpan data setoran
                $setoran = Setoran::create([
                    'nasabah_profile_id' => $profile->id,
                    'jenis_sampah' => $request->jenis_sampah,
                    'berat' => $request->berat,
                    'nominal' => $nominal,
                    'poin' => $poin,
                ]);

                // 4. Update Saldo & Poin Nasabah
                $profile->increment('saldo', $nominal);
                $profile->increment('poin', $poin);

                return response()->json([
                    'success' => true,
                    'message' => 'Setoran berhasil!',
                    'data' => [
                        'id' => $setoran->id,
                        'nominal' => $nominal,
                        'poin' => $poin,
                        'saldo_baru' => (float) $profile->refresh()->saldo
                    ]
                ], 201);
            });
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error: ' . $e->getMessage()
            ], 500);
        }
    }
}
