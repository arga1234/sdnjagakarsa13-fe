/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useMemo, useState } from 'react';
import { Rules } from './types';
import { tabMemo } from './data';
import { validateValue, ValidationRule } from '../../util';

export interface ValidationError {
  tab: keyof typeof tabMemo;
  field: string;
  message: string;
}

export function usePageHook() {
  const [tab, setTab] = useState<string>('biodata-murid');

  const biodataMuridLocalData = useCallback(() => {
    const x = JSON.parse(localStorage.getItem(`data-${tabMemo.murid}`) || '');
    if (x && x.wali === 'ya') return x.wali as 'ya' | 'tidak';

    return 'tidak';
  }, []);

  const rules: Rules = useMemo(() => {
    return {
      dokumen: {
        akteFile: [{ required: true }],
        kkFile: [{ required: true }],
        foto: [{ required: true }],
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

  const submit = useCallback(
    (formData: FormData): ValidationError[] => {
      const errors: ValidationError[] = [];

      // mapping dari tabMemo key ke rules key
      const rulesMapping: Record<keyof typeof tabMemo, keyof Rules> = {
        murid: 'murid',
        ayah: 'wali',
        ibu: 'waliIbu',
        wali: 'wali',
        kontak: 'kontak',
        dokumen: 'dokumen',
      };

      (Object.keys(tabMemo) as Array<keyof typeof tabMemo>).forEach((tabKey) => {
        const ruleGroupKey = rulesMapping[tabKey];
        const ruleGroup: any = rules[ruleGroupKey] || {};

        if (tabKey === 'dokumen') {
          // >> cek FormData untuk tab 'dokumen'
          Object.keys(ruleGroup).forEach((fieldName) => {
            const fieldRules: ValidationRule[] = ruleGroup[fieldName] || [];
            const entry = formData.getAll(fieldName);
            // bisa berupa File[] atau string[]
            const value =
              entry.length > 1
                ? (entry as File[])
                : entry[0] instanceof File
                ? (entry[0] as File)
                : (entry[0] as string);

            const errorMsg = validateValue(value, fieldRules);
            if (errorMsg) {
              errors.push({ tab: tabKey, field: fieldName, message: errorMsg });
            }
          });
        } else {
          // >> cek localStorage untuk tab selain 'dokumen'
          const storageKey = tabMemo[tabKey];
          const raw = localStorage.getItem(`data-${storageKey}`);
          if (!raw) return;

          let data: Record<string, any>;
          try {
            data = JSON.parse(raw);
          } catch {
            console.warn(`Gagal parse JSON untuk key data-${storageKey}`);
            return;
          }

          Object.entries(data).forEach(([fieldName, value]) => {
            const fieldRules: ValidationRule[] = ruleGroup[fieldName] || [];
            const errorMsg = validateValue(
              value as string | File | File[] | null,
              fieldRules,
            );
            if (errorMsg) {
              errors.push({
                tab: tabKey,
                field: fieldName,
                message: errorMsg,
              });
            }
          });
        }
      });

      return errors;
    },
    [rules],
  );

  const handleSubmitForm = useCallback(
    (
      e: React.FormEvent<HTMLFormElement>,
      nextButton: () => void,
      previousButton: () => void,
      localstorageName: string,
    ) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const jsonObject: Record<string, FormDataEntryValue> = {};
      for (const [key, value] of formData.entries()) {
        jsonObject[key] = value;
      }
      localStorage.setItem(
        `data-${localstorageName}`,
        JSON.stringify(jsonObject),
      );
      const submitter = (e.nativeEvent as SubmitEvent)
        .submitter as HTMLButtonElement;
      if (submitter && submitter.value === 'next') {
        nextButton();
      } else if(submitter && submitter.value === 'submit') {
        const errors = submit(formData);
        if (errors.length > 0) {
          const groupedErrors = errors.reduce<Record<string, string[]>>((acc, error) => {
            const section = `Bagian ${error.tab}`;
            if (!acc[section]) {
              acc[section] = [];
            }
            acc[section].push(`${error.field}: ${error.message}`);
            return acc;
          }, {});

          let alertMessage = 'Terdapat kesalahan pada form:\n\n';
          Object.entries(groupedErrors).forEach(([section, messages]) => {
            alertMessage += `${section}:\n${messages.join('\n')}\n\n`;
          });

          alert(alertMessage);
        }
      } else {
        previousButton();
      }
    },
    [submit],
  );

  const loadFormDataFromLocalStorage = useCallback(
    (formId: string, storageKey: string) => {
      const form = document.getElementById(formId) as HTMLFormElement | null;
      if (!form) {
        console.warn(`Form dengan id '${formId}' tidak ditemukan.`);
        return;
      }

      const saved = localStorage.getItem(storageKey);

      if (!saved) return;

      try {
        const data = JSON.parse(saved);

        Object.entries(data).forEach(([key, value]) => {
          const field = form.querySelector(`[name="${key}"]`) as
            | HTMLInputElement
            | HTMLSelectElement
            | HTMLTextAreaElement
            | null;

          if (field && field.type === 'date') {
            const dateLabel = form.querySelector(
              `#date-of-${key}`,
            ) as HTMLSpanElement | null;
            if (dateLabel) {
              const [year, month, day] = (value as string).split('-');
              const formattedDate = `${day}/${month}/${year}`;
              field.value = value as string; // Set value for date input
              dateLabel.textContent = formattedDate;
            }
          } else if (field && field.type === 'file') {
            const fileLabel = form.querySelector(
              `#file-of-${key}`,
            ) as HTMLSpanElement | null;
            if (fileLabel) {
              console.log(value)
            }
          } else if (field) {
            field.value = String(value);
            // Optional: trigger 'input' event (jika kamu pakai React atau library lain yang mendengarkan perubahan)
            field.dispatchEvent(new Event('input', { bubbles: true }));
          }
        });
      } catch (err) {
        console.error('Gagal parse form data dari localStorage:', err);
      }
    },
    [],
  );

  return {
    tab,
    setTab,
    biodataMuridLocalData,
    rules,
    handleSubmitForm,
    loadFormDataFromLocalStorage,
  };
}
