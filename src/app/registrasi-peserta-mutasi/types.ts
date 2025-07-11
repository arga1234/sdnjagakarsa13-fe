import { ValidationRule } from '@/src/util';

export interface FormValue {
  nama: string;
  tempatLahir: string;
  tanggalLahir: string;
  jenisKelamin: string;
  nik: string;
  kk: string;
  akte: File;
  kartuKeluarga: File;
  pasFoto: File;
  agreement?: boolean;
}

export type FieldValidationRule = {
  [K in keyof FormValue]: ValidationRule[];
};
