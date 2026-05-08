"use client";
import { useEffect, useState } from 'react';

interface DashboardStats {
    total_sampah: number;
    total_pendapatan: number;
    poin_eco: number;
    saldo: number;
    nama_nasabah: string;
}

interface Setoran {
    id: number;
    created_at: string;
    jenis_sampah: string;
    berat: number;
    nominal: number;
}

export default function DashboardPage() {
    const [stats, setStats] = useState<DashboardStats | null>(null); 
    const [recentSetoran, setRecentSetoran] = useState<Setoran[]>([]); // State untuk tabel
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers = {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                };

                // 1. Ambil Stats Dashboard
                const resStats = await fetch('http://127.0.0.1:8000/api/dashboard', { headers });
                const jsonStats = await resStats.json();
                if (jsonStats.success) setStats(jsonStats.data);

                // 2. Ambil 5 Laporan Terakhir
                const resLaporan = await fetch('http://127.0.0.1:8000/api/laporan', { headers });
                const jsonLaporan = await resLaporan.json();
                if (jsonLaporan.success) {
                    // Ambil 5 data teratas saja
                    setRecentSetoran(jsonLaporan.data.slice(0, 5));
                }

            } catch (error) {
                console.error("Gagal ambil data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    if (loading) return <div className="p-8 font-bold text-green-700 animate-pulse">Menghubungkan ke server...</div>;
    if (!stats) return <div className="p-8 text-red-500">Gagal memuat statistik. Pastikan login ulang!</div>;

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Halo, {stats.nama_nasabah}!</h1>
            <p className="text-gray-500 mb-6">Data ini diambil langsung dari database.</p>
            
            {/* GRID KARTU STATISTIK */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-green-500">
                    <p className="text-gray-500 text-sm">Sampah Hari Ini</p>
                    <h3 className="text-3xl font-bold">{stats.total_sampah} kg</h3>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-500">
                    <p className="text-gray-500 text-sm">Pendapatan Hari Ini</p>
                    <h3 className="text-3xl font-bold">
                        Rp {new Intl.NumberFormat('id-ID').format(stats.total_pendapatan)}
                    </h3>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-emerald-500">
                    <p className="text-gray-500 text-sm">Saldo Saat Ini</p>
                    <h3 className="text-3xl font-bold text-emerald-600">
                        Rp {new Intl.NumberFormat('id-ID').format(stats.saldo)}
                    </h3>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-yellow-500">
                    <p className="text-gray-500 text-sm">Poin Eco</p>
                    <h3 className="text-3xl font-bold">{stats.poin_eco} pts</h3>
                </div>
            </div>

            {/* TABEL SETORAN TERAKHIR (BIAR GAK KOSONG) */}
            <div className="mt-10 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-800">Setoran Terakhir</h3>
                    <a href="/dashboard/laporan" className="text-sm text-green-600 font-semibold hover:underline">Lihat Semua</a>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-gray-400 text-sm border-b uppercase tracking-wider">
                                <th className="pb-3 font-semibold">Tanggal</th>
                                <th className="pb-3 font-semibold">Jenis</th>
                                <th className="pb-3 font-semibold">Berat</th>
                                <th className="pb-3 font-semibold">Nominal</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm">
                            {recentSetoran.length > 0 ? (
                                recentSetoran.map((item) => (
                                    <tr key={item.id} className="border-b last:border-0 hover:bg-gray-50 transition">
                                        <td className="py-4">
                                            {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                        </td>
                                        <td className="py-4">
                                            <span className="bg-gray-100 px-2 py-1 rounded text-[10px] font-bold">
                                                {item.jenis_sampah}
                                            </span>
                                        </td>
                                        <td className="py-4 font-bold text-gray-800">{item.berat} kg</td>
                                        <td className="py-4 text-green-600 font-bold">
                                            Rp {new Intl.NumberFormat('id-ID').format(item.nominal)}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="py-10 text-center text-gray-400">Belum ada aktivitas setoran.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}