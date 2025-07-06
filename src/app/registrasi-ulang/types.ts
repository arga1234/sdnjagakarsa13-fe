import { UploadChangeParam } from 'antd/es/upload';

export interface FormValue {
  nama: string;
  tempatLahir: string;
  tanggalLahir: string;
  jenisKelamin: string;
  nik: string;
  kk: string;
  ijazahTk: UploadChangeParam[];
  akte: UploadChangeParam[];
  kartuKeluarga: UploadChangeParam[];
  pasFoto: UploadChangeParam[];
  agreement: boolean;
}
