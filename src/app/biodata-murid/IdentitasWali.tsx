'use client';
import { TextField, SelectField } from '@/src/components/fieldv2';
import { ValidationRule } from '@/src/util';
import React, { useCallback } from 'react';

const pekerjaanOptions = [
  'Tidak bekerja',
  'Nelayan',
  'Petani',
  'Peternak',
  'PNS/TNI/Polri',
  'Karyawan Swasta',
  'Pedagang Kecil',
  'Pedagang Besar',
  'Wiraswasta',
  'Wirausaha',
  'Buruh',
  'Pensiunan',
  'Tenaga Kerja Indonesia',
  'Karyawan BUMN',
  'Tidak dapat diterapkan',
  'Sudah Meninggal',
  'Lainnya',
];

const pendidikanOptions = [
  'D1',
  'D2',
  'D3',
  'D4',
  'Informal',
  'Lainnya',
  'Non formal',
  'Paket A',
  'Paket B',
  'Paket C',
  'PAUD',
  'Profesi',
  'Putus SD',
  'S1',
  'S2',
  'S2 Terapan',
  'S3',
  'S3 Terapan',
  'SD / sederajat',
  'SMA / sederajat',
  'SMP / sederajat',
  'Sp-1',
  'Sp-2',
  'Tidak sekolah',
  'TK / sederajat',
];

const penghasilanOptions = [
  'Kurang dari Rp. 500,000',
  'Rp. 500,000 - Rp. 999,999',
  'Rp. 1,000,000 - Rp. 1,999,999',
  'Rp. 2,000,000 - Rp. 4,999,999',
  'Rp. 5,000,000 - Rp. 20,000,000',
  'Lebih dari Rp. 20,000,000',
  'Tidak Berpenghasilan',
];

export function IdentitasWali({
  wali,
  nextButton,
  previousButton,
  subTitle,
  rules,
}: {
  wali: string;
  nextButton: () => void;
  previousButton: () => void;
  subTitle: string;
  rules?: {
    nama?: ValidationRule[];
    tahunLahir?: ValidationRule[];
    pendidikan: ValidationRule[];
    pekerjaan: ValidationRule[];
    penghasilan?: ValidationRule[];
  };
}) {
  const handleSubmitForm = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const jsonObject: Record<string, FormDataEntryValue> = {};
      for (const [key, value] of formData.entries()) {
        jsonObject[key] = value;
      }
      localStorage.setItem(`data-${wali}`, JSON.stringify(jsonObject));
    },
    [wali],
  );

  return (
    <div
      style={{
        padding: '0px 24px',
        height: '100dvh',
        overflowY: 'auto',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '20px',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'var(--background)',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
        }}
      >
        <h4 style={{ textAlign: 'center', marginBottom: '10px' }}>
          <b>Biodata {wali}</b>
        </h4>
        <p>{subTitle}</p>
      </div>
      <form
        style={{ maxWidth: '800px', margin: '0 auto' }}
        onSubmit={handleSubmitForm}
      >
        <TextField
          label={`Nama ${wali}`}
          name="nama"
          icon="👨"
          placeholder={`Masukan Nama ${wali}`}
          rules={rules?.nama || []}
        />
        <TextField
          label={`Masukan NIK ${wali}`}
          name="nik"
          icon="🆔"
          placeholder={`NIK ${wali}`}
        />
        <TextField
          label={`Tahun lahir ${wali}`}
          type="number"
          name="tahunLahir"
          icon="📅"
          placeholder={`Tahun lahir ${wali}`}
          rules={rules?.tahunLahir || []}
        />
        <SelectField
          label={`Pendidikan ${wali}`}
          name="pendidikan"
          options={pendidikanOptions.map((o) => ({ label: o, value: o }))}
          icon="🎓"
          placeholder={`Pendidikan ${wali}`}
          rules={rules?.pendidikan || []}
        />
        <SelectField
          label={`Pekerjaan ${wali}`}
          name="pekerjaan"
          options={pekerjaanOptions.map((o) => ({ label: o, value: o }))}
          icon="💼"
          placeholder={`Pekerjaan ${wali}`}
          rules={rules?.pekerjaan || []}
        />
        <SelectField
          label={`Penghasilan ${wali}`}
          name="penghasilan"
          options={penghasilanOptions.map((o) => ({ label: o, value: o }))}
          icon="💰"
          placeholder={`Penghasilan ${wali}`}
          rules={rules?.penghasilan || []}
        />
        <TextField
          label={`Berkebutuhan khusus`}
          name="kebutuhanKhusus"
          icon="♿"
          placeholder={`Berkebutuhan khusus`}
        />
        <div
          style={{
            padding: '24px 0px',
            width: '100%',
            position: 'sticky',
            bottom: 0,
            backgroundColor: 'var(--background)',
            zIndex: 1000,
            display: 'flex',
            flexWrap: 'nowrap',
            gap: '10px',
          }}
        >
          <button
            onClick={previousButton}
            style={{
              width: '100%',
              padding: '10px 20px',
              backgroundColor: 'grey',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Sebelumnya
          </button>
          <button
            onClick={nextButton}
            style={{
              width: '100%',
              padding: '10px 20px',
              backgroundColor: 'dodgerblue',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Selanjutnya
          </button>
        </div>
      </form>
    </div>
  );
}
