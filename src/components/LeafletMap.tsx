/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Atur default icon secara manual (wajib untuk Next.js atau Vite)
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface LeafletMapProps {
  onSetPosition: (lat: number, lng: number) => void;
}

export default function LeafletMap({ onSetPosition }: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    // Pastikan map hanya di-inisialisasi sekali
    if (!mapRef.current || leafletMapRef.current) return;

    // Inisialisasi map
    const map = L.map(mapRef.current).setView([0, 0], 2);
    leafletMapRef.current = map;

    // Tambahkan tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    // Buat marker draggable kosong
    const marker = L.marker([0, 0], { draggable: true }).addTo(map);
    markerRef.current = marker;

    // Saat marker digeser, update posisi ke parent
    marker.on('dragend', () => {
      const { lat, lng } = marker.getLatLng();
      onSetPosition(lat, lng);
    });

    // Ambil lokasi device
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;

        map.setView([latitude, longitude], 16);
        marker.setLatLng([latitude, longitude]);
        onSetPosition(latitude, longitude);
      },
      (err) => {
        alert('Gagal mengambil lokasi: ' + err.message);
      },
    );
  }, [onSetPosition]);

  return <div ref={mapRef} style={{ height: '300px', width: '100%' }} />;
}
