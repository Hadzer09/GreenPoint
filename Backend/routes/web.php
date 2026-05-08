<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Api\MasterDataController;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Rute Login
Route::post('/login', [AuthController::class, 'login']);

// Rute untuk ambil data user yang sedang login
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user()->load(['nasabah', 'staff']);
});

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/kategori-sampah', [MasterDataController::class, 'getKategori']);
Route::post('/kategori-sampah', [MasterDataController::class, 'storeKategori']);

require __DIR__.'/auth.php';
