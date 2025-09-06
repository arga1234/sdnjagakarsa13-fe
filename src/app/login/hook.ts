/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BiodataDapodik,
  KontakForm,
  SiswaBodyDto,
  WaliForm,
} from '@/src/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function transformBiodataDtoToAppBody({
  murid,
  ayah,
  ibu,
  wali,
  kontak,
}: BiodataDapodik) {
  const muridBody: SiswaBodyDto = {
    nama: murid.nama,
    nisn: murid.nisn,
    kewarganegaraan: murid.kewarganegaraan,
    nik: murid.nik,
    kk: murid.kk,
    noRegistrasiAkta: murid.noregistrasiakta,
    tempatLahir: murid.tempatlahir,
    tanggalLahir: murid.tanggallahir,
    jenisKelamin: murid.jeniskelamin,
    agama: murid.agama,
    wali: murid.wali,
    alamatJalan: murid.alamatjalan,
    rt: murid.rt,
    rw: murid.rw,
    desaKelurahan: murid.desakelurahan,
    kodePos: murid.kodepos,
    lintang: murid.lintang,
    bujur: murid.bujur,
    tempatTinggal: murid.tempattinggal,
    modaTransportasi: murid.modatransportasi,
    anakKeberapa: murid.anakkeberapa,
    penerimaKPSPKH: murid.penerimakpspkh,
    punyaKIP: murid.punyakip,
    berkebutuhanKhusus: murid.berkebutuhankhusus,
    tetapMenerimaPIP: murid.tetapmenerimapip,
    berhakMenerimaPIP: murid.berhakmenerimapip,
    alasanMenolakPIP: murid.alasanmenolakpip,
    alasanBerhakPIP: murid.alasanberhakpip,
    dusun: murid.dusun,
  };
  const ayahBody: WaliForm = {
    nama: ayah.nama,
    nik: ayah.nik,
    tahunLahir: ayah.tahunlahir,
    pendidikan: ayah.pendidikan,
    pekerjaan: ayah.pekerjaan,
    penghasilan: ayah.penghasilan,
    kebutuhanKhusus: ayah.kebutuhankhusus,
  };
  const ibuBody: WaliForm = {
    nama: ibu.nama,
    nik: ibu.nik,
    tahunLahir: ibu.tahunlahir,
    pendidikan: ibu.pendidikan,
    pekerjaan: ibu.pekerjaan,
    penghasilan: ibu.penghasilan,
    kebutuhanKhusus: ibu.kebutuhankhusus,
  };
  const waliBody: WaliForm = {
    nama: wali.nama,
    nik: wali.nik,
    tahunLahir: wali.tahunlahir,
    pendidikan: wali.pendidikan,
    pekerjaan: wali.pekerjaan,
    penghasilan: wali.penghasilan,
    kebutuhanKhusus: wali.kebutuhankhusus,
  };
  const kontakBody: KontakForm = {
    telpRumah: kontak.telprumah,
    phoneNumber: kontak.phonenumber,
    email: kontak.email,
  };

  return {
    murid: muridBody,
    ayah: ayahBody,
    ibu: ibuBody,
    wali: waliBody,
    kontak: kontakBody,
  };
}

export function useCheckInHook() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const formData = new FormData(form);
    const fields = Array.from(formData.entries()).map(([key, value]) => ({
      key,
      value,
    }));
    const body = fields.reduce<Record<string, unknown>>(
      (acc, { key, value }) => {
        acc[key] = value;
        return acc;
      },
      {},
    );
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(
        `/api/dapodik/get-biodata-dapodik/${body.nik}?tglLahirMurid=${body.tglLahirMurid}&thnLahirIbu=${body.thnLahirIbu}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        },
      );

      if (!res.ok) throw new Error('Login gagal');
      const result: {
        data: BiodataDapodik;
        success: true;
      } = await res.json();
      if (result.success) {
        const x = transformBiodataDtoToAppBody(result.data);
        Object.entries(x).forEach(([key, value]) => {
          localStorage.setItem(`data-biodata-${key}`, JSON.stringify(value));
        });
        router.push('/biodata-murid?edit=true');
      }
    } catch (err) {
      console.error(err);
      setError('🚫 Pastikan data yang dimasukan lengkap dan benar 😢');
    } finally {
      setLoading(false);
    }
  };

  return { setLoading, loading, error, handleLogin };
}
