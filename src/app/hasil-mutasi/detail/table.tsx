'use client';

import React from 'react';
import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import './SeleksiTable.css'; // Custom styling with gradient & emoji flair

interface SiswaData {
  key: string;
  nama: string;
  kelas: string;
  rapor1: number;
  rapor2: number;
  rataRataRapor: number;
  skorCAT: number;
  interview: number;
  rataRataTes: number;
  bobotRapor: number;
  bobotTes: number;
  nilaiAkhir: number;
  lulus: string;
}

const data: SiswaData[] = [
  {
    key: '1',
    nama: '🎓 Naira Putri Firmansyah',
    kelas: 'IV',
    rapor1: 82.63,
    rapor2: 85.75,
    rataRataRapor: 84.19,
    skorCAT: 160,
    interview: 90,
    rataRataTes: 125,
    bobotRapor: 33.68,
    bobotTes: 75,
    nilaiAkhir: 108.68,
    lulus: '✅',
  },
  {
    key: '2',
    nama: '📘 Narendra Shawqi Achwan',
    kelas: 'III',
    rapor1: 83.5,
    rapor2: 86.13,
    rataRataRapor: 84.82,
    skorCAT: 125,
    interview: 90,
    rataRataTes: 107.5,
    bobotRapor: 33.93,
    bobotTes: 64.5,
    nilaiAkhir: 98.43,
    lulus: '✅',
  },
  {
    key: '3',
    nama: '📗 Muhammad Alif Pratama',
    kelas: 'III',
    rapor1: 82.5,
    rapor2: 83.25,
    rataRataRapor: 82.88,
    skorCAT: 130,
    interview: 85,
    rataRataTes: 107.5,
    bobotRapor: 33.15,
    bobotTes: 64.5,
    nilaiAkhir: 97.65,
    lulus: '✅',
  },
  {
    key: '4',
    nama: '📙 Muhammad Nauval Al Khairy',
    kelas: 'III',
    rapor1: 80.63,
    rapor2: 75.25,
    rataRataRapor: 77.94,
    skorCAT: 140,
    interview: 70,
    rataRataTes: 105,
    bobotRapor: 31.18,
    bobotTes: 63,
    nilaiAkhir: 94.18,
    lulus: '❌',
  },
  {
    key: '5',
    nama: '📕 Clarissa Laiqa Shatierra',
    kelas: 'III',
    rapor1: 76.43,
    rapor2: 81.14,
    rataRataRapor: 78.79,
    skorCAT: 115,
    interview: 80,
    rataRataTes: 97.5,
    bobotRapor: 31.52,
    bobotTes: 58.5,
    nilaiAkhir: 90.02,
    lulus: '❌',
  },
];

const columns: ColumnsType<SiswaData> = [
  { title: '👤 Nama', dataIndex: 'nama', key: 'nama', fixed: 'left' },
  { title: '🏫 Kelas', dataIndex: 'kelas', key: 'kelas' },
  { title: '📘 Rapor 1', dataIndex: 'rapor1', key: 'rapor1' },
  { title: '📗 Rapor 2', dataIndex: 'rapor2', key: 'rapor2' },
  {
    title: '📊 Rata-rata Rapor',
    dataIndex: 'rataRataRapor',
    key: 'rataRataRapor',
  },
  { title: '🖥️ Skor CaT', dataIndex: 'skorCAT', key: 'skorCAT' },
  { title: '🗣️ Interview', dataIndex: 'interview', key: 'interview' },
  { title: '📈 Rata-rata Tes', dataIndex: 'rataRataTes', key: 'rataRataTes' },
  { title: '🎯 Bobot Rapor (40%)', dataIndex: 'bobotRapor', key: 'bobotRapor' },
  { title: '🚀 Bobot Tes (60%)', dataIndex: 'bobotTes', key: 'bobotTes' },
  { title: '🏁 Nilai Akhir', dataIndex: 'nilaiAkhir', key: 'nilaiAkhir' },
  {
    title: '🎓 Lulus',
    dataIndex: 'lulus',
    key: 'lulus',
    fixed: 'right',
    render: (val) =>
      val === '✅' ? (
        <Tag color="green">✅ Lulus</Tag>
      ) : (
        <Tag color="red">❌ Tidak Lulus</Tag>
      ),
  },
];

const SeleksiTable: React.FC = () => {
  return (
    <div className="rounded-xl overflow-auto bg-gradient-to-r from-purple-100 via-blue-100 to-pink-100 p-4 shadow-lg transition-all duration-500 ease-in-out">
      <h2 className="text-2xl font-bold text-center mb-4 text-purple-700">
        📋 Hasil Seleksi Siswa ✨
      </h2>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{ x: 1500 }}
        bordered
        pagination={false}
      />
    </div>
  );
};

export default SeleksiTable;
