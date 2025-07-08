import React, { useCallback, useMemo, useState } from 'react';
import { validateValue } from '@/src/util';
import { useRouter } from 'next/navigation';
import { FieldValidationRule } from './types';

export function useRegistrasiUlangHook() {
      const [agreed, setAgreed] = useState<boolean>(false);
      const router = useRouter();
      const validationRules: FieldValidationRule = useMemo(
        () => ({
          nama: [{ required: true, message: 'Nama lengkap wajib diisi' }],
          tempatLahir: [{ required: true, message: 'Tempat lahir wajib diisi' }],
          tanggalLahir: [{ required: true, message: 'Tanggal lahir wajib diisi' }],
          jenisKelamin: [
            { required: true, message: 'Jenis kelamin wajib dipilih' },
          ],
          nik: [
            { required: true, message: 'NIK Wajib diisi' },
            { pattern: /^\d+$/, message: 'NIK Hanya boleh angka' },
            { minLength: 16, message: 'NIK Minimal 16 digit' },
            { maxLength: 16, message: 'NIK Maksimal 16 digit' },
          ],
          kk: [
            { required: true, message: 'Nomor KK Wajib diisi' },
            { pattern: /^\d+$/, message: 'Nomor KK Hanya boleh angka' },
            { minLength: 16, message: 'Nomor KK Minimal 16 digit' },
            { maxLength: 16, message: 'Nomor KK Maksimal 16 digit' },
          ],
          akte: [{ required: true, message: 'Scan Akte tidak boleh kosong' }],
          kartuKeluarga: [
            { required: true, message: 'Scan Kartu Keluarga tidak boleh kosong' },
          ],
          pasFoto: [
            { required: true, message: 'Scan Pas Foto tidak boleh kosong' },
          ],
        }),
        [],
      );
    
      const handleSubmitForm = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const newErrors: Record<string, string> = {};
    
          Object.keys(validationRules).forEach((fieldName) => {
            const x = fieldName as keyof FieldValidationRule;
            const rules = validationRules[x];
            const value = formData.get(fieldName);
            const error = validateValue(value, rules ? rules : []);
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
          } else {
            try {
              const res = await fetch('/api/registrasi', {
                method: 'POST',
                body: formData,
              });
              if (!res.ok) {
                throw new Error('Gagal mengirim data, silakan coba lagi.');
              } else {
                router.push('/complete?message=Biodata Murid Telah Diisi');
              }
            } catch (error) {
              alert((error as Error).message);
            }
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