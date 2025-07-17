'use client';   
import { LoadingComponent } from '@/src/components';
import { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';

interface Student {
  no: number;
  nama: string;
  kelas: string;
  rapor1: number;
  rapor2: number;
  rataRapor: number;
  skorCaT: number;
  interview: number;
  rataTes: number;
  rapor40: number;
  tes60: number;
  nilaiAkhir: number;
  lulus: boolean;
  docLink: string;
}

const initialData: Student[] = [
  { no: 1, nama: 'Naira Putri Firmansyah', kelas: 'IV', rapor1: 82.63, rapor2: 85.75, rataRapor: 84.19, skorCaT: 160, interview: 90, rataTes: 125, rapor40: 33.68, tes60: 75.0, nilaiAkhir: 108.68, lulus: true, docLink: 'https://drive.google.com/drive/folders/1AXhQb-4-mWEXEC_WxC1Lpqog8Sv-RjSk' },
  { no: 2, nama: 'Narendra Shawqi Achwan', kelas: 'III', rapor1: 83.5, rapor2: 86.13, rataRapor: 84.82, skorCaT: 125, interview: 90, rataTes: 107.5, rapor40: 33.93, tes60: 64.5, nilaiAkhir: 98.43, lulus: true, docLink: 'https://drive.google.com/drive/folders/1AcIjR-TtEzn1WJUo8wNvclhIlvCEaj-h' },
  { no: 3, nama: 'Muhammad Alif Pratama', kelas: 'III', rapor1: 82.5, rapor2: 83.25, rataRapor: 82.88, skorCaT: 130, interview: 85, rataTes: 107.5, rapor40: 33.15, tes60: 64.5, nilaiAkhir: 97.65, lulus: true, docLink: 'https://drive.google.com/drive/folders/1AcevJ5LFq5gUn65BGHpJwJ6UNDj3u5V7' },
  { no: 4, nama: 'Muhammad Nauval Al Khairy', kelas: 'III', rapor1: 80.63, rapor2: 75.25, rataRapor: 77.94, skorCaT: 140, interview: 70, rataTes: 105, rapor40: 31.18, tes60: 63.0, nilaiAkhir: 94.18, lulus: false, docLink: 'https://drive.google.com/drive/folders/1AhuZIZMDGgbqmBU_qWTWggXYoqeSG1bG' },
  { no: 5, nama: 'Clarissa Laiqa Shatierra', kelas: 'III', rapor1: 76.43, rapor2: 81.14, rataRapor: 78.79, skorCaT: 115, interview: 80, rataTes: 97.5, rapor40: 31.52, tes60: 58.5, nilaiAkhir: 90.02, lulus: false, docLink: 'https://drive.google.com/drive/folders/1AYRzN_2Kjqrynna_JAvSkgiA0HL_g2cS' },
];

const HasilSeleksi: NextPage = () => {
  const [students] = useState<Student[]>(initialData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Simulate loading for 2 seconds
    return () => clearTimeout(timer);
  }, []);

  if(loading) {
      return <LoadingComponent />
  }
  
  return (
    <>
      <Head>
        <title>🤩✨ Hasil Seleksi Mutasi SDN Jagakarsa 13 🤩✨</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container">
        <div className="emoji-wrapper">
          <span className="emoji" style={{ left: '10%', animationDelay: '0s' }}>🎈</span>
          <span className="emoji" style={{ left: '30%', animationDelay: '1.5s' }}>🎉</span>
          <span className="emoji" style={{ left: '50%', animationDelay: '3s' }}>🤩</span>
          <span className="emoji" style={{ left: '70%', animationDelay: '4.5s' }}>✨</span>
          <span className="emoji" style={{ left: '90%', animationDelay: '6s' }}>🚀</span>
        </div>
        <h1>🤩 Hasil Seleksi Mutasi SDN Jagakarsa 13 Pagi 🤩</h1>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Siswa 📚</th>
                <th>Kelas</th>
                <th>Rapor 1</th>
                <th>Rapor 2</th>
                <th>Rata-rata Rapor</th>
                <th>Skor CaT</th>
                <th>Interview</th>
                <th>Rata-rata Tes</th>
                <th>Rapor × 40%</th>
                <th>Tes × 60%</th>
                <th>Nilai Akhir 💯</th>
                <th>Dokumen 📄</th>
                <th className="freeze">Lulus 🎉</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.no}>
                  <td>{s.no}</td>
                  <td className="name-col">{s.nama}</td>
                  <td>{s.kelas}</td>
                  <td>{s.rapor1.toFixed(2)}</td>
                  <td>{s.rapor2.toFixed(2)}</td>
                  <td>{s.rataRapor.toFixed(2)}</td>
                  <td>{s.skorCaT}</td>
                  <td>{s.interview}</td>
                  <td>{s.rataTes.toFixed(2)}</td>
                  <td>{s.rapor40.toFixed(2)}</td>
                  <td>{s.tes60.toFixed(2)}</td>
                  <td>{s.nilaiAkhir.toFixed(2)}</td>
                  <td className="freeze">
                    <a href={s.docLink} target="_blank" rel="noopener noreferrer" className="doc-button">
                      📄 Lihat
                    </a>
                  </td>
                  <td className="freeze">{s.lulus ? '✅' : '❌'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <style jsx>{`
        .container {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 20px;
          background: linear-gradient(270deg, #ff9a9e, #fad0c4, #fbc2eb, #a18cd1);
          background-size: 800% 800%;
          animation: gradientAnimation 12s ease infinite;
          font-family: 'Comic Sans MS', cursive, sans-serif;
        }
        .emoji-wrapper { position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; pointer-events: none; }
        .emoji { position: absolute; bottom: -50px; font-size: 2.5rem; opacity: 0.8; animation: floatEmoji 8s ease-in infinite; }
        @keyframes floatEmoji {
          0% { transform: translateY(0) scale(1); opacity: 0.8; }
          50% { opacity: 1; }
          100% { transform: translateY(-120vh) scale(1.2); opacity: 0; }
        }
        h1 {
          margin-bottom: 20px;
          font-size: 1.6rem;
          text-align: center;
          color: #222;
          letter-spacing: 2px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
          transform: rotate(-1deg);
        }
        .table-wrapper {
          width: 100%;
          max-width: 1200px;
          overflow-x: auto;
          border-radius: 10px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.15);
          background: #fff;
        }
        table { width: 100%; border-collapse: collapse; text-align: center; white-space: nowrap; }
        th, td { padding: 16px 12px; border-bottom: 1px solid #ddd; font-size: 15px; color: #333; min-width: 140px; }
        .name-col { text-align: left; padding-left: 20px; }
        thead th { background: #2b6cb0; color: #fff; position: sticky; top: 0; z-index: 2; }
        tbody tr:nth-child(odd) td { background: #fffbea; }
        tbody tr:nth-child(even) td { background: #e6fffa; }
        .freeze { position: sticky; right: 0; background: #fefcbf; z-index: 3; }
        .doc-button {
          display: inline-block;
          padding: 6px 10px;
          background: #805ad5;
          color: #fff;
          border-radius: 4px;
          text-decoration: none;
          font-size: 14px;
          transition: background 0.3s;
        }
        .doc-button:hover { background: #6b46c1; }
        tr:hover td { background-color: #bee3f8; cursor: pointer; }
        @keyframes gradientAnimation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </>
  );
};

export default HasilSeleksi;
