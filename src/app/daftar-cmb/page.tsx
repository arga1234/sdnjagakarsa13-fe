'use client';

import { ResponsiveTable } from '@/src/components/table';
import React from 'react';

export interface CMBDetail {
  id: string;
  nama: string;
  tempatLahir: string;
  tanggalLahir: string;
  jenisKelamin: string;
  nik: string;
}

export default function App() {
  const [pagination, setPagination] = React.useState({
    currentPage: 0,
    limit: 10,
    total: 0,
  });

  const columns = [
    { key: 'nama', title: 'Nama' },
    { key: 'tempatLahir', title: 'Tempat Lahir' },
    { key: 'tanggalLahir', title: 'Tanggal Lahir' },
    { key: 'jenisKelamin', title: 'Jenis Kelamin' },
    { key: 'nik', title: 'NIK' },
    {
      key: 'aksi',
      title: 'Aksi',
      render: (_val: string, row: Record<string, string>) => (
        <button
          onClick={() => alert(`ID Peserta: ${row.id}`)}
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '6px 12px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Lihat Detail
        </button>
      ),
    },
  ];

  const data: CMBDetail[] = [];

  return (
    <div style={{ padding: 24 }}>
      <h2>Daftar Calon Murid Baru</h2>
      <ResponsiveTable
        columns={columns}
        data={data}
        currentPage={pagination.currentPage}
        limit={pagination.limit}
        total={pagination.total}
        onPageChange={function (page: number): void {
            setPagination((prev) => ({ ...prev, currentPage: page }));
        }}
        onLimitChange={function (limit: number): void {
            setPagination((prev) => ({ ...prev, limit }));
        }}
      />
    </div>
  );
}
