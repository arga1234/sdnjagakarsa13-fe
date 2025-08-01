import { useCallback, useMemo, useState } from 'react';
import { Rules } from './types';

export function usePageHook() {
  const [tab, setTab] = useState<string>('biodata-murid');

  const biodataMuridLocalData = useCallback(() => {
    const x = JSON.parse(localStorage.getItem('biodata-murid') || '');
    if (x && x.wali === 'ya') return x.wali as 'ya' | 'tidak';

    return 'tidak';
  }, []);

  const rules: Rules = useMemo(() => {
    return {
      dokumen: {
        akteFile: [{ required: true }],
        kkFile: [{ required: true }],
        foto: [{required: true}]
      },
      kontak: {
        phoneNumber: [{ required: true }],
      },
      wali: {
        pendidikan: [{ required: true }],
        pekerjaan: [{ required: true }],
      },
      waliIbu: {
        nama: [{ required: true }],
        tahunLahir: [{ required: true }],
        pendidikan: [{ required: true }],
        pekerjaan: [{ required: true }],
        penghasilan: [{ required: true }],
      },
      murid: {
        nama: [{ required: true, message: 'Nama lengkap wajib diisi' }],
        nisn: [
          { required: false, message: 'NISN wajib diisi' },
          { pattern: /^\d+$/, message: 'NISN hanya boleh angka' },
          { minLength: 10, message: 'NISN minimal 10 digit' },
          { maxLength: 10, message: 'NISN maksimal 10 digit' },
        ],
        kewarganegaraan: [
          { required: true, message: 'Kewarganegaraan wajib dipilih' },
        ],
        nik: [
          { required: true, message: 'NIK wajib diisi' },
          { pattern: /^\d+$/, message: 'NIK hanya boleh angka' },
          { minLength: 16, message: 'NIK minimal 16 digit' },
          { maxLength: 16, message: 'NIK maksimal 16 digit' },
        ],
        kk: [
          { required: true, message: 'Nomor KK wajib diisi' },
          { pattern: /^\d+$/, message: 'Nomor KK hanya boleh angka' },
          { minLength: 16, message: 'Nomor KK minimal 16 digit' },
          { maxLength: 16, message: 'Nomor KK maksimal 16 digit' },
        ],
        noRegistrasiAkta: [
          { required: true, message: 'No. Registrasi Akta Lahir wajib diisi' },
        ],
        berkebutuhanKhusus: [{ required: false }],
        tempatLahir: [{ required: true, message: 'Tempat lahir wajib diisi' }],
        tanggalLahir: [
          { required: true, message: 'Tanggal lahir wajib diisi' },
        ],
        jenisKelamin: [
          { required: true, message: 'Jenis kelamin wajib dipilih' },
        ],
        agama: [
          { required: true, message: 'Agama & Kepercayaan wajib dipilih' },
        ],
        alamatJalan: [{ required: true, message: 'Alamat jalan wajib diisi' }],
        rt: [{ required: true, message: 'RT wajib diisi' }],
        rw: [{ required: true, message: 'RW wajib diisi' }],
        dusun: [],
        desaKelurahan: [
          { required: true, message: 'Desa/Kelurahan wajib diisi' },
        ],
        kodePos: [
          { required: true, message: 'Kode pos wajib diisi' },
          { pattern: /^\d+$/, message: 'Kode pos hanya boleh angka' },
        ],
        lintang: [{ required: false }],
        bujur: [{ required: false }],
        tempatTinggal: [
          { required: true, message: 'Tempat tinggal wajib diisi' },
        ],
        modaTransportasi: [
          { required: true, message: 'Moda transportasi wajib diisi' },
        ],
        anakKeberapa: [
          { required: true, message: 'Anak ke-berapa wajib diisi' },
          { pattern: /^\d+$/, message: 'Harus berupa angka' },
        ],
        agreement: [
          {
            required: true,
            message: 'Anda harus menyetujui data yang diberikan',
          },
        ],
      },
    };
  }, []);

  return {
    tab,
    setTab,
    biodataMuridLocalData,
    rules,
  };
}
