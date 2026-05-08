"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Untuk deteksi menu aktif

export default function Sidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  // Helper untuk styling menu aktif
  const linkStyle = (path: string) => 
    `block p-3 rounded transition duration-200 ${
      pathname === path ? 'bg-green-700 font-bold' : 'hover:bg-green-700'
    }`;

  return (
    <aside className="w-64 bg-green-800 text-white min-h-screen p-5 flex flex-col hidden md:flex shadow-xl">
      {/* Logo / Judul */}
      <div className="mb-10 px-3">
        <h2 className="text-2xl font-bold tracking-tight">GreenPoint</h2>
        <p className="text-xs text-green-300">Sustainable Life</p>
      </div>
      
      {/* Menu Navigasi */}
      <nav className="space-y-2 flex-1">
        <Link href="/dashboard" className={linkStyle('/dashboard')}>
          🏠 Dashboard
        </Link>
        <Link href="/dashboard/setor" className={linkStyle('/dashboard/setor')}>
          ♻️ Setor Sampah
        </Link>
        <Link href="/dashboard/maps" className={linkStyle('/dashboard/maps')}>
          📍 Cari Bank Sampah
        </Link>
        <Link href="/dashboard/laporan" className={linkStyle('/dashboard/laporan')}>
          📋 Laporan Saya
        </Link>
      </nav>

      {/* Bagian Bawah (Logout) */}
      <div className="mt-auto pt-5 border-t border-green-700">
        <button 
            onClick={handleLogout}
            className="group w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-xl transition-all duration-300 font-bold shadow-lg flex items-center justify-center gap-2 active:scale-95"
        >
            <span>🚪</span>
            <span>Logout</span>
        </button>
        <p className="text-[10px] text-center mt-4 text-green-400 opacity-50">
          GreenPoint v1.0
        </p>
      </div>
    </aside>
  );
}