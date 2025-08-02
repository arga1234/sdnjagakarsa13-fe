'use client';

import React, { useEffect } from 'react';
import { IdentitasMurid } from './IdentitasMurid';
import { IdentitasWali } from './IdentitasWali';
import KontakForm from './Kontak';
import UploadForm from './UploadForm';
import { usePageHook } from './hookPage';
import { useRouter, useSearchParams } from 'next/navigation';
import { tabMemo } from './data';

export default function Page() {
  const { tab, setTab, rules, biodataMuridLocalData, handleSubmitForm } =
    usePageHook();
  const tabParam = useSearchParams().get('tab');
  const router = useRouter();

  useEffect(() => {
    setTab(tabParam || tabMemo.murid);
  }, [setTab, tabParam]);

  useEffect(() => {
    const handlePopState = () => {
      console.log('Tombol back ditekan, redirecting...');
      router.back(); // Ganti dengan rute yang kamu mau
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [router]);

  return (
    <div className="container">
      <div style={{ display: tab === tabMemo.murid ? 'block' : 'none' }}>
        <IdentitasMurid
          formId={tabMemo.murid}
          validationRules={rules.murid}
          nextButton={function (): void {
            router.replace(`/biodata-murid?tab=${tabMemo.ayah}`);
          }}
          previousButton={function (): void {
            router.replace(`/`);
          }}
          handleSubmitForm={handleSubmitForm}
        />
      </div>
      <div style={{ display: tab === tabMemo.ayah ? 'block' : 'none' }}>
        <IdentitasWali
          formId={tabMemo.ayah}
          localStorageName={tabMemo.ayah}
          handleSubmitForm={handleSubmitForm}
          subTitle="Peserta didik"
          wali={'Ayah Kandung'}
          previousButton={function (): void {
            router.replace(`/biodata-murid?tab=${tabMemo.murid}`);
          }}
          nextButton={function (): void {
            router.replace(`/biodata-murid?tab=${tabMemo.ibu}`);
          }}
        />
      </div>
      <div style={{ display: tab === tabMemo.ibu ? 'block' : 'none' }}>
        <IdentitasWali
          formId={tabMemo.ibu}
          localStorageName={tabMemo.ibu}
          handleSubmitForm={handleSubmitForm}
          rules={rules.waliIbu}
          subTitle="Peserta didik"
          wali={'Ibu Kandung'}
          previousButton={function (): void {
            router.replace(`/biodata-murid?tab=${tabMemo.ayah}`);
          }}
          nextButton={function (): void {
            if (biodataMuridLocalData() === 'ya') {
              router.replace(`/biodata-murid?tab=${tabMemo.wali}`);
            } else {
              router.replace(`/biodata-murid?tab=${tabMemo.kontak}`);
            }
          }}
        />
      </div>
      <div style={{ display: tab === tabMemo.wali ? 'block' : 'none' }}>
        <IdentitasWali
          formId={tabMemo.wali}
          localStorageName={tabMemo.wali}
          handleSubmitForm={handleSubmitForm}
          subTitle="Yang tinggal/mendampingi peserta didik"
          wali={'Wali Murid'}
          rules={rules.wali}
          nextButton={function (): void {
            router.replace(`/biodata-murid?tab=${tabMemo.kontak}`);
          }}
          previousButton={function (): void {
            router.replace(`/biodata-murid?tab=${tabMemo.ibu}`);
          }}
        ></IdentitasWali>
      </div>
      <div style={{ display: tab === tabMemo.kontak ? 'block' : 'none' }}>
        <KontakForm
          localStorageName={tabMemo.kontak}
          formId={tabMemo.kontak}
          nextButtonOnClick={function (): void {
            router.replace(`/biodata-murid?tab=${tabMemo.dokumen}`);
          }}
          prevButtonOnClick={function (): void {
            if (biodataMuridLocalData() === 'ya') {
              router.replace(`/biodata-murid?tab=${tabMemo.wali}`);
            } else {
              router.replace(`/biodata-murid?tab=${tabMemo.ibu}`);
            }
          }}
          rules={rules.kontak}
          handleSubmitForm={handleSubmitForm}
        />
      </div>
      <div style={{ display: tab === tabMemo.dokumen ? 'block' : 'none' }}>
        <UploadForm
          handleSubmitForm={handleSubmitForm}
          nextButtonOnClick={function (): void {}}
          prevButtonOnClick={function (): void {
            router.replace(`/biodata-murid?tab=${tabMemo.kontak}`);
          }}
          rules={rules.dokumen}
        />
      </div>
      <style jsx>{`
        @keyframes backgroundShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .container {
          background: linear-gradient(
            -45deg,
            rgb(108, 83, 216),
            rgb(61, 191, 196),
            #a1c4fd,
            rgb(185, 56, 132)
          );
          background-size: 400% 400%;
          animation: backgroundShift 16s ease infinite;
        }
      `}</style>
    </div>
  );
}
