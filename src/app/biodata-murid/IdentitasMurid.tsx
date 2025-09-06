/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useCallback, useEffect } from 'react';
import { DateField, SelectField, TextField } from '../../components/fieldv2';
import { useRegistrasiUlangHook } from './hookIdentitasMurid';
import { BiodataMuridValidation } from './types';
import { tabMemo } from './data';
import { usePageHook } from './hookPage';
import dynamic from 'next/dynamic';
const LeafletMap = dynamic(() => import('@/src/components/LeafletMap'), {
  ssr: false,
});

export function IdentitasMurid({
  validationRules,
  nextButton,
  previousButton,
  handleSubmitForm,
  formId,
}: {
  formId: string;
  nextButton: () => void;
  previousButton: () => void;
  validationRules: BiodataMuridValidation;
  handleSubmitForm: (
    e: React.FormEvent<HTMLFormElement>,
    nextButton: () => void,
    previousButton: () => void,
    localstorageName: string,
  ) => void;
}) {
  const {
    isKewarganegaraanLainnyaVisible,
    setIsKewarganegaraanLainnyaVisible,
    punyaKIPValue,
    setPunyaKIPValue,
    tetapMenerimaPIPValue,
    berhakMenerimaPIPValue,
    setTetapMenerimaPIPValue,
    setBerhakMenerimaPIPValue,
    bujur,
    lintang,
    setShowMap,
    showMap,
    setBujur,
    setLintang,
  } = useRegistrasiUlangHook();
  const { loadFormDataFromLocalStorage } = usePageHook();
  const submit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      handleSubmitForm(e, nextButton, previousButton, tabMemo.murid);
    },
    [handleSubmitForm, nextButton, previousButton],
  );

  const agamaOptions = [
    { label: 'Islam', value: 'islam' },
    { label: 'Kristen', value: 'kristen' },
    { label: 'Katolik', value: 'katolik' },
    { label: 'Hindu', value: 'hindu' },
    { label: 'Buddha', value: 'buddha' },
    { label: 'Konghucu', value: 'konghucu' },
    { label: 'Lainnya', value: 'lainnya' },
  ];

  useEffect(() => {
    loadFormDataFromLocalStorage(tabMemo.murid, `data-${tabMemo.murid}`);
  }, [loadFormDataFromLocalStorage]);

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
          <b>BIODATA MURID</b>
        </h4>
        <p>SD Negeri Jagakarsa 13 Pagi</p>
      </div>
      <form
        id={formId}
        style={{ maxWidth: '800px', margin: '0 auto' }}
        onSubmit={submit}
      >
        <TextField
          label="Nama Lengkap"
          placeholder="Masukkan Nama Lengkap"
          name="nama"
          icon="👤"
          rules={validationRules.nama}
        />
        <TextField
          label="NISN"
          placeholder="Masukkan NISN"
          name="nisn"
          icon="🔢"
        />
        <SelectField
          label="Kewarganegaraan"
          name="kewarganegaraan"
          options={[
            { label: 'Indonesia', value: 'indonesia' },
            { label: 'Lainnya', value: 'lainnya' },
          ]}
          rules={validationRules.kewarganegaraan}
          icon="🌐"
          onChange={(e) => {
            setIsKewarganegaraanLainnyaVisible(e.target.value === 'lainnya');
          }}
        />
        {isKewarganegaraanLainnyaVisible && (
          <TextField
            label="Kewarganegaraan (Lainnya)"
            placeholder="Masukkan Kewarganegaraan"
            name="kewarganegaraanLainnya"
            icon="🌎"
            // Tidak perlu rules karena opsional
          />
        )}
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
        <TextField
          label="No. Registrasi Akta Lahir"
          placeholder="Masukkan No. Registrasi Akta Lahir"
          name="noRegistrasiAkta"
          icon="📑"
          rules={validationRules.noRegistrasiAkta}
        />
        <SelectField
          label="Berkebutuhan Khusus"
          name="berkebutuhanKhusus"
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
        <TextField
          label="Tempat Lahir"
          placeholder="Masukkan Tempat Lahir"
          name="tempatLahir"
          icon="📍"
          rules={validationRules.tempatLahir}
        />
        <DateField
          label="Tanggal Lahir"
          name="tanggalLahir"
          rules={validationRules.tanggalLahir}
        />
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
        <SelectField
          label="Agama & Kepercayaan"
          name="agama"
          options={agamaOptions}
          rules={validationRules.agama}
          icon="🛐"
        />
        <SelectField
          label="Apakah punya wali/pendamping selain orang tua ?"
          name="wali"
          options={[
            { label: 'Ya', value: 'ya' },
            { label: 'Tidak', value: 'tidak' },
          ]}
          rules={[{ required: true }]}
          icon="👨‍👩‍👦"
        />
        <TextField
          label="Domisili Alamat tempat tinggal (No Rumah & Jalan) "
          placeholder="Masukkan sesuai domisili"
          name="alamatJalan"
          icon="🛣️"
          rules={validationRules.alamatJalan}
        />
        <div style={{ width: '100%', display: 'flex', gap: '16px' }}>
          <div style={{ flex: '1', width: '100%' }}>
            <TextField
              label="RT"
              placeholder="Masukkan sesuai domisili"
              name="rt"
              icon="🏘️"
              rules={validationRules.rt}
            />
          </div>
          <div style={{ flex: '1', width: '100%' }}>
            <TextField
              label="RW"
              placeholder="Masukkan sesuai domisili"
              name="rw"
              icon="🏘️"
              rules={validationRules.rw}
            />
          </div>
        </div>
        <TextField
          label="Nama Dusun (bila ada, sesuai domisili)"
          placeholder="Masukkan Nama Dusun"
          name="dusun"
          icon="🌄"
          rules={validationRules.dusun}
        />
        <TextField
          label="Kelurahan (sesuai domisili)"
          placeholder="Masukkan Kelurahan"
          name="desaKelurahan"
          icon="🏡"
          rules={validationRules.desaKelurahan}
        />
        <TextField
          label="Kode Pos (sesuai domisili)"
          placeholder="Masukkan Kode Pos"
          name="kodePos"
          icon="✉️"
          rules={validationRules.kodePos}
        />
        <div
          onClick={() => setShowMap(true)}
          style={{
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {showMap && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '10px 0px',
              }}
            >
              <p style={{ marginBottom: '10px' }}>
                Ubah posisi marker(pin biru) ke lokasi tempat tinggal Anda
              </p>
              <LeafletMap
                onSetPosition={(lat, lng) => {
                  setLintang(lat.toString());
                  setBujur(lng.toString());
                }}
              />
            </div>
          )}
          <TextField
            label="Lintang"
            placeholder="Masukkan Lintang"
            name="lintang"
            icon="📍"
            value={lintang}
            rules={validationRules.lintang}
          />
          <TextField
            label="Bujur"
            placeholder="Masukkan Bujur"
            name="bujur"
            icon="📍"
            value={bujur}
            rules={validationRules.bujur}
          />
        </div>
        <SelectField
          label="Tempat Tinggal"
          name="tempatTinggal"
          options={[
            { label: 'Bersama orang tua', value: 'Bersama orang tua' },
            { label: 'Wali', value: 'Wali' },
            { label: 'Kost', value: 'Kost' },
            { label: 'Asrama', value: 'Asrama' },
            { label: 'Panti asuhan', value: 'Panti asuhan' },
            { label: 'Pesantren', value: 'Pesantren' },
            { label: 'Lainnya', value: 'Lainnya' },
          ]}
          rules={validationRules.tempatTinggal}
          icon="🏠"
        />
        <SelectField
          label="Moda Transportasi"
          name="modaTransportasi"
          options={[
            { label: 'Jalan kaki', value: 'Jalan kaki' },
            {
              label: 'Angkutan umum/bus/pete-pete',
              value: 'Angkutan umum/bus/pete-pete',
            },
            {
              label: 'Mobil/bus antar jemput',
              value: 'Mobil/bus antar jemput',
            },
            { label: 'Kereta api', value: 'Kereta api' },
            { label: 'Ojek', value: 'Ojek' },
            {
              label: 'Andong/bendi/sado/dokar/delman/becak',
              value: 'Andong/bendi/sado/dokar/delman/becak',
            },
            {
              label: 'Perahu penyeberangan/rakit/getek',
              value: 'Perahu penyeberangan/rakit/getek',
            },
            { label: 'Kuda', value: 'Kuda' },
            { label: 'Sepeda', value: 'Sepeda' },
            { label: 'Sepeda motor', value: 'Sepeda motor' },
            { label: 'Mobil pribadi', value: 'Mobil pribadi' },
            { label: 'Lainnya', value: 'Lainnya' },
          ]}
          rules={validationRules.modaTransportasi}
          icon="🛵"
        />
        <TextField
          label="Anak Ke-berapa (berdasarkan KK)"
          placeholder="Masukkan urutan anak"
          name="anakKeberapa"
          icon="🔢"
          rules={validationRules.anakKeberapa}
        />
        <SelectField
          label="Penerima KPS(Kartu Perlindunagn Sosial)/PKH(Program Keluarga Harapan) ?"
          name="penerimaKPSPKH"
          options={[
            { label: 'Ya', value: 'ya' },
            { label: 'Tidak', value: 'tidak' },
          ]}
          rules={[{ required: true, message: 'Wajib memilih Ya atau Tidak' }]}
        />
        <SelectField
          label="Apakah punya KIP(Kartu Indonesia Pintar)?"
          name="punyaKIP"
          options={[
            { label: 'Ya', value: 'ya' },
            { label: 'Tidak', value: 'tidak' },
          ]}
          rules={[{ required: true, message: 'Wajib memilih Ya atau Tidak' }]}
          onChange={(e) => {
            setPunyaKIPValue(e.target.value);
            setTetapMenerimaPIPValue(undefined);
            setBerhakMenerimaPIPValue(undefined);
          }}
        />
        {punyaKIPValue === 'ya' && (
          <SelectField
            label="Apakah peserta didik tetap akan menerima bantuan Program Indonesia Pintar(PIP)?"
            name="tetapMenerimaPIP"
            options={[
              { label: 'Ya', value: 'ya' },
              { label: 'Tidak', value: 'tidak' },
            ]}
            rules={[
              {
                required: true,
                message: 'Pertanyaan ini wajib diisi jika punya KIP',
              },
            ]}
            onChange={(e) => setTetapMenerimaPIPValue(e.target.value)}
          />
        )}
        {punyaKIPValue === 'tidak' && (
          <SelectField
            label="Apakah peserta didik berhak menerima bantuan Program Indonesia Pintar(PIP)?"
            name="berhakMenerimaPIP"
            onChange={(e) => setBerhakMenerimaPIPValue(e.target.value)}
            options={[
              { label: 'Ya', value: 'ya' },
              { label: 'Tidak', value: 'tidak' },
            ]}
            rules={[
              {
                required: true,
                message: 'Pertanyaan ini wajib diisi jika tidak punya KIP',
              },
            ]}
          />
        )}
        {punyaKIPValue === 'ya' && tetapMenerimaPIPValue === 'tidak' && (
          <SelectField
            label="Alasan menolak PIP"
            name="alasanMenolakPIP"
            options={[
              {
                label: 'Dilarang pemda karena menerima bantuan serupa',
                value: 'dilarang_pemda',
              },
              { label: 'Menolak', value: 'menolak' },
              { label: 'Sudah Mampu', value: 'sudah mampu' },
            ]}
            rules={[
              { required: true, message: 'Alasan menolak PIP wajib diisi' },
            ]}
          />
        )}
        {punyaKIPValue === 'tidak' && berhakMenerimaPIPValue === 'ya' && (
          <SelectField
            label="Alasan berhak menerima bantuan PIP"
            name="alasanBerhakPIP"
            options={[
              { label: 'Daerah Konflik', value: 'Daerah Konflik' },
              { label: 'Dampak Bencana Alam', value: 'Dampak Bencana Alam' },
              { label: 'Kelainan Fisik', value: 'Kelainan Fisik' },
              {
                label: 'Keluarga Terpidana/ Berada di LAPAS',
                value: 'Keluarga Terpidana/ Berada di LAPAS',
              },
              { label: 'Pemegang PKH/KPS/KKS', value: 'Pemegang PKH/KPS/KKS' },
              { label: 'Pernah Drop Out', value: 'Pernah Drop Out' },
              {
                label: 'Siswa Miskin/Rentan Miskin',
                value: 'Siswa Miskin/Rentan Miskin',
              },
              {
                label: 'Yatim Piatu/Panti Asuhan/Panti Sosial',
                value: 'Yatim Piatu/Panti Asuhan/Panti Sosial',
              },
            ]}
            rules={[
              {
                required: true,
                message: 'Alasan wajib diisi jika peserta berhak menerima PIP',
              },
            ]}
          />
        )}

        <div
          style={{
            padding: '24px 0px',
            width: '100%',
            position: 'sticky',
            bottom: 0,
            backgroundColor: 'transparent',
            backdropFilter: 'blur(10px)',
            zIndex: 1000,
          }}
        >
          <button
            type="submit"
            value={'next'}
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
