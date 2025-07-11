'use client';

import { LoadingComponent } from '@/src/components';
import React, { useEffect, useState } from 'react';

export default function InformasiJadwalPage() {
  const jadwal = [
    {
      tanggal: '9–11 Juli',
      kegiatan: '📥 Pendaftaran',
      waktu: 'Sepanjang hari',
      gradient: 'linear-gradient(to right, #ffecd2, #fcb69f)',
    },
    {
      tanggal: '14 Juli',
      kegiatan: '📣 Pengarahan kepada calon murid',
      waktu: '10.00 WIB',
      gradient: 'linear-gradient(to right, #a1c4fd, #c2e9fb)',
    },
    {
      tanggal: '15 Juli',
      kegiatan: '📝 Ujian Seleksi',
      waktu: '10.00–12.00 WIB',
      gradient: 'linear-gradient(to right, #fbc2eb, #a6c1ee)',
    },
    {
      tanggal: '17 Juli',
      kegiatan: '📢 Pengumuman Hasil Seleksi',
      waktu: '10.00 WIB',
      gradient: 'linear-gradient(to right, #84fab0, #8fd3f4)',
    },
    {
      tanggal: '18 & 21 Juli',
      kegiatan: '🗂️ Daftar Ulang',
      waktu: '08.00–15.00 WIB',
      gradient: 'linear-gradient(to right, #fccb90, #d57eeb)',
    },
    {
      tanggal: '22 Juli',
      kegiatan: '🎉 Mutasi Berakhir',
      waktu: 'Sampai tahun ajaran baru',
      gradient: 'linear-gradient(to right,rgb(95, 163, 120),rgb(75, 130, 174))',
    },
  ];

    const [isReady, setIsReady] = useState(false);
  
    useEffect(() => {
      const timeout = setTimeout(() => {
        setIsReady(true);
      }, 300);
      return () => clearTimeout(timeout);
    }, []);
  
    if (!isReady) {
      return (
        <LoadingComponent />
      );
    }

  return (
    <div className="page">
      <h1 className="title">📅 Jadwal Pelaksanaan Mutasi</h1>
      <p className="subtitle">✨ SDN Jagakarsa 13 Pagi – Tahun Ajaran Baru 2025/2026 🎓</p>

      <div className="card-list">
        {jadwal.map((item, idx) => (
          <div
            className="card"
            key={idx}
            style={{
              background: item.gradient,
              animationDelay: `${idx * 0.2}s`,
            }}
          >
            <div className="emoji">{item.kegiatan.split(' ')[0]}</div>
            <div className="kegiatan">{item.kegiatan.replace(/^[^\s]+\s/, '')}</div>
            <div className="divider" />
            <div className="info">
              <span className="badge">📆 {item.tanggal}</span>
              <span className="badge time">⏰ {item.waktu}</span>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes fadeSlideUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .page {
          min-height: 100vh;
          padding: 3rem 1rem;
          background: linear-gradient(-45deg, #ff9a9e, #fad0c4, #a18cd1, #fbc2eb);
          background-size: 400% 400%;
          animation: gradientMove 20s ease infinite;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .title {
          font-size: 2.8rem;
          color: #fff;
          text-align: center;
          margin-bottom: 0.5rem;
          text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
        }

        .subtitle {
          font-size: 1.2rem;
          color: #f9f9f9;
          text-align: center;
          max-width: 700px;
          margin-bottom: 2rem;
          text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
        }

        .card-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          width: 100%;
          max-width: 1000px;
        }

        .card {
          border-radius: 1.5rem;
          padding: 2rem 1.5rem;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #333;
          text-align: center;
          backdrop-filter: blur(4px);
          animation: fadeSlideUp 0.6s ease both;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .card:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
        }

        .emoji {
          font-size: 3.5rem;
          margin-bottom: 0.8rem;
        }

        .kegiatan {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }

        .divider {
          width: 50px;
          height: 4px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 999px;
          margin: 0.5rem 0 1rem;
        }

        .info {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .badge {
          background: rgba(255, 255, 255, 0.85);
          color: #333;
          padding: 0.5rem 1rem;
          border-radius: 999px;
          font-weight: 600;
          font-size: 0.95rem;
          backdrop-filter: blur(2px);
        }

        .badge.time {
          background: rgba(255, 255, 255, 0.7);
        }

        @media (max-width: 480px) {
          .title {
            font-size: 2rem;
          }

          .kegiatan {
            font-size: 1.2rem;
          }

          .emoji {
            font-size: 2.7rem;
          }
        }
      `}</style>
    </div>
  );
}
