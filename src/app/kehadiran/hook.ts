import React, { useCallback, useMemo, useState } from 'react';
import { validateValue } from '@/src/util';
import { useRouter } from 'next/navigation';

export function useAbsensiOnlineHook() {
  const [agreed, setAgreed] = useState<boolean>(false);
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validationRules: any = useMemo(
    () => ({
      namaAnak: [{ required: true, message: 'Nama lengkap anak wajib diisi' }],
      namaOrtu: [
        { required: true, message: 'Nama orang tua/wali wajib diisi' },
      ],
      noHp: [
        { required: true, message: 'Nomor HP wajib diisi' },
        { pattern: /^\d+$/, message: 'Nomor HP hanya boleh angka' },
      ],
      statusGrup: [{ required: true, message: 'Status grup wajib dipilih' }],
      tanggalAbsensi: [
        { required: true, message: 'Tanggal absensi wajib diisi' },
      ],
      statusHadir: [
        { required: true, message: 'Status kehadiran wajib dipilih' },
      ],
      // Keterangan tidak wajib, jadi tidak divalidasi
    }),
    [],
  );

  const handleSubmitForm = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const newErrors: Record<string, string> = {};

      Object.keys(validationRules).forEach((fieldName) => {
        const rules = validationRules[fieldName] || [];

        const entries = formData.getAll(fieldName);
        let value: string | File | File[] | null = null;

        if (entries.length === 1) {
          value = entries[0];
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
            Object.values(newErrors).join('\n'),
        );
        return;
      }

      try {
        const res = await fetch('/api/absensi-online', {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) {
          throw new Error('Gagal mengirim absensi, silakan coba lagi.');
        }

        router.push('/complete?message=Absensi berhasil dikirim');
      } catch (error) {
        alert((error as Error).message);
      }
    },
    [router, validationRules],
  );

  return {
    agreed,
    setAgreed,
    validationRules,
    handleSubmitForm,
  };
}
