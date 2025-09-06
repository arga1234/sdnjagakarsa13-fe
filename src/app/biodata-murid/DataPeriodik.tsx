import { SelectField, TextField } from '@/src/components/fieldv2';
import { ValidationRule } from '@/src/util';
import { usePageHook } from './hookPage';
import { useEffect, useState } from 'react';

export default function PeriodikForm({
  nextButtonOnClick,
  prevButtonOnClick,
  rules,
  handleSubmitForm,
  formId,
  localStorageName,
  isEdit,
}: {
  isEdit?: boolean;
  showJarakKm?: boolean;
  setShowJarakKm?: (value: boolean) => void;
  localStorageName: string;
  formId: string;
  nextButtonOnClick: () => void;
  prevButtonOnClick: () => void;
  rules: {
    tinggiBadan: ValidationRule[];
    beratBadan: ValidationRule[];
    jumlahSaudara: ValidationRule[];
  };
  handleSubmitForm: (
    e: React.FormEvent<HTMLFormElement>,
    nextButton: () => void,
    previousButton: () => void,
    localstorageName: string,
  ) => void;
}) {
  const { loadFormDataFromLocalStorage } = usePageHook();

  const [showJarakKm, setShowJarakKm] = useState<boolean>(false);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmitForm(e, nextButtonOnClick, prevButtonOnClick, localStorageName);
  };

  useEffect(() => {
    loadFormDataFromLocalStorage(formId, `data-${localStorageName}`);
  }, [formId, loadFormDataFromLocalStorage, localStorageName]);

  return (
    <div
      style={{
        padding: '0px 24px',
        height: '100dvh',
        overflowY: 'auto',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '20px',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backgroundColor: 'transparent',
          backdropFilter: 'blur(10px)',
        }}
      >
        <h4 style={{ textAlign: 'center', marginBottom: '10px' }}>
          <b>Data Periodik</b>
        </h4>
        <p>Fisik Peserta Didik</p>
      </div>
      <form
        id={formId}
        style={{ maxWidth: '800px', margin: '0 auto' }}
        onSubmit={submit}
      >
        <TextField
          name="tinggiBadan"
          label="Tinggi badan (cm)"
          type="number"
          rules={rules.tinggiBadan}
          icon="📏"
          placeholder="Masukan Tinggi Badan"
        />
        <TextField
          name="beratBadan"
          label="Berat badan (kg)"
          type="number"
          rules={rules.beratBadan}
          icon="⚖️"
          placeholder="Masukan Berat Badan"
        />
        <TextField
          name="lingkarKepala"
          label="Lingkar Kepala (cm)"
          type="number"
          icon="🙂"
          placeholder="Masukan Lingkar Kepala"
        />
        <SelectField
          icon="🛣️"
          label={'Jarak Rumah Ke Sekolah '}
          name={'jarakRumahJauh'}
          placeholder="Pilih Jarak Rumah Ke Sekolah"
          options={[
            { label: 'Kurang dari 1 km', value: 'tidak' },
            { label: 'Lebih dari 1 km', value: 'ya' },
          ]}
          onChange={(e) => {
            setShowJarakKm(e.target.value === 'ya');
          }}
        />
        {showJarakKm && (
          <TextField
            placeholder="Sebutkan Jarak Rumah Ke Sekolah"
            icon="🚗"
            name="jarakRumah"
            label="Sebutkan (dalam km)"
            type="number"
          />
        )}
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ flex: 1 }}>
            <TextField
              icon="⏰"
              placeholder="Masukan angka"
              name="waktuJam"
              label="Waktu Tempuh (jam)"
              type="number"
            />
          </div>
          <div style={{ flex: 1 }}>
            <TextField
              placeholder="Masukan angka"
              icon="⏱️"
              name="waktuMenit"
              label="Waktu Tempuh (menit)"
              type="number"
            />
          </div>
        </div>
        <TextField
          placeholder="Masukan jumlah saudara kandung"
          icon="👨‍👩‍👧"
          name="jumlahSaudara"
          label="Jumlah Saudara Kandung"
          type="number"
          rules={rules.jumlahSaudara}
        />
        <div
          style={{
            padding: '24px 0px',
            width: '100%',
            position: 'sticky',
            bottom: 0,
            backgroundColor: 'transparent',
            backdropFilter: 'blur(10px)',
            zIndex: 1000,
            display: 'flex',
            flexWrap: 'nowrap',
            gap: '10px',
          }}
        >
          <button
            type="submit"
            onClick={prevButtonOnClick}
            style={{
              width: '100%',
              padding: '10px 20px',
              backgroundColor: 'grey',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Sebelumnya
          </button>
          <button
            value={isEdit ? 'submit' : 'next'}
            style={{
              width: '100%',
              padding: '10px 20px',
              backgroundColor: 'dodgerblue',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {isEdit ? 'Update Jawaban' : 'Selanjutnya'}
          </button>
        </div>
      </form>
    </div>
  );
}
