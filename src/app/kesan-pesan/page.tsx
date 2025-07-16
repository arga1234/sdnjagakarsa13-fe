'use client';

import React, { useEffect, useState } from 'react';
import {
  TextField,
  SelectField,
  CheckboxField,
} from '@/src/components/fieldv2';
import { LoadingComponent } from '@/src/components';
import { useFeedbackHook } from './hook';
import { useSearchParams } from 'next/navigation';
import { TextAreaField } from '@/src/components/fieldv2/textArea';

export default function FeedbackAcaraPage() {
  const {
    agreed,
    setAgreed,
    validationRules,
    handleSubmitForm: originalSubmit,
  } = useFeedbackHook();

  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  useEffect(() => {
    const timeout = setTimeout(() => setIsReady(true), 300);
    return () => clearTimeout(timeout);
  }, []);

  const handleSubmitForm = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        await originalSubmit(e, id);
      } finally {
        setIsLoading(false);
      }
    },
    [originalSubmit, id],
  );

  if (!isReady) return <LoadingComponent />;

  return (
    <div className="page">
      <div className="header">
        <h2>
          🎉 <b>Kesan & Pesan</b>
        </h2>
        <p>
          🌟 Berikan kesan, pesan, kritik atau saran untuk bahan evaluasi kami
        </p>
      </div>

      <form className="form" onSubmit={handleSubmitForm}>
        <TextField
          label="Wali murid dari ananda: "
          placeholder="Isi nama anak atau anonim"
          name="nama"
          icon="📱"
          rules={validationRules.noHp}
        />
        <TextAreaField
          label="Kesan Selama Acara"
          placeholder="Ceritakan kesan kamu..."
          name="kesan"
          icon="💬"
          rules={validationRules.kesan}
        />
        <TextAreaField
          label="Pesan untuk Panitia"
          placeholder="Sampaikan pesan atau saran..."
          name="pesan"
          icon="📩"
          rules={validationRules.pesan}
        />
        <SelectField
          label="Rating Acara"
          name="rating"
          icon="⭐"
          options={[
            { label: '⭐ (1) Kurang', value: '1' },
            { label: '⭐⭐ (2)', value: '2' },
            { label: '⭐⭐⭐ (3)', value: '3' },
            { label: '⭐⭐⭐⭐ (4)', value: '4' },
            { label: '⭐⭐⭐⭐⭐ (5) Luar Biasa!', value: '5' },
          ]}
          rules={validationRules.rating}
        />
        <CheckboxField
          onChange={(e) => setAgreed(e.target.checked)}
          label="Saya menyatakan bahwa kesan dan pesan ini adalah benar dan jujur."
          name="agreement"
        />

        <div className="submit-bar">
          <button type="submit" disabled={!agreed || isLoading}>
            🚀 Kirim Kesan & Pesan
          </button>
        </div>
      </form>

      {isLoading && (
        <div className="overlay">
          <div className="loader" />
          <p>⏳ Mengirimkan Feedback...</p>
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
          color: #444;
          min-height: 100vh;
          background: linear-gradient(
            135deg,
            #fdfcfb,
            #e2d1c3,
            #f6f3ff,
            #c1e1f5
          );
          background-size: 400% 400%;
          animation: bgShift 18s ease infinite;
          padding: 10px 24px;
          position: relative;
        }

        .header {
          text-align: center;
          margin-bottom: 30px;
        }

        .header h2 {
          color: #333;
          font-size: 1.8rem;
        }

        .form {
          max-width: 700px;
          margin: 0 auto;
          animation: fadeInUp 0.7s ease both;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .submit-bar {
          margin-top: 30px;
        }

        .submit-bar button {
          width: 100%;
          padding: 12px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: bold;
          transition: 0.3s;
        }

        .submit-bar button:hover:enabled {
          background-color: #0051c3;
        }

        .submit-bar button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }

        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 9999;
          width: 100vw;
          height: 100vh;
          background: rgba(255, 255, 255, 0.85);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 1.2rem;
        }

        .loader {
          width: 48px;
          height: 48px;
          border: 5px solid #ccc;
          border-top-color: #0070f3;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 10px;
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
