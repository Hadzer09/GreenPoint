<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Setoran;
use App\Models\NasabahProfile;
use Carbon\Carbon; // Pastikan import Carbon untuk urusan waktu

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $profile = NasabahProfile::where('user_id', $user->id)->first();

        if (!$profile) {
            return response()->json(['success' => false, 'message' => 'Profil tidak ditemukan'], 404);
        }

        // --- LOGIKA RISET HARIAN (Reset setiap jam 00:00) ---

        // Kita hitung TOTAL SAMPAH hanya untuk hari ini saja
        $totalSampahHariIni = Setoran::where('nasabah_profile_id', $profile->id)
            ->whereDate('created_at', Carbon::today()) // Hanya ambil data tanggal hari ini
            ->sum('berat');

        // Kita hitung TOTAL PENDAPATAN hanya untuk hari ini saja
        $totalPendapatanHariIni = Setoran::where('nasabah_profile_id', $profile->id)
            ->whereDate('created_at', Carbon::today()) // Hanya ambil data tanggal hari ini
            ->sum('nominal');

        // --- DATA TETAP (TIDAK DIRESET) ---
        $saldoTotal = $profile->saldo;
        $poinTotal  = $profile->poin;

        return response()->json([
            'success' => true,
            'data' => [
                // Ini akan otomatis jadi 0 pas ganti hari
                'total_sampah'     => (float) ($totalSampahHariIni ?? 0),
                'total_pendapatan' => (float) ($totalPendapatanHariIni ?? 0),

                // Ini tetap akumulasi total
                'poin_eco'         => (int)   $poinTotal,
                'saldo'            => (float) $saldoTotal,
                'nama_nasabah'     => $user->name,
            ]
        ]);
    }
}
