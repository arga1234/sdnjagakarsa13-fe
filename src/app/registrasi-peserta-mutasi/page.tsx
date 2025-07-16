'use client';

import React, { useEffect, useState } from 'react';
import {
  CheckboxField,
  DateField,
  SelectField,
  TextField,
  UploadField,
} from '@/src/components/fieldv2';
import { FieldValidationRule } from './types';
import { useRegistrasiMutasiHook } from './hook';
import { LoadingComponent } from '@/src/components';

export default function RegistrasiPesertaMutasiPage() {
  const {
    agreed,
    setAgreed,
    validationRules,
    handleSubmitForm: originalSubmit,
  } = useRegistrasiMutasiHook();

  const [isLoading, setIsLoading] = useState(false);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsReady(true);
    }, 300);
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

  if (!isReady) {
    return <LoadingComponent />;
  }

  return (
    <div className="page">
      <div className="header">
        <h2>
          📝 <b>Formulir Pendaftaran Mutasi</b>
        </h2>
        <p>📍 SD Negeri Jagakarsa 13 Pagi</p>
      </div>

      <form className="form" onSubmit={handleSubmitForm}>
        <TextField
          label="Nama Lengkap"
          placeholder="Masukkan Nama Lengkap"
          name="nama"
          icon="👤"
          rules={validationRules.nama}
        />
        <TextField
          label="Asal Sekolah"
          placeholder="Masukkan Asal Sekolah"
          name="asalSekolah"
          icon="🏫"
          rules={validationRules.asalSekolah}
        />
        <SelectField
          label="Kelas Tujuan"
          name="kelasTujuan"
          icon="🎯"
          options={[
            { label: 'Kelas 2', value: '2' },
            { label: 'Kelas 3', value: '3' },
            { label: 'Kelas 4', value: '4' },
            { label: 'Kelas 6', value: '6' },
          ]}
          rules={validationRules.kelasTujuan}
        />
        <DateField
          label="Tanggal Lahir"
          name="tanggalLahir"
          rules={validationRules.tanggalLahir}
        />
        <SelectField
          label="Jenis Kelamin"
          name="jenisKelamin"
          icon="🚻"
          options={[
            { label: 'Laki-laki', value: 'laki-laki' },
            { label: 'Perempuan', value: 'perempuan' },
          ]}
          rules={validationRules.jenisKelamin}
        />
        <TextField
          label="NIK"
          placeholder="Masukkan Nomor Induk Kependudukan"
          name="nik"
          icon="🆔"
          rules={validationRules.nik}
        />
        <TextField
          label="Nomor Kartu Keluarga"
          placeholder="Masukkan Nomor KK"
          name="kk"
          icon="🆔"
          rules={validationRules.kk}
        />
        <TextField
          label="Nomor Whatsapp"
          placeholder="Masukkan Nomor Whatsapp"
          name="whatsapp"
          icon="📱"
          rules={validationRules.whatsapp}
        />
        {[
          {
            label: '📘 File PDF Rapor Terakhir',
            name: 'rapor',
            isMultiple: true,
          },
          { label: '👨‍👩‍👧 Foto/Scan Kartu Keluarga', name: 'kartuKeluarga' },
          { label: '📷 Pas Foto Berwarna', name: 'pasFoto' },
        ].map((field, i) => (
          <UploadField
            key={i}
            label={field.label}
            name={field.name}
            accept=".pdf,.jpg,.jpeg,.png"
            placeholder="Pilih file untuk diunggah"
            maxSizeMB={3}
            rules={validationRules[field.name as keyof FieldValidationRule]}
            multiple={field.isMultiple ? true : false} // Set ke false jika hanya satu file
          />
        ))}
        <CheckboxField
          onChange={(e) => setAgreed(e.target.checked)}
          label="Saya menyatakan bahwa data yang saya berikan adalah benar dan dapat dipertanggungjawabkan. Klik pernyataan ini untuk menyetujui"
          name="agreement"
        />

        <div className="submit-bar">
          <button type="submit" disabled={!agreed || isLoading}>
            🚀 Kirim Pendaftaran
          </button>
        </div>
      </form>

      {isLoading && (
        <div className="overlay">
          <div className="loader" />
          <p>⏳ Memproses Pendaftaran...</p>
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
          color: #555;
          min-height: 100vh;
          background: linear-gradient(
            120deg,
            #fbc2eb,
            #a6c1ee,
            #fad0c4,
            #fcb69f
          );
          background-size: 400% 400%;
          animation: bgShift 16s ease infinite;
          padding: 10px 24px;
          position: relative;
        }

        .header {
          position: sticky;
          top: 0;
          backdrop-filter: blur(8px);
          padding: 20px;
          text-align: center;
          z-index: 10;
        }

        .header h2 {
          color: #555;
          margin-bottom: 6px;
          font-size: 1.6rem;
        }

        .header p {
          font-size: 1rem;
          color: #555;
        }

        .form {
          max-width: 800px;
          margin: 0 auto;
          animation: fadeInUp 0.8s ease both;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .submit-bar {
          position: sticky;
          bottom: 0;
          backdrop-filter: blur(6px);
          padding: 20px 0;
          z-index: 10;
        }

        .submit-bar button {
          width: 100%;
          padding: 12px 20px;
          background-color: dodgerblue;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: bold;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .submit-bar button:disabled {
          background-color: #ccc;
          color: #888;
          cursor: not-allowed;
        }

        .submit-bar button:hover:enabled {
          background-color: #0077dd;
        }

        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 9999;
          width: 100vw;
          height: 100vh;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(4px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 1.2rem;
          color: #333;
        }

        .loader {
          width: 48px;
          height: 48px;
          border: 5px solid #ccc;
          border-top-color: dodgerblue;
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
