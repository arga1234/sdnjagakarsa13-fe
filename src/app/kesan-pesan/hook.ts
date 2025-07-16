// src/app/feedback/hook.ts
'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { validateValue } from '@/src/util';
import { useRouter } from 'next/navigation';

export function useFeedbackHook() {
  const [agreed, setAgreed] = useState<boolean>(false);
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validationRules: any = useMemo(
    () => ({
      nama: [{ required: true, message: 'Mohon nama diisi/boleh isi anonim' }],
      kesan: [{ required: true, message: 'Kesan wajib diisi' }],
      pesan: [{ required: true, message: 'Pesan wajib diisi' }],
      rating: [{ required: true, message: 'Rating wajib dipilih' }],
    }),
    [],
  );

  const handleSubmitForm = useCallback(
    async (e: React.FormEvent<HTMLFormElement>, id: string | null) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      formData.append('idAcara', id || '');
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
        const res = await fetch('/api/kesan-pesan', {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) {
          throw new Error('Gagal mengirim data, silakan coba lagi.');
        }

        router.push(
          '/complete?message=Terima kasih atas kesan dan pesan Anda!',
        );
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
