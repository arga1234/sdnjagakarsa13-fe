import { TextField } from '@/src/components/fieldv2';
import { ValidationRule } from '@/src/util';
import { usePageHook } from './hookPage';
import { useEffect } from 'react';

export default function KontakForm({
  nextButtonOnClick,
  prevButtonOnClick,
  rules,
  handleSubmitForm,
  formId,
  localStorageName,
}: {
  localStorageName: string;
  formId: string;
  nextButtonOnClick: () => void;
  prevButtonOnClick: () => void;
  rules: { phoneNumber: ValidationRule[] };
  handleSubmitForm: (
    e: React.FormEvent<HTMLFormElement>,
    nextButton: () => void,
    previousButton: () => void,
    localstorageName: string,
  ) => void;
}) {
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmitForm(e, nextButtonOnClick, prevButtonOnClick, 'kontak');
  };

  const { loadFormDataFromLocalStorage } = usePageHook();

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
        }}
      >
        <h4 style={{ textAlign: 'center', marginBottom: '10px' }}>
          <b>Kontak</b>
        </h4>
        <p>Peserta didik yang bisa dihubungi</p>
      </div>
      <form
        id={formId}
        style={{ maxWidth: '800px', margin: '0 auto' }}
        onSubmit={submit}
      >
        <TextField
          icon="☎️"
          name="telpRumah"
          placeholder="Masukan Telpon Rumah (bila punya)"
          label={'Nomor Telepon Rumah(bila ada/boleh dikosongin)'}
        />
        <TextField
          icon="📱"
          name="hp"
          placeholder="Masukan Nomor HP atau WA"
          label={'Nomor HP atau Whats App'}
          rules={rules.phoneNumber}
        />
        <TextField
          icon="📧"
          placeholder="Masukan email"
          name="email"
          type="email"
          label={'Email (bila punya)'}
        />
        <div
          style={{
            padding: '24px 0px',
            width: '100%',
            position: 'sticky',
            bottom: 0,
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
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
            value={'previous'}
          >
            Sebelumnya
          </button>
          <button
            value={'next'}
            type="submit"
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
            Selanjutnya
          </button>
        </div>
      </form>
    </div>
  );
}
