/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import {
  CheckboxField,
  DateField,
  SelectField,
  TextField,
  UploadField,
} from '@/src/components/field';
import { FieldValidationRule } from './types';
import { useRegistrasiUlangHook } from './hook';

export default function Page() {
  const {
    agreed,
    setAgreed,
    validationRules,
    handleSubmitForm,
  } = useRegistrasiUlangHook()

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
          <b>BIODATA MURID</b>
        </h4>
        <p>SD Negeri Jagakarsa 13 Pagi</p>
      </div>
      <form
        style={{ maxWidth: '800px', margin: '0 auto' }}
        onSubmit={handleSubmitForm}
      >
        <TextField
          label="Nama Lengkap"
          placeholder="Masukkan Nama Lengkap"
          name="nama"
          icon="👤"
          rules={validationRules.nama}
        />
        <TextField
          label="Tempat Lahir"
          placeholder="Masukkan Tempat Lahir"
          name="tempatLahir"
          icon="📍"
          rules={validationRules.tempatLahir}
        />
        <DateField
          rules={validationRules.tanggalLahir}
          label={'Tanggal Lahir'}
          name={'tanggalLahir'}
        ></DateField>
        <SelectField
          label="Jenis Kelamin"
          name="jenisKelamin"
          options={[
            { label: 'Laki-laki', value: 'laki-laki' },
            { label: 'Perempuan', value: 'perempuan' },
          ]}
          rules={validationRules.jenisKelamin}
          icon="🚻"
        />
        <TextField
          label="Nomor Induk Kependudukan"
          placeholder="Masukkan NIK"
          name="nik"
          icon="🆔"
          rules={validationRules.nik}
        />
        <TextField
          label="Nomor Kartu Keluarga"
          placeholder="Masukkan Nomor KK"
          name="kk"
          icon="🏠"
          rules={validationRules.kk}
        />
        {[
          { label: 'Scan Akte Kelahiran', name: 'akte' },
          { label: 'Scan Kartu Keluarga', name: 'kartuKeluarga' },
          { label: 'Pas Foto Terbaru', name: 'pasFoto' },
        ].map((field, index) => (
          <UploadField
            key={index}
            placeholder={`Pilih File ${field.label}`}
            label={field.label}
            name={field.name}
            accept=".jpg,.jpeg,.png"
            maxSizeMB={1}
            rules={validationRules[field.name as keyof FieldValidationRule]}
          />
        ))}
        <CheckboxField
          onChange={(e) => {
            setAgreed(e.target.checked);
          }}
          label={'Saya menyetujui bahwa data yang saya berikan adalah benar.'}
          name={'agreement'}
        ></CheckboxField>
        <div
          style={{
            padding: '24px 0px',
            width: '100%',
            position: 'sticky',
            bottom: 0,
            backgroundColor: 'var(--background)',
            zIndex: 1000,
          }}
        >
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px 20px',
              backgroundColor: agreed
                ? 'dodgerblue'
                : 'var(--input-background)',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Kirim Data
          </button>
        </div>
      </form>
    </div>
  );
}
