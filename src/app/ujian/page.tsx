'use client';

import React, { useState } from 'react';

const soalList = [
  {
    id: 1,
    jenis: 'Bahasa Indonesia 📘',
    pertanyaan: 'Apa sinonim dari "pandai"? 🤔',
    gambar: '',
    jawaban: [
      'https://via.placeholder.com/150x80?text=Bodoh',
      'https://via.placeholder.com/150x80?text=Pintar',
      'https://via.placeholder.com/150x80?text=Malas',
      'https://via.placeholder.com/150x80?text=Lemah',
    ],
  },
  {
    id: 2,
    jenis: 'Bahasa Indonesia 📘',
    pertanyaan: 'Perhatikan gambar berikut 📷',
    gambar: '/images/contoh.jpg',
    jawaban: ['Awan ☁️', 'Gunung ⛰️', 'Laut 🌊', 'Rumah 🏠'],
  },
];

export default function SoalUjianPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [jawabanUser, setJawabanUser] = useState<{
    [key: number]: number | null;
  }>({});

  const currentSoal = soalList[currentIndex];

  const handleJawaban = (indexJawaban: number) => {
    setJawabanUser((prev) => ({ ...prev, [currentSoal.id]: indexJawaban }));
  };

  const goToSoal = (index: number) => {
    setCurrentIndex(index);
  };

  const isJawabanGambar = (jawaban: string) => jawaban.startsWith('http');

  return (
    <div className="soal-page">
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

        .soal-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: linear-gradient(
            -45deg,
            #ff9a9e,
            #fad0c4,
            #a18cd1,
            #fbc2eb
          );
          background-size: 400% 400%;
          animation: gradientMove 20s ease infinite;
          color: #222;
        }
      `}</style>

      {/* Header */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderBottom: '1px solid #ccc',
          padding: '12px 16px',
          zIndex: 10,
        }}
      >
        <h1 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111' }}>
          📝 Jenis Soal: {currentSoal.jenis}
        </h1>
      </header>

      {/* Body */}
      <main style={{ flex: 1, padding: '16px' }}>
        <div
          style={{
            fontSize: '18px',
            fontWeight: 600,
            marginBottom: '16px',
            color: '#111',
          }}
        >
          {currentIndex + 1}. {currentSoal.pertanyaan}
        </div>

        {currentSoal.gambar && (
          <div
            style={{ width: '100%', maxWidth: '320px', margin: '0 auto 16px' }}
          >
            <img
              src={currentSoal.gambar}
              alt="Soal Gambar"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
                objectFit: 'contain',
              }}
            />
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {currentSoal.jawaban.map((jawaban, i) => (
            <button
              key={i}
              onClick={() => handleJawaban(i)}
              style={{
                textAlign: 'center',
                padding: '10px',
                border: '2px solid',
                borderRadius: '12px',
                backgroundColor:
                  jawabanUser[currentSoal.id] === i ? '#ffeaa7' : '#ffffffcc',
                borderColor:
                  jawabanUser[currentSoal.id] === i ? '#e17055' : '#ccc',
                cursor: 'pointer',
                transition: '0.3s ease all',
                color: '#111',
              }}
            >
              {isJawabanGambar(jawaban) ? (
                <img
                  src={jawaban}
                  alt={`Jawaban ${i}`}
                  style={{ maxHeight: '80px', objectFit: 'contain' }}
                />
              ) : (
                <span style={{ fontSize: '16px' }}>
                  {String.fromCharCode(65 + i)}. {jawaban}
                </span>
              )}
            </button>
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '24px',
          }}
        >
          <button
            onClick={() => goToSoal(currentIndex - 1)}
            disabled={currentIndex === 0}
            style={{
              padding: '10px 16px',
              backgroundColor: '#ffeaa7',
              border: '1px solid #e17055',
              borderRadius: '8px',
              cursor: 'pointer',
              color: '#111',
            }}
          >
            ⬅️ Sebelumnya
          </button>
          <button
            onClick={() => goToSoal(currentIndex + 1)}
            disabled={currentIndex === soalList.length - 1}
            style={{
              padding: '10px 16px',
              backgroundColor: '#81ecec',
              border: '1px solid #00cec9',
              borderRadius: '8px',
              cursor: 'pointer',
              color: '#111',
            }}
          >
            Berikutnya ➡️
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          position: 'sticky',
          bottom: 0,
          backgroundColor: 'rgba(255,255,255,0.9)',
          borderTop: '1px solid #ccc',
          padding: '8px',
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          {soalList.map((soal, index) => (
            <button
              key={soal.id}
              onClick={() => goToSoal(index)}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '18px',
                border: '2px solid',
                borderColor: currentIndex === index ? '#6c5ce7' : '#ccc',
                backgroundColor: currentIndex === index ? '#a29bfe' : '#dfe6e9',
                color: '#2d3436',
                fontSize: '14px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
}
