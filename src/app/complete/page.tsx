'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function RegistrasiUlangCompletePage() {
  const urlsearchParams = useSearchParams();
  const message = urlsearchParams.get('message');
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container">
      <div className="card">
        <div className="emoji">🎉🎈✨🎊🥳</div>
        <h1 className="title">{message}</h1>
        <p className="text">Terima kasih telah mengisi 👏😊💌</p>
      </div>
      {showConfetti && (
        <div className="confetti">✨</div>
      )}

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }

        @keyframes confettiAnim {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(200px) rotate(360deg); opacity: 0; }
        }

        @keyframes backgroundShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100dvh;
          padding: 0 24px;
          background: linear-gradient(-45deg, #ff9a9e, #fad0c4, #a18cd1, #fbc2eb);
          background-size: 400% 400%;
          animation: backgroundShift 10s ease infinite;
          position: relative;
          overflow: hidden;
        }

        .card {
          text-align: center;
          background-color: #ffffff;
          padding: 40px;
          border-radius: 16px;
          max-width: 600px;
          width: 100%;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
          animation: float 3s ease-in-out infinite;
        }

        .emoji {
          font-size: 2.5rem;
        }

        .title {
          margin: 16px 0px;
          font-size: 2rem;
          color: #2b6cb0;
        }

        .text {
          font-size: 1.1rem;
          color: #4a5568;
        }

        .confetti {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          animation: confettiAnim 4s ease-out forwards;
          font-size: 3rem;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
