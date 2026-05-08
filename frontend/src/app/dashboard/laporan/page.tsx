"use client";

import { useEffect, useState } from "react";

interface Setoran {
  id: number;
  created_at: string;
  jenis_sampah: string; // Sesuaikan dengan kolom di DB kamu
  berat: number;
  nominal: number;
  status: string;
}

export default function LaporanPage() {
  const [laporan, setLaporan] = useState<Setoran[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLaporan = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://127.0.0.1:8000/api/laporan", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        if (json.success) {
          setLaporan(json.data);
        }
      } catch (error) {
        console.error("Gagal ambil laporan:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLaporan();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Laporan Setoran</h1>
        <p className="text-gray-500">Riwayat lengkap aktivitas setoran sampahmu.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 font-bold text-gray-600">Tanggal</th>
              <th className="p-4 font-bold text-gray-600">Kategori</th>
              <th className="p-4 font-bold text-gray-600">Berat</th>
              <th className="p-4 font-bold text-gray-600">Pendapatan</th>
              <th className="p-4 font-bold text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="p-10 text-center text-gray-400">Memuat data...</td></tr>
            ) : laporan.length > 0 ? (
              laporan.map((item) => (
                <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                  <td className="p-4 text-sm text-gray-700">
                    {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                      {item.jenis_sampah || 'Umum'}
                    </span>
                  </td>
                  <td className="p-4 text-sm font-semibold">{item.berat} kg</td>
                  <td className="p-4 text-sm text-green-600 font-bold">
                    Rp {new Intl.NumberFormat('id-ID').format(item.nominal)}
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-bold uppercase">
                      Berhasil
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={5} className="p-10 text-center text-gray-400">Belum ada riwayat setoran.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}