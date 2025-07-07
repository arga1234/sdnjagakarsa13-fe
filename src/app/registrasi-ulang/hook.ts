/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Upload, message } from 'antd';
import { useCallback, useState } from 'react';
import { FormValue } from './types';
import { useRouter } from 'next/router';

export function useRegistrasiUlangHook() {
  const [form] = Form.useForm();
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();

  const handleFormData = useCallback((values: FormValue) => {
    const form = new FormData();
    Object.keys(values).forEach((key) => {
      const i = key as keyof FormValue;
      if (Array.isArray(values[i])) {
        values[i].forEach((file: any) => {
          if (file.originFileObj) {
            form.append(key, file.originFileObj);
          }
        });
      } else if (typeof values[i] === 'boolean') {
        form.append(key, values[i] ? 'true' : 'false');
      } else {
        if (key === 'tanggalLahir' && values[i]) {
          form.append(key, '10-10-2020');
        } else {
          form.append(key, values[i]);
        }
      }
    });
    return form;
  }, []);

  const handleFinish = useCallback(
    async (values: FormValue) => {
      const form = handleFormData(values);
      try {
        const res = await fetch('/api/registrasi', {
          method: 'POST',
          body: form,
        });
        if (!res.ok) {
          throw new Error('Gagal mengirim data, silakan coba lagi.');
        } else {
          message.success('Data berhasil dikirim!');
          router.push('/registrasi-ulang-complete');
        }
      } catch (error) {
        message.error((error as Error).message);
      }
    },
    [handleFormData],
  );

  const normFile = (e: { fileList: any }) => {
    if (Array.isArray(e)) return e;
    return e?.fileList;
  };

  const handleCheckboxChange = (e: any) => {
    setAgreed(e.target.checked);
  };

  const beforeUpload = (file: File) => {
    const isLt1M = file.size / 1024 / 1024 < 1;
    if (!isLt1M) {
      message.error('Ukuran file harus kurang dari 1MB!');
    }
    return isLt1M ? false : Upload.LIST_IGNORE;
  };

  return {
    form,
    agreed,
    handleFinish,
    normFile,
    handleCheckboxChange,
    beforeUpload,
  };
}
