"use client";
import { useState } from 'react';

export default function SetorSampah() {
    const [jenis, setJenis] = useState('Plastik');
    const [berat, setBerat] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => { // Perbaikan tipe event
        e.preventDefault();
        setLoading(true);

        const token = localStorage.getItem('token');
        
        // Cek apakah token ada, kalau tidak ada suruh login dulu
        if (!token) {
            alert("Sesi berakhir, silakan login kembali.");
            setLoading(false);
            return;
        }

        try {
            // Gunakan 127.0.0.1 karena lebih stabil dibanding localhost di beberapa OS
            const res = await fetch('http://127.0.0.1:8000/api/setoran', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json', // Tambahkan ini agar Laravel tahu kita minta JSON
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ 
                    jenis_sampah: jenis, 
                    berat: parseFloat(berat) // Pastikan berat terkirim sebagai angka
                })
            });

            const data = await res.json();

            if (res.ok && data.success) {
                alert("Berhasil setor sampah!");
                setBerat('');
            } else {
                // Menampilkan pesan error spesifik dari Laravel (misal: Profil tidak ditemukan)
                alert("Gagal: " + (data.message || "Terjadi kesalahan server"));
            }
        } catch (error) {
            console.error("Error Detail:", error);
            alert("Koneksi gagal! Pastikan backend Laravel sudah jalan (php artisan serve)");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Setor Sampah Baru</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md max-w-md">
                <div className="mb-4">
                    <label className="block mb-2 font-semibold">Jenis Sampah</label>
                    <select 
                        value={jenis} 
                        onChange={(e) => setJenis(e.target.value)}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    >
                        <option value="Plastik">Plastik (Rp 5.000/kg)</option>
                        <option value="Kertas">Kertas (Rp 3.000/kg)</option>
                        <option value="Logam">Logam (Rp 10.000/kg)</option>
                    </select>
                </div>
                <div className="mb-6">
                    <label className="block mb-2 font-semibold">Berat (kg)</label>
                    <input 
                        type="number" 
                        step="0.1"
                        value={berat}
                        onChange={(e) => setBerat(e.target.value)}
                        placeholder="Contoh: 2.5"
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                        required
                    />
                </div>
                <button 
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 rounded-lg font-bold text-white transition ${
                        loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
                    }`}
                >
                    {loading ? 'Memproses...' : 'Kirim Setoran'}
                </button>
            </form>
        </div>
    );
}