'use client';

import { LoadingComponent } from '@/src/components';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function KisiKisiUjianPage() {
  const kisiKisi = [
    {
      kelas: '2',
      emoji: '📚',
      gradient: 'linear-gradient(to right, #ffecd2, #fcb69f)',
    },
    {
      kelas: '3',
      emoji: '✏️',
      gradient: 'linear-gradient(to right, #a1c4fd, #c2e9fb)',
    },
    {
      kelas: '4',
      emoji: '📖',
      gradient: 'linear-gradient(to right, #fbc2eb, #a6c1ee)',
    },
    {
      kelas: '6',
      emoji: '🧠',
      gradient: 'linear-gradient(to right, #84fab0, #8fd3f4)',
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
    return <LoadingComponent />;
  }

  return (
    <div className="page">
      <h1 className="title">📝 Kisi-Kisi Ujian Mutasi</h1>
      <p className="subtitle">
        📌 SDN Jagakarsa 13 Pagi – Tahun Ajaran 2025/2026
      </p>

      <div className="card-list">
        {kisiKisi.map((item, idx) => (
          <div
            key={idx}
            className="card"
            style={{
              background: item.gradient,
              animationDelay: `${idx * 0.2}s`,
            }}
          >
            <div className="emoji">{item.emoji}</div>
            <div className="kelas">Kelas {item.kelas}</div>
            <div className="divider" />
            <Link href={`/kisi-kisi/${item.kelas}`}>
              {' '}
              <span className="detail-button">🔍 Lihat Kisi-kisi</span>
            </Link>
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
          background: linear-gradient(
            -45deg,
            #ff9a9e,
            #fad0c4,
            #a18cd1,
            #fbc2eb
          );
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
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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
          text-align: center;
          animation: fadeSlideUp 0.6s ease both;
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }

        .card:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
        }

        .emoji {
          font-size: 3.5rem;
          margin-bottom: 0.8rem;
        }

        .kelas {
          font-size: 1.6rem;
          font-weight: bold;
          color: #333;
        }

        .divider {
          width: 50px;
          height: 4px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 999px;
          margin: 1rem 0;
        }

        .detail-button {
          background: #ffffffcc;
          border: none;
          color: #333;
          padding: 0.6rem 1.2rem;
          border-radius: 999px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .detail-button:hover {
          background: #ffffff;
        }

        @media (max-width: 480px) {
          .title {
            font-size: 2rem;
          }

          .kelas {
            font-size: 1.3rem;
          }

          .emoji {
            font-size: 2.7rem;
          }
        }
      `}</style>
    </div>
  );
}
