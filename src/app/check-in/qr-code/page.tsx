/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { QRCodeCanvas } from 'qrcode.react';
import { TextField } from '@/src/components/fieldv2';

export default function QRCodePage() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get('eventId');
  const nama = searchParams.get('nama');
  const nik = searchParams.get('nik');
  const kelas = searchParams.get('kelas');

  const [agama, setAgama] = useState('');
  const [payload, setPayload] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agama.length || agama.length < 3) {
      alert('Agama harus diisi minimal 3 karakter.');
      return;
    }

    if (!nik || !agama || !eventId) {
      setErrorMsg('NIK, agama, dan event ID harus tersedia.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/checkin/masuk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nik, agama }), // ✅ hanya nik & agama
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data.error || 'Gagal check-in');
        setLoading(false);
        return;
      }

      const savedUser = { id: data.id, nik, agama };
      localStorage.setItem('user', JSON.stringify(savedUser));
      setUser(savedUser);

      const qrPayload = {
        userId: data.id,
        eventId,
        generatedAt: new Date().toISOString(),
      };
      setPayload(JSON.stringify(qrPayload));
    } catch (error) {
      console.error(error);
      setErrorMsg('Terjadi kesalahan saat check-in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">📱✨ QR Code Absensi ✨📱</h1>

      {user && (
        <form onSubmit={handleSubmit} className="form">
          <TextField label={'Agama'} name={'agama'} onChange={setAgama} />

          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Menyimpan...' : '✅ Submit dan Generate QR'}
          </button>

          {errorMsg && <p className="error">{errorMsg}</p>}
        </form>
      )}

      {user && payload && (
        <div className="qr-container">
          <QRCodeCanvas value={payload} size={220} />
          <p className="instruction">
            🎉 Tunjukkan QR ini ke petugas saat absensi!
          </p>
          <p style={{ marginTop: '10px' }}>
            Atas nama {nama}, {nik}, kelas {kelas}
          </p>
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
          background: linear-gradient(
            45deg,
            #ff6ec4,
            #7873f5,
            #4ade80,
            #facc15
          );
          background-size: 400% 400%;
          animation: gradientMove 15s ease infinite;
          color: #fff;
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
          margin-bottom: 1rem;
          animation: titlePulse 2s ease-in-out infinite;
        }
        @keyframes titlePulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
        .form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
          width: 100%;
          max-width: 400px;
          text-align: left;
        }
        .form input {
          padding: 10px;
          border-radius: 8px;
          border: none;
          font-size: 1rem;
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
          transition:
            background 0.3s ease,
            transform 0.3s ease;
        }
        .btn:hover {
          background: #ffe88f;
          transform: scale(1.05);
        }
        .qr-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: rgba(255, 255, 255, 0.2);
          padding: 20px;
          border-radius: 20px;
          animation: popIn 0.5s ease-out;
        }
        @keyframes popIn {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .instruction {
          margin-top: 10px;
          font-size: 1rem;
        }
        .error {
          color: #ffdddd;
          background: rgba(255, 0, 0, 0.3);
          padding: 8px;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}
