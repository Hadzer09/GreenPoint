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
    Schema::create('setorans', function (Blueprint $table) {
        $table->id();
        $table->foreignId('nasabah_profile_id')->constrained('nasabah_profiles')->onDelete('cascade');
        $table->string('jenis_sampah');
        $table->decimal('berat', 8, 2);
        $table->decimal('nominal', 15, 2);
        $table->integer('poin')->default(0); // <--- TAMBAHKAN BARIS INI
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('setorans');
    }
};
