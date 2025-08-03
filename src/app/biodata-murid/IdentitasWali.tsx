'use client';
import { TextField, SelectField } from '@/src/components/fieldv2';
import { ValidationRule } from '@/src/util';
import React, { useCallback, useEffect } from 'react';
import { usePageHook } from './hookPage';

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
  handleSubmitForm,
  localStorageName,
  formId,
}: {
  formId: string;
  wali: string;
  nextButton: () => void;
  previousButton: () => void;
  subTitle: string;
  localStorageName: string;
  handleSubmitForm: (
    e: React.FormEvent<HTMLFormElement>,
    nextButton: () => void,
    previousButton: () => void,
    localstorageName: string,
  ) => void;
  rules?: {
    nama?: ValidationRule[];
    tahunLahir?: ValidationRule[];
    pendidikan: ValidationRule[];
    pekerjaan: ValidationRule[];
    penghasilan?: ValidationRule[];
  };
}) {
  const submit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      handleSubmitForm(e, nextButton, previousButton, localStorageName);
    },
    [handleSubmitForm, nextButton, previousButton, localStorageName],
  );

  const { loadFormDataFromLocalStorage } = usePageHook();

  useEffect(() => {
    loadFormDataFromLocalStorage(formId, `data-${localStorageName}`);
  }, [formId, loadFormDataFromLocalStorage, localStorageName]);
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
          backgroundColor: 'transparent',
          backdropFilter: 'blur(10px)',
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
        id={formId}
        style={{ maxWidth: '800px', margin: '0 auto' }}
        onSubmit={submit}
      >
        <TextField
          label={`Nama ${wali}`}
          name="nama"
          icon="👫"
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
        <SelectField
          label="Berkebutuhan Khusus"
          name="kebutuhanKhusus"
          options={[
            { label: 'netra', value: 'netra' },
            { label: 'rungu', value: 'rungu' },
            { label: 'grahita(IQ) ringan', value: 'grahita ringan' },
            { label: 'grahita sedang', value: 'grahita sedang' },
            { label: 'daksa ringan', value: 'daksa ringan' },
            { label: 'daksa sedang', value: 'daksa sedang' },
            { label: 'laras', value: 'laras' },
            { label: 'wicara', value: 'wicara' },
            { label: 'hyperaktif', value: 'hyperaktif' },
            { label: 'cerdas istimewa', value: 'cerdas istimewa' },
            { label: 'bakat istimewa', value: 'bakat istimewa' },
            { label: 'kesulitan belajar', value: 'kesulitan belajar' },
            { label: 'narkoba', value: 'narkoba' },
            { label: 'indigo', value: 'indigo' },
            { label: 'down syndrome', value: 'down syndrome' },
            { label: 'autis', value: 'autis' },
          ]}
          rules={[]}
        />
        <div
          style={{
            padding: '24px 0px',
            width: '100%',
            position: 'sticky',
            bottom: 0,
            backgroundColor: 'transparent',
            backdropFilter: 'blur(10px)',
            zIndex: 1000,
            display: 'flex',
            flexWrap: 'nowrap',
            gap: '10px',
          }}
        >
          <button
            style={{
              width: '100%',
              padding: '10px 20px',
              backgroundColor: 'grey',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            value="previous"
          >
            Sebelumnya
          </button>
          <button
            style={{
              width: '100%',
              padding: '10px 20px',
              backgroundColor: 'dodgerblue',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            value="next"
          >
            Selanjutnya
          </button>
        </div>
      </form>
    </div>
  );
}
