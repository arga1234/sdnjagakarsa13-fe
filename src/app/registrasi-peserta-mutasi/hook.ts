import React, { useCallback, useMemo, useState } from 'react';
import { validateValue } from '@/src/util';
import { useRouter } from 'next/navigation';

export function useRegistrasiMutasiHook() {
  const [agreed, setAgreed] = useState<boolean>(false);
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validationRules: any = useMemo(
    () => ({
      nama: [{ required: true, message: 'Nama lengkap wajib diisi' }],
      asalSekolah: [{ required: true, message: 'Asal sekolah wajib diisi' }],
      kelasTujuan: [{ required: true, message: 'Kelas tujuan wajib dipilih' }],
      tanggalLahir: [{ required: true, message: 'Tanggal lahir wajib diisi' }],
      jenisKelamin: [{ required: true, message: 'Jenis kelamin wajib dipilih' }],
      nik: [
        { required: true, message: 'NIK wajib diisi' },
        { pattern: /^\d+$/, message: 'NIK hanya boleh angka' },
        { minLength: 16, message: 'NIK minimal 16 digit' },
        { maxLength: 16, message: 'NIK maksimal 16 digit' },
      ],
      kk: [
        { required: true, message: 'KK wajib diisi' },
        { pattern: /^\d+$/, message: 'KK hanya boleh angka' },
        { minLength: 16, message: 'KK minimal 16 digit' },
        { maxLength: 16, message: 'KK maksimal 16 digit' },
      ],
      whatsapp: [{ required: true, message: 'No Whatsapp wajib diunggah' }, { pattern: /^\d+$/, message: 'No Whatsapp hanya boleh angka' }],
      rapor: [{ required: true, message: 'Scan rapor wajib diunggah' }],
      kartuKeluarga: [
        { required: true, message: 'Scan kartu keluarga wajib diunggah' },
      ],
      pasFoto: [
        { required: true, message: 'Pas foto wajib diunggah' },
      ],
    }),
    []
  );

  const handleSubmitForm = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const newErrors: Record<string, string> = {};

      Object.keys(validationRules).forEach((fieldName) => {
        const rules = validationRules[fieldName] || [];

        const entries = formData.getAll(fieldName);
        console.log('entries', fieldName, entries);
        let value: string | File | File[] | null = null;

        if (entries.length === 1) {
          value = entries[0]; // bisa string atau File
        } else if (entries.length > 1) {
          const fileArray = entries.filter((v): v is File => v instanceof File);
          value = fileArray;
        }

        const error = validateValue(value, rules);
        if (error) {
          newErrors[fieldName] = error;
        }
      });



      if (Object.keys(newErrors).length > 0) {
        alert(
          'Ada kesalahan dalam pengisian form:\n' +
            Object.values(newErrors).join('\n')
        );
        return;
      }

      try {
        const res = await fetch('/api/registrasi-mutasi', {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) {
          throw new Error('Gagal mengirim data, silakan coba lagi.');
        }

        router.push('/complete?message=Pendaftaran Mutasi Telah Berhasil');
      } catch (error) {
        alert((error as Error).message);
      }
    },
    [router, validationRules]
  );

  return {
    agreed,
    setAgreed,
    validationRules,
    handleSubmitForm,
  };
}
