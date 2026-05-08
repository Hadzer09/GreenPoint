<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\SetoranController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// 1. Public Route (Tanpa Login)
Route::post('/login', [AuthController::class, 'login']);

// 2. Protected Routes (Wajib Login / Pakai Token)
Route::middleware('auth:sanctum')->group(function () {

    // Ambil data user login lengkap dengan profil nasabah (Saldo, Poin, dll)
    Route::get('/user', function (Request $request) {
        return $request->user()->load('nasabah');
    });

    // Ambil data statistik dashboard
    Route::get('/dashboard', [DashboardController::class, 'index']);

    // Ambil riwayat setoran (Laporan Saya)
    Route::get('/laporan', [SetoranController::class, 'index']);

    // Kirim data setoran sampah baru
    Route::post('/setoran', [SetoranController::class, 'store']);

    // Logout
    Route::post('/logout', [AuthController::class, 'logout']);

});
