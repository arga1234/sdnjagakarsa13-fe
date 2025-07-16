'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { kisiKisiData } from '../data'; // Ubah sesuai struktur proyekmu
import { LoadingComponent } from '@/src/components';

const subjectMap: Record<string, string> = {
  pp: 'Pendidikan Pancasila',
  mtk: 'MTK',
  bIndo: 'Bahasa Indonesia',
  ipas: 'IPAS',
};

const gradientMap: Record<string, string> = {
  pp: 'linear-gradient(to right, #ffecd2, #fcb69f)',
  mtk: 'linear-gradient(to right, #a1c4fd, #c2e9fb)',
  bIndo: 'linear-gradient(to right, #fbc2eb, #a6c1ee)',
  ipas: 'linear-gradient(to right, #84fab0, #8fd3f4)',
};

interface IData {
  pp: string[];
  mtk: string[];
  bIndo: string[];
  ipas?: string[];
}

export default function KisiKisiDetailPage() {
  const params = useParams();
  const kelas = params.kelas as string;
  const data: IData = kisiKisiData[kelas];
  const [emojiListState, setEmojiListState] = useState<string[]>([]);
  const [isReady, setIsReady] = useState(false);
  const availableTabs = Object.keys(data);
  const [selectedTab, setSelectedTab] = useState<string>(availableTabs[0]);

  useEffect(() => {
    if (availableTabs.length > 0 && !availableTabs.includes(selectedTab)) {
      setSelectedTab(availableTabs[0]);
    }
  }, [availableTabs, kelas, selectedTab]);

  useEffect(() => {
    if (kisiList) {
      const emojiPool = [
        '✅',
        '📌',
        '📖',
        '✍️',
        '🔍',
        '🧠',
        '📚',
        '💡',
        '📝',
        '📘',
      ];
      const randomized = kisiList.map(() => {
        const rand = emojiPool[Math.floor(Math.random() * emojiPool.length)];
        return rand;
      });
      setEmojiListState(randomized);
    }
  }, [selectedTab, kelas]);

  const kisiList = data[selectedTab as keyof IData];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsReady(true);
    }, 300);
    return () => clearTimeout(timeout);
  }, []);

  if (!isReady) {
    return <LoadingComponent />;
  }

  if (!data) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        ❌ Data tidak ditemukan untuk kelas {kelas}
      </div>
    );
  }

  return (
    <div className="page">
      <h1 className="title">📚 Kisi-Kisi Kelas {kelas}</h1>
      <p className="subtitle">
        ✨ Tahun Ajaran Baru 2025/2026 – SDN Jagakarsa 13 Pagi
      </p>

      <div className="tab-container">
        {availableTabs.map((tab) => (
          <button
            key={tab}
            className={`tab ${selectedTab === tab ? 'active' : ''}`}
            onClick={() => setSelectedTab(tab)}
          >
            {subjectMap[tab]}
          </button>
        ))}
      </div>

      <div className="content" style={{ background: gradientMap[selectedTab] }}>
        <h2 className="tab-title">📌 Kisi-Kisi {subjectMap[selectedTab]}</h2>
        <ul className="kisi-list">
          {(kisiList || []).map((item, idx) => (
            <li key={idx} className="kisi-item">
              <span className="emoji">{emojiListState[idx] || '🔸'}</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .page {
          min-height: 100vh;
          padding: 3rem 1rem;
          background: linear-gradient(
            -45deg,
            #ffd3a5,
            #fd6585,
            #a18cd1,
            #fbc2eb
          );
          background-size: 400% 400%;
          animation: gradientMove 20s ease infinite;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

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

        .title {
          font-size: 2.5rem;
          color: #fff;
          margin-bottom: 0.5rem;
          text-align: center;
          text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
        }

        .subtitle {
          font-size: 1.2rem;
          color: #f0f0f0;
          margin-bottom: 2rem;
          text-align: center;
          max-width: 700px;
        }

        .tab-container {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .tab {
          background: #fff;
          border: none;
          border-radius: 999px;
          padding: 0.6rem 1.5rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          color: #333;
          opacity: 0.8;
        }

        .tab.active {
          background: #ffd700;
          color: #333;
          opacity: 1;
        }

        .content {
          width: 100%;
          max-width: 600px;
          padding: 2rem;
          border-radius: 1.5rem;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
          color: #333;
        }

        .tab-title {
          font-size: 1.8rem;
          margin-bottom: 1rem;
          text-align: center;
        }

        .kisi-list {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .kisi-item {
          background: rgba(255, 255, 255, 0.8);
          padding: 1rem;
          border-radius: 1rem;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
          font-size: 1.05rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .emoji {
          font-size: 1.5rem;
        }

        @media (max-width: 480px) {
          .title {
            font-size: 2rem;
          }

          .tab-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
