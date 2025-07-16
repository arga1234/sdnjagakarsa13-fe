/* eslint-disable @typescript-eslint/no-explicit-any */
// app/qrcode/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { QRCodeCanvas } from 'qrcode.react';

export default function QRCodePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventId = searchParams.get('eventId');
  const nama = searchParams.get('nama');
  const nik = searchParams.get('nik');
  const kelas = searchParams.get('kelas');

  const [payload, setPayload] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return router.push('/check-in');
    setUser(JSON.parse(userStr));
  }, [router]);

  const handleCreate = () => {
    if (!user || !eventId) return;
    const now = new Date();
    const qrPayload = {
      userId: user.id,
      eventId,
      generatedAt: now.toISOString(),
    };
    setPayload(JSON.stringify(qrPayload));
  };

  return (
    <div className="container">
      <h1 className="title">📱✨ QR Code Absensi ✨📱</h1>

      <button onClick={handleCreate} className="btn">
        ▶️ Klik untuk buat QR Absensi
      </button>

      {payload && (
        <div className="qr-container">
          <QRCodeCanvas value={payload} size={220} />
          <p className="instruction">🎉 Tunjukkan QR ini ke petugas saat absensi!</p>
          <p style={{marginTop: '10px'}}>Atas nama {nama}, {nik}, {kelas}</p>
        </div>
      )}

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 20px;
          text-align: center;
          background: linear-gradient(45deg, #ff6ec4, #7873f5, #4ade80, #facc15);
          background-size: 400% 400%;
          animation: gradientMove 15s ease infinite;
          color: #fff;
        }
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .title {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          animation: titlePulse 2s ease-in-out infinite;
        }
        @keyframes titlePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .btn {
          background: #ffdd57;
          color: #333;
          border: none;
          padding: 12px 24px;
          font-size: 1.1rem;
          font-weight: bold;
          border-radius: 9999px;
          cursor: pointer;
          transition: background 0.3s ease, transform 0.3s ease;
          margin-bottom: 1.5rem;
        }
        .btn:hover {
          background: #ffe88f;
          transform: scale(1.05);
        }
        .qr-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: rgba(255,255,255,0.2);
          padding: 20px;
          border-radius: 20px;
          animation: popIn 0.5s ease-out;
        }
        @keyframes popIn {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .instruction {
          margin-top: 10px;
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
}
