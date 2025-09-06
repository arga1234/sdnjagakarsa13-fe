/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useMemo, useState } from 'react';
import { Rules } from './types';
import { tabMemo } from './data';
import { validateValue, ValidationRule } from '../../util';
import { useRouter, useSearchParams } from 'next/navigation';

export interface ValidationError {
  tab: keyof typeof tabMemo;
  field: string;
  message: string;
}

export function usePageHook() {
  const [tab, setTab] = useState<string>('biodata-murid');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const biodataMuridLocalData = useCallback(() => {
    const x = JSON.parse(localStorage.getItem(`data-${tabMemo.murid}`) || '');
    if (x && x.wali === 'ya') return x.wali as 'ya' | 'tidak';

    return 'tidak';
  }, []);

  const isEdit = useSearchParams().get('edit') === 'true';

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
      ayah: {
        nama: [],
        tahunLahir: [],
        pendidikan: [],
        pekerjaan: [],
        penghasilan: [],
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
        lintang: [{ required: true }],
        bujur: [{ required: true }],
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
        penerimaKPSPKH: [
          { required: true, message: 'Penerima KPS/PKH wajib dipilih' },
        ],
        punyaKIP: [{ required: true, message: 'Punya KIP wajib dipilih' }],
      },
      periodik: {
        tinggiBadan: [{ required: true, message: 'Tinggi badan wajib diisi' }],
        beratBadan: [{ required: true, message: 'Berat badan wajib diisi' }],
        jumlahSaudara: [
          { required: true, message: 'Jumlah saudara wajib diisi' },
        ],
      },
    };
  }, []);

  const submit = useCallback(
    (formData: FormData) => {
      const errors: ValidationError[] = [];

      const rulesMapping: Record<keyof typeof tabMemo, keyof Rules> = {
        murid: 'murid',
        ayah: 'ayah',
        ibu: 'waliIbu',
        wali: 'wali',
        kontak: 'kontak',
        dokumen: 'dokumen',
        periodik: 'periodik',
      };

      const jsonData: Record<string, any> = {};

      // Ambil data murid terlebih dahulu (dipakai juga untuk cek wali)
      const muridStorageKey = tabMemo.murid;
      const rawMurid = localStorage.getItem(`data-${muridStorageKey}`);
      let muridData: Record<string, any> = {};
      if (rawMurid) {
        try {
          muridData = JSON.parse(rawMurid);
        } catch {
          console.warn(`Gagal parse JSON untuk key data-${muridStorageKey}`);
        }
      }
      jsonData.murid = muridData;

      (Object.keys(tabMemo) as Array<keyof typeof tabMemo>).forEach(
        (tabKey) => {
          // Skip validasi tab wali kalau murid.wali !== "ya"
          if (tabKey === 'wali' && muridData.wali !== 'ya') {
            jsonData[tabKey] = {};
            return;
          }

          const ruleGroupKey = rulesMapping[tabKey];
          const ruleGroup: any = rules[ruleGroupKey] || {};

          if (tabKey === 'dokumen') {
            const filesData: Record<string, File | File[]> = {};

            Object.keys(ruleGroup).forEach((fieldName) => {
              const entry = formData.getAll(fieldName);
              const value =
                entry.length > 1 ? (entry as File[]) : (entry[0] as File);
              filesData[fieldName] = value;

              // ✅ Skip validasi dokumen kalau isEdit === true
              if (!isEdit) {
                const fieldRules: ValidationRule[] = ruleGroup[fieldName] || [];
                const errorMsg = validateValue(value, fieldRules);

                if (errorMsg) {
                  errors.push({
                    tab: tabKey,
                    field: fieldName,
                    message: errorMsg,
                  });
                }
              }
            });

            jsonData[tabKey] = filesData;
          } else {
            const storageKey = tabMemo[tabKey];
            const raw = localStorage.getItem(`data-${storageKey}`);

            let data: Record<string, any> = {};
            if (raw) {
              try {
                data = JSON.parse(raw);
              } catch {
                console.warn(`Gagal parse JSON untuk key data-${storageKey}`);
              }
            }

            // Validasi reguler berdasarkan rules
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

            // ✅ Validasi khusus tab murid
            if (tabKey === 'murid') {
              const { punyaKIP, tetapMenerimaPIP, berhakMenerimaPIP } = data;
              console.log('haii');
              console.log(
                'tetapMenerimaPIP, berhakMenerimaPIP',
                tetapMenerimaPIP,
                berhakMenerimaPIP,
              );
              if (punyaKIP === 'ya') {
                if (!tetapMenerimaPIP) {
                  errors.push({
                    tab: 'murid',
                    field: 'tetapMenerimaPIP',
                    message: 'Tetap Menerima PIP wajib diisi jika punya KIP',
                  });
                }
                if (tetapMenerimaPIP !== 'ya' && !data.alasanMenolakPIP) {
                  errors.push({
                    tab: 'murid',
                    field: 'alasanMenolakPIP',
                    message:
                      'Alasan Menolak PIP wajib diisi jika tidak tetap menerima PIP',
                  });
                }
              } else {
                if (!berhakMenerimaPIP) {
                  errors.push({
                    tab: 'murid',
                    field: 'berhakMenerimaPIP',
                    message:
                      'Berhak Menerima PIP wajib diisi jika tidak punya KIP',
                  });
                }
                if (berhakMenerimaPIP === 'ya' && !data.alasanBerhakPIP) {
                  errors.push({
                    tab: 'murid',
                    field: 'alasanBerhakPIP',
                    message:
                      'Alasan Berhak PIP wajib diisi jika berhak menerima PIP',
                  });
                }
              }
            }

            jsonData[tabKey] = data;
          }
        },
      );

      console.log(jsonData);

      if (errors.length > 0) {
        const groupedErrors = errors.reduce<Record<string, string[]>>(
          (acc, error) => {
            const section = `Bagian ${error.tab}`;
            if (!acc[section]) {
              acc[section] = [];
            }
            acc[section].push(`${error.field}: ${error.message}`);
            return acc;
          },
          {},
        );

        let alertMessage = 'Terdapat kesalahan pada form:\n\n';
        Object.entries(groupedErrors).forEach(([section, messages]) => {
          alertMessage += `${section}:\n${messages.join('\n')}\n\n`;
        });

        alert(alertMessage);
      } else {
        setLoading(true);
        const payload = jsonToFormData(jsonData);

        // Tentukan endpoint berdasarkan mode edit atau create
        const endpoint = isEdit
          ? `/api/dapodik/update-peserta-didik/${muridData.nik}`
          : '/api/dapodik/create-peserta-didik';

        fetch(endpoint, {
          method: 'POST', // atau PUT kalau API update kamu minta PUT
          body: payload,
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(
                isEdit ? 'Gagal memperbarui data' : 'Gagal mengirim data',
              );
            }
            return response.json();
          })
          .then(() => {
            setLoading(false);
            router.push(
              isEdit
                ? '/complete?message=Berhasil memperbarui data peserta didik'
                : '/complete?message=Berhasil mengirim data peserta didik untuk data dapodik nasional',
            );
          })
          .catch((error) => {
            setLoading(false);
            alert(error.message);
          });
      }
    },
    [router, rules, isEdit],
  );

  const jsonToFormData = (jsonData: Record<string, any>): FormData => {
    const formData = new FormData();

    Object.entries(jsonData).forEach(([tabKey, data]) => {
      // data di sini harusnya object field→value
      if (typeof data !== 'object' || data === null) return;

      Object.entries(data).forEach(([fieldName, value]) => {
        if (value == null) return;

        // Jika file array
        if (Array.isArray(value)) {
          value.forEach((v) => formData.append(`${tabKey}_${fieldName}`, v));
        }
        // Jika File tunggal
        else if (value instanceof File) {
          formData.append(`${tabKey}_${fieldName}`, value);
        }
        // String / number / boolean
        else {
          formData.append(`${tabKey}_${fieldName}`, String(value));
        }
      });
    });

    return formData;
  };

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
      } else if (submitter && submitter.value === 'submit') {
        submit(formData);
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
              console.log(value);
            }
          } else if (field) {
            field.value = value !== null ? String(value) : '';
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
    loading,
    tab,
    setTab,
    biodataMuridLocalData,
    rules,
    handleSubmitForm,
    loadFormDataFromLocalStorage,
  };
}
