<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Tabel Master Kategori Sampah
        Schema::create('kategori_sampah', function (Blueprint $table) {
            $table->id();
            $table->string('nama_kategori');
            $table->string('satuan')->default('kg');
            $table->decimal('harga_beli', 15, 2);
            $table->decimal('harga_jual', 15, 2);
            $table->timestamps();
        });

        // 2. Tabel Profil Nasabah (DISESUAIKAN DENGAN SEEDER)
        Schema::create('nasabah_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('nomor_telepon'); // Sudah diganti dari no_hp agar sama dengan Seeder
            $table->text('alamat');
            $table->string('latitude')->nullable();
            $table->string('longitude')->nullable();
            $table->decimal('saldo', 15, 2)->default(0);
            $table->integer('poin')->default(0); // Tambahkan kolom poin yang tadi hilang
            $table->timestamps();
        });

        // 3. Tabel Profil Staff
        Schema::create('staff_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('id_pegawai')->unique();
            $table->string('area_tugas');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Perbaikan: Hapus tabel satu per satu agar bersih
        Schema::dropIfExists('staff_profiles');
        Schema::dropIfExists('nasabah_profiles');
        Schema::dropIfExists('kategori_sampah');
    }
};
