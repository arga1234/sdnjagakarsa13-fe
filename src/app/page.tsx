'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { LoadingComponent } from '../components';

export default function HomePage() {
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
    <div className="container">
      <div className="logo-wrapper">
        <Image
          src="https://drive.google.com/uc?export=view&id=1ceUZ0O2VW9iofa-ivXSdGdeVUTYNp93Z"
          alt="Logo SDN Jagakarsa 13 Pagi"
          width={140}
          height={140}
          className="logo"
        />
      </div>
      <h1 className="title">🎓 SDN Jagakarsa 13 Pagi</h1>
      <p className="subtitle">📚 Bersama Mendidik Anak Bangsa 🌟</p>

      <div className="buttons">
        <Link href="/informasi-mutasi">
          <button className="btn info">📆 Jadwal Mutasi</button>
        </Link>

        <Link href="/bangku-kosong">
          <button className="btn register">🪑 Bangku Kosong</button>
        </Link>

        <Link href="/kisi-kisi">
          <button className="btn register">🌟Kisi-kisi Ujian</button>
        </Link>

        <Link href="/registrasi-peserta-mutasi">
          <button className="btn register">
            🌟 Registrasi/Daftar Sekarang
          </button>
        </Link>
        <a
          href="https://edu.jakarta.go.id/perpindahan-murid/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="btn info">📚 Bangku Kosong Se DKI Jakarta</button>
        </a>
        <a
          href="https://drive.google.com/uc?export=view&id=1c1HwSQGk2h3fthRHWvAxBYE94sMPObuv"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="btn register">🎯 Poster Resmi</button>
        </a>
        <a
          href="https://chat.whatsapp.com/JB5Qiwb8vAALa1cO1vaHiq"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="btn whatsapp">💬 Grup WhatsApp</button>
        </a>
        <a
          href="https://wa.me/6289524801052"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="btn whatsapp">💬 Hubungi Admin</button>
        </a>
      </div>

      <style jsx>{`
        @keyframes backgroundShift {
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

        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 1rem;
          background: linear-gradient(
            -45deg,
            #ff9a9e,
            #fad0c4,
            #a1c4fd,
            #c2e9fb
          );
          background-size: 400% 400%;
          animation: backgroundShift 16s ease infinite;
        }

        .logo-wrapper {
          margin-bottom: 1.5rem;
        }

        .logo {
          border-radius: 50%;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
          transition: transform 0.4s ease;
        }

        .logo:hover {
          transform: rotate(5deg) scale(1.05);
        }

        .title {
          font-size: 2.8rem;
          text-align: center;
          color: white;
          margin-bottom: 0.3rem;
          text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.4);
        }

        .subtitle {
          font-size: 1.2rem;
          color: #fff;
          text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
          margin-bottom: 2rem;
        }

        .buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
        }

        .btn {
          padding: 0.9rem 1.7rem;
          font-size: 1.1rem;
          font-weight: 700;
          border: none;
          border-radius: 2rem;
          cursor: pointer;
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .btn:hover {
          transform: scale(1.1);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        }

        .btn.info {
          background: #ffe066;
          color: #333;
        }

        .btn.register {
          background: #74c0fc;
          color: #333;
        }

        .btn.whatsapp {
          background: #25d366;
          color: white;
        }

        @media (max-width: 480px) {
          .title {
            font-size: 2rem;
          }
          .subtitle {
            font-size: 1rem;
          }
          .btn {
            font-size: 1rem;
            padding: 0.8rem 1.2rem;
          }
        }
      `}</style>
    </div>
  );
}
