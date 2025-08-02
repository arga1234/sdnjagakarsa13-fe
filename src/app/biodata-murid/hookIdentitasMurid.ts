import { useState } from 'react';

export function useRegistrasiUlangHook() {
  const [agreed, setAgreed] = useState<boolean>(false);
  const [isKewarganegaraanLainnyaVisible, setIsKewarganegaraanLainnyaVisible] =
    useState(false);
  const [punyaKIPValue, setPunyaKIPValue] = useState<string | undefined>(
    undefined,
  );
  const [tetapMenerimaPIPValue, setTetapMenerimaPIPValue] = useState<
    string | undefined
  >(undefined);
  const [berhakMenerimaPIPValue, setBerhakMenerimaPIPValue] = useState<
    string | undefined
  >(undefined);
  const [lintang, setLintang] = useState<string>('');
  const [bujur, setBujur] = useState<string>('');
  const [showMap, setShowMap] = useState(false);

  const handleAmbilLokasi = () => {
    if (!navigator.geolocation) {
      alert('Geolocation tidak didukung browser ini.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log(
          pos.coords.latitude.toString(),
          pos.coords.longitude.toString(),
        );
        setLintang(pos.coords.latitude.toString());
        setBujur(pos.coords.longitude.toString());
      },
      (err) => {
        alert('Gagal mengambil lokasi: ' + err.message);
      },
    );
  };

  return {
    tetapMenerimaPIPValue,
    setTetapMenerimaPIPValue,
    berhakMenerimaPIPValue,
    setBerhakMenerimaPIPValue,
    agreed,
    setAgreed,
    isKewarganegaraanLainnyaVisible,
    setIsKewarganegaraanLainnyaVisible,
    punyaKIPValue,
    setPunyaKIPValue,
    handleAmbilLokasi,
    bujur,
    lintang,
    showMap,
    setShowMap,
    setLintang,
    setBujur,
  };
}
