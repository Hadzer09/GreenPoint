"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic'; // Import dynamic dari next

// 1. Load MapContainer dkk secara dinamis (tanpa SSR)
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

export default function MapsPage() {
  const [mounted, setMounted] = useState(false);
  const [L, setL] = useState<any>(null);

  useEffect(() => {
    // 2. Import Leaflet secara dinamis di dalam useEffect agar 'window' tersedia
    import('leaflet').then((leaflet) => {
      import('leaflet/dist/leaflet.css');
      setL(leaflet);
      setMounted(true);
    });
  }, []);

  if (!mounted || !L) return <div className="p-10">Memuat Peta...</div>;

  // Setup icon Leaflet
  const customIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Cari Bank Sampah</h1>
        <p className="text-gray-500">Menampilkan lokasi terdekat di Banda Aceh.</p>
      </div>

      <div className="bg-white p-2 rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="h-[500px] w-full">
          <MapContainer 
            center={[5.5482, 95.3238]} 
            zoom={13} 
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            <Marker position={[5.5482, 95.3238]} icon={customIcon}>
              <Popup>
                <div className="font-sans">
                  <h3 className="font-bold text-green-700">Bank Sampah Induk</h3>
                  <p className="text-xs">Lokasi: Banda Aceh</p>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
}