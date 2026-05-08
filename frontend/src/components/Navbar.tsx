"use client";
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [saldo, setSaldo] = useState(0);
  const [nama, setNama] = useState("");

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://127.0.0.1:8000/api/dashboard', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const json = await res.json();
      if (json.success) {
        setSaldo(json.data.saldo);
        setNama(json.data.nama_nasabah);
      }
    } catch (e) { console.log(e); }
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center px-8">
      <span className="font-semibold text-gray-700">Halo, {nama}!</span>
      <div className="bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-bold border border-green-200">
        Saldo: Rp {new Intl.NumberFormat('id-ID').format(saldo)}
      </div>
    </header>
  );
}