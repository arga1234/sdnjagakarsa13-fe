'use client';

import React, { useEffect, useState } from 'react';
import {
  CheckboxField,
  DateField,
  SelectField,
  TextField,
} from '@/src/components/fieldv2';
import { useAbsensiOnlineHook } from './hook';
import { LoadingComponent } from '@/src/components';

export default function AbsensiOnlinePage() {
  const {
    agreed,
    setAgreed,
    validationRules,
    handleSubmitForm: originalSubmit,
  } = useAbsensiOnlineHook();

  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsReady(true), 300);
    return () => clearTimeout(timeout);
  }, []);

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await originalSubmit(e);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isReady) return <LoadingComponent />;

  return (
    <div className="page">
      <div className="header">
        <h2>
          <b>✨ Absensi Kelas 1 ✨</b>
        </h2>
        <p>📍 SD Negeri Jagakarsa 13 Pagi 📍</p>
      </div>

      <form className="form" onSubmit={handleSubmitForm}>
        <TextField
          label="🧒 Nama Lengkap Anak"
          placeholder="Masukkan Nama Lengkap Anak"
          name="namaAnak"
          icon=""
          rules={validationRules.namaAnak}
        />
        <TextField
          label="👨‍👩‍👧 Nama Orang Tua/Wali"
          placeholder="Masukkan Nama Orang Tua atau Wali"
          name="namaOrtu"
          icon=""
          rules={validationRules.namaOrtu}
        />
        <TextField
          label="📱 Nomor HP Aktif (Whatsapp)"
          placeholder="Masukkan Nomor HP"
          name="noHp"
          icon=""
          rules={validationRules.noHp}
        />
        <SelectField
          label="📘 Status Join Grup Kelas 1"
          name="statusGrup"
          icon=""
          options={[
            { label: '✅ Sudah Join', value: 'sudah' },
            { label: '❌ Belum Join', value: 'belum' },
          ]}
          rules={validationRules.statusGrup}
        />
        <DateField
          label="📅 Tanggal Absensi"
          name="tanggalAbsensi"
          rules={validationRules.tanggalAbsensi}
        />
        <SelectField
          label="✅ Status Kehadiran"
          name="statusHadir"
          icon=""
          options={[
            { label: '🟢 Hadir', value: 'hadir' },
            { label: '🟡 Izin', value: 'izin' },
            { label: '🔴 Sakit', value: 'sakit' },
            { label: '🔴 Belum Tahu', value: 'belum tahu ada sosialisasi' },
          ]}
          rules={validationRules.statusHadir}
        />
        <SelectField
          label="📝 Acara"
          name="keterangan"
          icon=""
          options={[
            { label: '🗣️ Sosialisasi Pra MPLS', value: 'sosialisasi' },
            { label: '👥 Kehadiran Peserta MPLS', value: 'kehadiran' },
          ]}
          rules={validationRules.keterangan}
        />

        <CheckboxField
          onChange={(e) => setAgreed(e.target.checked)}
          label="Saya menyatakan bahwa data yang saya berikan adalah benar dan dapat dipertanggungjawabkan."
          name="agreement"
        />

        <div className="submit-bar">
          <button type="submit" disabled={!agreed || isLoading}>
            🚀 Kirim Absensi Sekarang!
          </button>
        </div>
      </form>

      {isLoading && (
        <div className="overlay">
          <div className="loader" />
          <p>⏳ Mengirim data absensi...</p>
        </div>
      )}

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

        .page {
          color: #333;
          min-height: 100vh;
          background: linear-gradient(
            270deg,
            #fbc2eb,
            #a6c1ee,
            #fad0c4,
            #fcb69f,
            #ffecd2
          );
          background-size: 1000% 1000%;
          animation: bgShift 30s ease infinite;
          padding: 20px;
        }

        .header {
          text-align: center;
          padding: 16px;
          margin-bottom: 12px;
          background: rgba(255, 255, 255, 0.75);
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .header h2 {
          font-size: 1.8rem;
          margin: 0 0 6px;
        }

        .header p {
          margin: 2px 0;
          font-size: 1rem;
        }

        .form {
          max-width: 720px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.85);
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
          animation: fadeInUp 1s ease both;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .submit-bar {
          margin-top: 24px;
        }

        .submit-bar button {
          width: 100%;
          padding: 14px 20px;
          background-color: #0077ff;
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 1.2rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .submit-bar button:hover:enabled {
          background-color: #005dd1;
        }

        .submit-bar button:disabled {
          background-color: #ccc;
          color: #777;
          cursor: not-allowed;
        }

        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 9999;
          width: 100vw;
          height: 100vh;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(6px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .loader {
          width: 48px;
          height: 48px;
          border: 6px solid #eee;
          border-top-color: #0077ff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 12px;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
