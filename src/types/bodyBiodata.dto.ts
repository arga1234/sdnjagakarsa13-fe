export interface SiswaBodyDto {
  nama: string;
  nisn: string;
  kewarganegaraan: string;
  kewarganegaraanLainnya?: string;
  nik: string;
  kk: string;
  noRegistrasiAkta: string;
  berkebutuhanKhusus?: string;
  tempatLahir: string;
  tanggalLahir: string; // bisa pakai Date kalau mau
  jenisKelamin: string;
  agama: string;
  wali: string;
  alamatJalan: string;
  rt: string;
  rw: string;
  dusun?: string;
  desaKelurahan: string;
  kodePos: string;
  lintang: string;
  bujur: string;
  tempatTinggal: string;
  modaTransportasi: string;
  anakKeberapa: string;
  penerimaKPSPKH: string;
  punyaKIP: string;
  tetapMenerimaPIP?: string;
  berhakMenerimaPIP?: string;
  alasanMenolakPIP?: string;
  alasanBerhakPIP?: string;
}

export interface WaliForm {
  nama: string;
  nik: string;
  tahunLahir: string; // karena type="number"
  pendidikan: string; // bisa dibuat union type dari pendidikanOptions kalau mau strict
  pekerjaan: string; // bisa dibuat union type dari pekerjaanOptions
  penghasilan: string; // bisa dibuat union type dari penghasilanOptions
  kebutuhanKhusus?: string; // opsional, boleh kosong
}

export interface KontakForm {
  telpRumah?: string; // opsional, bisa kosong
  phoneNumber: string; // wajib diisi
  email?: string; // opsional, bisa kosong
}

export interface PeriodikForm {
  tinggiBadan: number;      // 📏 Tinggi badan (cm)
  beratBadan: number;       // ⚖️ Berat badan (kg)
  lingkarKepala: number;    // 🙂 Lingkar kepala (cm)
  jarakRumahJauh: string;   // 🛣️ Kurang dari 1 km / Lebih dari 1 km
  jarakRumah?: number;      // 🚗 Dalam km (opsional, muncul kalau jarakRumahJauh = 'ya')
  waktuJam: number;         // ⏰ Waktu tempuh (jam)
  waktuMenit: number;       // ⏱️ Waktu tempuh (menit)
  jumlahSaudara: number;    // 👨‍👩‍👧 Jumlah saudara kandung
}