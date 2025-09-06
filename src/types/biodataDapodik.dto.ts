/* eslint-disable @typescript-eslint/no-explicit-any */
export interface BiodataDapodik {
  id: string;
  dokumen_foto: string;
  dokumen_kkfile: string;
  dokumen_aktefile: string;
  created_at: string;
  murid: Murid;
  ayah: Ayah;
  ibu: Ibu;
  wali: Wali;
  kontak: Kontak;
  periodik: Periodik;
}

export interface Murid {
  nama: string;
  nisn: string;
  kk: string;
  nik: string;
  kewarganegaraan: string;
  tempatlahir: string;
  tanggallahir: string;
  jeniskelamin: string;
  agama: string;
  noregistrasiakta: string;
  berkebutuhankhusus: string;
  wali: string;
  alamatjalan: string;
  rt: string;
  rw: string;
  dusun: string;
  desakelurahan: string;
  kodepos: string;
  tempattinggal: string;
  modatransportasi: string;
  anakkeberapa: string;
  penerimakpspkh: string;
  punyakip: string;
  tetapmenerimapip: any;
  lintang: string;
  bujur: string;
  berhakmenerimapip: any;
  alasanmenolakpip: any;
  alasanberhakpip: any;
  kewarganegaraanlainnya: any;
}

export interface Ayah {
  nama: string;
  nik: string;
  tahunlahir: string;
  pendidikan: string;
  pekerjaan: string;
  penghasilan: string;
  kebutuhankhusus: string;
}

export interface Ibu {
  nama: string;
  nik: string;
  tahunlahir: string;
  pendidikan: string;
  pekerjaan: string;
  penghasilan: string;
  kebutuhankhusus: string;
}

export interface Wali {
  nama: any;
  nik: any;
  tahunlahir: any;
  pendidikan: any;
  pekerjaan: any;
  penghasilan: any;
  kebutuhankhusus: any;
}

export interface Kontak {
  telprumah: string;
  phonenumber: string;
  email: string;
}

export interface Periodik {
  periodik_tinggibadan: number;       // Tinggi badan (cm)
  periodik_beratbadan: number;        // Berat badan (kg)
  periodik_lingkarkepala: number;     // Lingkar kepala (cm)
  periodik_jarakrumahjauh: string;    // Kurang dari 1 km / Lebih dari 1 km
  periodik_jarakrumah?: number;       // Dalam km (opsional kalau jauh)
  periodik_waktujam: number;          // Waktu tempuh (jam)
  periodik_waktumenit: number;        // Waktu tempuh (menit)
  periodik_jumlahsaudara: number;     // Jumlah saudara kandung
}
