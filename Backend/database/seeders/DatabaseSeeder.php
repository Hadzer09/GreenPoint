<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
// Hapus import User yang tidak dipakai di sini

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Panggil UserSeeder yang sudah kita perbaiki tadi
        $this->call([
            UserSeeder::class,
        ]);
    }
}
