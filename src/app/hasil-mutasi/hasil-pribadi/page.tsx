'use client';

import './style.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LoadingComponent } from '@/src/components';

type HasilMutasi = {
  nama: string;
  kelasTujuan: string;
  is_lulus: boolean;
};

export default function HasilMutasiPribadi() {
  const [countdown, setCountdown] = useState(3);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<HasilMutasi | null>(null);

  useEffect(() => {
    const hasil = localStorage.getItem('hasil-mutasi');
    if (hasil) setData(JSON.parse(hasil));
    setTimeout(() => setLoading(false), 500);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimeout(() => setShowResult(true), 500);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page">
      {loading ? (
        <LoadingComponent />
      ) : !showResult ? (
        <div className="countdown">{countdown}</div>
      ) : data ? (
        <div className="card">
          <div className="emoji">{data.is_lulus ? '🎉' : '😢'}</div>
          <div className="title">
            {data.is_lulus
              ? `Selamat ${data.nama.toUpperCase()}!`
              : `Mohon Maaf ${data.nama.toUpperCase()}`}
          </div>
          <div className="subtitle">
            {data.is_lulus
              ? `Kamu diterima di kelas ${data.kelasTujuan}`
              : 'Belum diterima di SDN Jagakarsa 13 Pagi'}
          </div>
          {data.is_lulus && (
            <div className="school-name">
              {data.kelasTujuan} SDN Jagakarsa 13 Pagi 🏫
            </div>
          )}
          <Link href="/hasil-mutasi/detail" className="btn-link">
            📄 Detail Penilaian
          </Link>
        </div>
      ) : (
        <p className="subtitle">Data tidak ditemukan.</p>
      )}
    </div>
  );
}
