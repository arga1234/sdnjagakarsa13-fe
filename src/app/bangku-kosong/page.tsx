'use client';

import { LoadingComponent } from '@/src/components';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function InformasiBangkuKosongPage() {
  const bangku: {
    kelas: string;
    kosong: number;
    total: number;
    isInconfirmation?: boolean;
  }[] = [
    { kelas: 'Kelas 1️⃣', kosong: 0, total: 64 },
    { kelas: 'Kelas 2️⃣', kosong: 1, total: 32 },
    { kelas: 'Kelas 3️⃣', kosong: 2, total: 64 },
    { kelas: 'Kelas 4️⃣', kosong: 2, total: 64 },
    { kelas: 'Kelas 5️⃣', kosong: 0, total: 32 },
    { kelas: 'Kelas 6️⃣', kosong: 1, total: 32 },
  ];

  const warnaCard = [
    '#ffe0e9',
    '#d0f4de',
    '#e0f7fa',
    '#fff5ba',
    '#e8eaf6',
    '#f3e5f5',
  ];

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsReady(true);
    }, 300);
    return () => clearTimeout(timeout);
  }, []);

  if (!isReady) {
    return <LoadingComponent />;
  }

  return (
    <div className="page">
      <h1 className="title">🪑 Info Bangku Kosong</h1>
      <p className="subtitle">
        🎒 SDN Jagakarsa 13 Pagi – Tahun Ajaran Baru 📚
      </p>

      <div className="card-list">
        {bangku.map((item, idx) => {
          const penuh = item.kosong === 0;
          const onConfirmation = item?.isInconfirmation;
          const statusEmoji = onConfirmation
            ? 'Sedang Dikonfirmasi 🙏'
            : penuh
              ? '❌ Penuh 😢'
              : '✅ Tersedia 🎉';
          const statusBg = penuh ? '#ff4d4f' : '#52c41a';
          const bg = warnaCard[idx % warnaCard.length];

          return (
            <div
              className="card fade-in"
              key={idx}
              style={{ backgroundColor: bg, animationDelay: `${idx * 0.2}s` }}
            >
              <div className="emoji">{item.kelas}</div>
              <div className="content">
                <div className="info-line">
                  💺 <strong>Total Kursi:</strong> {item.total}
                </div>
                <div className="info-line">
                  {onConfirmation
                    ? 'Mohon menunggu 🫶'
                    : penuh
                      ? '🚫 Tidak ada kursi kosong'
                      : `🟢 Kursi kosong: ${item.kosong}`}
                </div>
              </div>
              <div className="status" style={{ backgroundColor: statusBg }}>
                {statusEmoji}
              </div>
              {!penuh && (
                <Link href="/registrasi-peserta-mutasi">
                  <button className="cta-btn">📝 Daftar Sekarang</button>
                </Link>
              )}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes bgShift {
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
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .page {
          min-height: 100vh;
          padding: 2rem 1rem;
          background: linear-gradient(
            -45deg,
            #ff9a9e,
            #fad0c4,
            #a1c4fd,
            #c2e9fb
          );
          background-size: 400% 400%;
          animation: bgShift 15s ease infinite;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .title {
          font-size: 2.6rem;
          text-align: center;
          color: white;
          text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
        }

        .subtitle {
          font-size: 1.1rem;
          margin-bottom: 2rem;
          color: #f0f0f0;
          text-align: center;
        }

        .card-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.5rem;
          width: 100%;
          max-width: 1000px;
        }

        .card {
          border-radius: 1.5rem;
          padding: 1.8rem 1.4rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          text-align: center;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: fadeSlideUp 0.6s ease forwards;
          opacity: 0;
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }

        .card:hover {
          transform: scale(1.03);
          box-shadow: 0 16px 30px rgba(0, 0, 0, 0.15);
        }

        .emoji {
          font-size: 2.2rem;
          margin-bottom: 0.5rem;
          color: white;
          font-weight: bold;
        }

        .content {
          font-size: 1rem;
          color: #222;
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.6);
          margin-bottom: 1rem;
        }

        .info-line {
          margin: 0.4rem 0;
        }

        .status {
          font-size: 0.95rem;
          font-weight: bold;
          padding: 0.5rem 1rem;
          color: white;
          border-radius: 999px;
          margin-bottom: 1rem;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }

        .cta-btn {
          padding: 0.6rem 1.2rem;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 999px;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.3s ease;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        .cta-btn:hover {
          background: #0056b3;
        }

        @media (max-width: 480px) {
          .title {
            font-size: 2rem;
          }

          .card {
            padding: 1.3rem;
          }

          .cta-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
