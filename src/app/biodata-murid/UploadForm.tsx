import { UploadField } from '@/src/components/fieldv2';
import { ValidationRule } from '@/src/util';
import { useCallback } from 'react';
import { tabMemo } from './data';

export default function KontakForm({
  nextButtonOnClick,
  prevButtonOnClick,
  rules,
  handleSubmitForm,
}: {
  nextButtonOnClick: () => void;
  prevButtonOnClick: () => void;
  rules: {
    akteFile: ValidationRule[];
    kkFile: ValidationRule[];
    foto: ValidationRule[];
  };
  handleSubmitForm: (
    e: React.FormEvent<HTMLFormElement>,
    nextButton: () => void,
    previousButton: () => void,
    localstorageName: string,
  ) => void;
}) {
  const submit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      handleSubmitForm(
        e,
        nextButtonOnClick,
        prevButtonOnClick,
        tabMemo.dokumen,
      );
    },
    [handleSubmitForm, nextButtonOnClick, prevButtonOnClick],
  );

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
          <b>Dokumen</b>
        </h4>
        <p>Upload hasil scan dokumen peserta didik</p>
      </div>
      <form
        style={{ maxWidth: '800px', margin: '0 auto' }}
        onSubmit={submit}
      >
        <UploadField
          maxSizeMB={2}
          accept=".jpg,.jpeg,.png,.pdf"
          label={'Akte kelahiran'}
          name={'fileAkteLahir'}
          placeholder="📝 Upload scan akte lahir"
          rules={rules.akteFile}
        />
        <UploadField
          maxSizeMB={2}
          accept=".jpg,.jpeg,.png,.pdf"
          label={'Kartu Keluarga'}
          name={'fileKartuKeluarga'}
          placeholder="📃 Upload scan kartu keluarga"
          rules={rules.kkFile}
        />
        <UploadField
          maxSizeMB={2}
          accept=".jpg,.jpeg,.png"
          label={'Foto peserta didik (bebas rapi)'}
          name={'fileFoto'}
          placeholder="🖼️ Upload foto peserta didik"
          rules={rules.foto}
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
          value={'submit'}
            onClick={nextButtonOnClick}
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
            Kirim Jawaban Anda
          </button>
        </div>
      </form>
    </div>
  );
}
