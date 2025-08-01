import { TextField } from '@/src/components/fieldv2';
import { ValidationRule } from '@/src/util';

export default function KontakForm({
  nextButtonOnClick,
  prevButtonOnClick,
  rules,
}: {
  nextButtonOnClick: () => void;
  prevButtonOnClick: () => void;
  rules: { phoneNumber: ValidationRule[] };
}) {
  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

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
          backgroundColor: 'var(--background)',
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
        style={{ maxWidth: '800px', margin: '0 auto' }}
        onSubmit={handleSubmitForm}
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
            backgroundColor: 'var(--background)',
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
            Selanjutnya
          </button>
        </div>
      </form>
    </div>
  );
}
