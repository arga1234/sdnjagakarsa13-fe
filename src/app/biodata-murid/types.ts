import { ValidationRule } from '@/src/util';
export interface BiodataMuridValidation {
  nama: ValidationRule[];
  kewarganegaraan: ValidationRule[];
  nik: ValidationRule[];
  kk: ValidationRule[];
  noRegistrasiAkta: ValidationRule[];
  berkebutuhanKhusus: ValidationRule[];
  tempatLahir: ValidationRule[];
  tanggalLahir: ValidationRule[];
  jenisKelamin: ValidationRule[];
  agama: ValidationRule[];
  alamatJalan: ValidationRule[];
  rt: ValidationRule[];
  rw: ValidationRule[];
  dusun?: ValidationRule[];
  desaKelurahan: ValidationRule[];
  kodePos: ValidationRule[];
  lintang: ValidationRule[];
  bujur: ValidationRule[];
  tempatTinggal: ValidationRule[];
  modaTransportasi: ValidationRule[];
  anakKeberapa: ValidationRule[];
}

type KontakRules = {
  phoneNumber: ValidationRule[];
};
type WaliRules = {
  pendidikan: ValidationRule[];
  pekerjaan: ValidationRule[];
};
type WaliIbuRules = {
  nama: ValidationRule[];
  tahunLahir: ValidationRule[];
  pendidikan: ValidationRule[];
  pekerjaan: ValidationRule[];
  penghasilan: ValidationRule[];
};

type WaliAyah = WaliIbuRules;

type Dokumen = {
  akteFile: ValidationRule[];
  kkFile: ValidationRule[];
  foto: ValidationRule[];
};

export type Rules = {
  kontak: KontakRules;
  wali: WaliRules;
  waliIbu: WaliIbuRules;
  ayah: WaliAyah;
  murid: BiodataMuridValidation;
  dokumen: Dokumen;
  periodik: {
    tinggiBadan: ValidationRule[];
    beratBadan: ValidationRule[];
    jumlahSaudara: ValidationRule[];
  };
};
