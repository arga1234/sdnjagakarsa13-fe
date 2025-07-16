/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { SelectField } from '@/src/components/fieldv2';
import { LoadingComponent } from '@/src/components';

interface FeedbackItem {
  id: string;
  nama: string;
  kesan?: string;
  pesan?: string;
  rating: number;
  likedBy?: number;
}

export default function FeedbackListPage() {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [filterType, setFilterType] = useState<'all' | 'terbaru' | 'terlama'>(
    'all',
  );
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const pageSize = 5;
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsReady(true), 300);
    return () => clearTimeout(timeout);
  }, []);

  const fetchFeedback = async () => {
    setIsLoading(true);
    try {
      const q = new URLSearchParams({
        sort: filterType,
        rating: filterRating?.toString() || '',
        page: page.toString(),
        limit: pageSize.toString(),
      });
      const res = await fetch(`/api/kesan-pesan/daftar?${q.toString()}`);
      const data = await res.json();
      setFeedbacks(data.feedbacks);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, [filterType, filterRating, page]);

  const cardGradients = useMemo(() => {
    const colors = [
      ['#ff9a9e', '#fad0c4'],
      ['#a18cd1', '#fbc2eb'],
      ['#fbc2eb', '#a6c1ee'],
      ['#f6d365', '#fda085'],
      ['#fdcbf1', '#e6dee9'],
      ['#a1c4fd', '#c2e9fb'],
      ['#667eea', '#764ba2'],
    ];
    return feedbacks.map(() => {
      const [s, e] = colors[Math.floor(Math.random() * colors.length)];
      return `linear-gradient(135deg, ${s}, ${e})`;
    });
  }, [feedbacks]);

  const toggleLike = async (idx: number) => {
    setFeedbacks((prev) => {
      const fb = { ...prev[idx] } as any;
      const isLiking = !fb.likedByActive;
      fb.likedBy = (fb.likedBy || 0) + (isLiking ? 1 : -1);
      fb.likedByActive = isLiking;
      const copy = [...prev];
      copy[idx] = fb;
      return copy;
    });
    const fb = feedbacks[idx] as any;
    const formData = new FormData();
    formData.append('action', fb.likedByActive ? 'dislike' : 'like');
    try {
      await fetch(`/api/kesan-pesan/like/${fb.id}`, {
        method: 'POST',
        body: formData,
      });
    } catch {
      fetchFeedback();
    }
  };

  const hasMore = feedbacks.length === pageSize;

  if (!isReady) return <LoadingComponent />;

  return (
    <div className="fun-page">
      <div className="header">
        <h2 style={{ marginBottom: '5px' }}>
          🎉 <b>Kesan & Pesan</b> 🥳
        </h2>
        <p>📬 Pra MPLS SDN Jagakarsa 13 Pagi 🎈</p>
      </div>

      <div className="filters">
        <SelectField
          label=""
          name="filterType"
          icon="🎭"
          options={[
            { label: '🌈 Semua', value: 'all' },
            { label: '😻 Terbaru', value: 'terbaru' },
            { label: '💌 Terlama', value: 'terlama' },
            { label: '🥳 Terpopuler', value: 'populer' },
          ]}
          onChange={(e) => {
            setPage(1);
            setFilterType(e.target.value as any);
          }}
          customMarginBottom="15px"
          placeholder="Sortir"
        />
        <SelectField
          label=""
          name="filterRating"
          icon="⭐"
          options={[
            { label: '✨ Semua', value: '' },
            ...[1, 2, 3, 4, 5].map((v) => ({
              label: '⭐'.repeat(v),
              value: v.toString(),
            })),
          ]}
          onChange={(e) => {
            setPage(1);
            setFilterRating(e.target.value ? parseInt(e.target.value) : null);
          }}
          customMarginBottom="15px"
          placeholder="Rating"
        />
      </div>

      {isLoading ? (
        <LoadingComponent />
      ) : feedbacks.length === 0 ? (
        <div className="empty-state">😔 Belum ada feedback...</div>
      ) : (
        <div className="feedback-list">
          {feedbacks.map((fb, i) => {
            const active = !!(fb as any).likedByActive;
            return (
              <div
                key={fb.id}
                className="feedback-card"
                style={{ background: cardGradients[i] }}
              >
                <div className="card-header">
                  <span className="avatar">
                    {
                      [
                        '👧',
                        '👦',
                        '🧒',
                        '👩‍🦰',
                        '👨‍🦱',
                        '👩‍🎓',
                        '👨‍🎓',
                        '🧑‍🎤',
                        '🧑‍🎨',
                        '🧑‍🚀',
                        '🧑‍🔬',
                      ][i % 11]
                    }
                  </span>
                  <div className="card-nama">{fb.nama || 'Anonim'}</div>
                </div>

                {fb.kesan && (
                  <div className="card-section">
                    <div className="card-label">🎨 Kesan</div>
                    <div className="card-content">“{fb.kesan}”</div>
                  </div>
                )}

                {fb.pesan && (
                  <div className="card-section">
                    <div className="card-label">💌 Pesan</div>
                    <div className="card-content">“{fb.pesan}”</div>
                  </div>
                )}

                <div className="card-rating">
                  <span className="rating-badge">⭐ {fb.rating}</span>
                  <span className="rating-stars">{'⭐'.repeat(fb.rating)}</span>
                </div>

                <button
                  className={active ? 'like-btn active' : 'like-btn'}
                  onClick={() => toggleLike(i)}
                >
                  👍
                </button>
                {typeof fb.likedBy === 'number' && fb.likedBy > 0 && (
                  <div className="like-count">
                    Disukai sebanyak {fb.likedBy} kali
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="pagination">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          ⬅️ Kembali
        </button>
        <span>📄 Halaman {page}</span>
        <button onClick={() => setPage((p) => p + 1)} disabled={!hasMore}>
          Lanjut ➡️
        </button>
      </div>

      <style jsx>{`
        .fun-page {
          display: flex;
          flex-direction: column;
          height: 100dvh;
          padding: 10px 20px;
          background: linear-gradient(
            -45deg,
            #ffecd2,
            #fcb69f,
            #a1c4fd,
            #c2e9fb
          );
          background-size: 600% 600%;
          animation: rainbowFlow 15s ease infinite;
          color: #444;
        }
        @keyframes rainbowFlow {
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
        .header {
          text-align: center;
          margin-bottom: 5px;
          animation: pop 1s ease;
        }
        @keyframes pop {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .filters {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 0px;
        }
        .feedback-list {
          display: grid;
          flex: 1;
          overflow-y: auto;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }
        .feedback-card {
          position: relative;
          padding: 16px;
          border-radius: 20px;
          color: #333;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          animation: bounceIn 0.6s ease;
          transition: transform 0.2s;
        }
        .feedback-card:hover {
          transform: scale(1.03);
        }
        @keyframes bounceIn {
          0% {
            transform: scale(0.9);
            opacity: 0;
          }
          60% {
            transform: scale(1.05);
            opacity: 1;
          }
          100% {
            transform: scale(1);
          }
        }
        .card-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }
        .avatar {
          font-size: 32px;
        }
        .card-nama {
          font-size: 20px;
          font-weight: bold;
          color: #fff;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
        }
        .card-section {
          background: rgba(255, 255, 255, 0.85);
          padding: 10px 14px;
          border-radius: 12px;
          margin-bottom: 10px;
          box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.05);
        }
        .card-label {
          font-weight: bold;
          color: #ff69b4;
          margin-bottom: 4px;
        }
        .card-content {
          font-style: italic;
          font-size: 15px;
        }
        .card-rating {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 12px;
          font-size: 14px;
          background: rgba(255, 255, 255, 0.7);
          padding: 6px 10px;
          border-radius: 10px;
        }
        .rating-badge {
          background: #ffcc00;
          color: #000;
          padding: 4px 10px;
          border-radius: 8px;
          font-weight: bold;
        }
        .rating-stars {
          font-size: 16px;
        }
        .like-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(255, 255, 255, 0.8);
          border: none;
          font-size: 20px;
          padding: 6px;
          border-radius: 50%;
          cursor: pointer;
          transition:
            transform 0.2s,
            background 0.2s;
        }
        .like-btn.active {
          background: #ff69b4;
          color: #fff;
          transform: scale(1.2);
        }
        .like-count {
          margin-top: 8px;
          font-size: 13px;
          color: #333;
        }
        .empty-state {
          text-align: center;
          font-size: 18px;
          padding: 40px;
          color: #666;
        }
        .pagination {
          position: sticky;
          bottom: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 16px;
          background: rgba(255, 255, 255, 0.9);
          padding: 16px;
          border-radius: 12px;
        }
        .pagination button {
          background-color: #ff69b4;
          color: #fff;
          font-weight: bold;
          border: none;
          padding: 10px 16px;
          border-radius: 12px;
          cursor: pointer;
        }
        .pagination button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
        .pagination span {
          font-size: 16px;
        }
      `}</style>
    </div>
  );
}
