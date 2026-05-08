<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\NasabahProfile;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Buat User Nasabah (Akun Login)
        $user = User::create([
            'name'     => 'Hafidz Muyassar',
            'email'    => 'hafidz@test.com',
            'password' => Hash::make('password123'),
            'role'     => 'nasabah',
        ]);

        // 2. Buat Profil Nasabah (Saldo & Poin)
        // Kita simpan ke variabel $nasabah agar bisa dipakai di bawahnya
        $nasabah = NasabahProfile::create([
            'user_id'       => $user->id,
            'alamat'        => 'Jl. Banda Aceh',
            'nomor_telepon' => '08123456789',
            'saldo'         => 45000, // Kita set 45rb biar sesuai dashboard
            'poin'          => 150
        ]);

        // 3. Buat Data Setoran (Riwayat Sampah)
        // Sekarang variabel $nasabah sudah ada, jadi kodenya tidak akan error
        $nasabah->setoran()->createMany([
            [
                'berat'         => 5.5,
                'nominal'       => 20000,
                'poin'          => 55, // Jangan lupa poin diisi juga
                'jenis_sampah'  => 'Plastik',
                'created_at'    => now(),
            ],
            [
                'berat'         => 7.0,
                'nominal'       => 25000,
                'poin'          => 70,
                'jenis_sampah'  => 'Kertas',
                'created_at'    => now(),
            ],
        ]);
    }
}
