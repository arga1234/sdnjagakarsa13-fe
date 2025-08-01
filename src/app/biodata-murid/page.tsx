'use client';

import React, { useEffect } from 'react';
import { IdentitasMurid } from './IdentitasMurid';
import { IdentitasWali } from './IdentitasWali';
import KontakForm from './Kontak';
import UploadForm from './UploadForm';
import { usePageHook } from './hookPage';
import { useSearchParams } from 'next/navigation';
import { tabMemo } from './data';

export default function Page() {
  const { tab, setTab, rules, biodataMuridLocalData } = usePageHook();
  const tabParam = useSearchParams().get('tab');

  useEffect(() => {
    setTab(tabParam || tabMemo.murid);
  }, [setTab, tabParam]);

  return (
    <div>
      <div style={{ display: tab === tabMemo.murid ? 'block' : 'none' }}>
        <IdentitasMurid
          validationRules={rules.murid}
          buttonLabel={'Selanjutnya'}
        />
      </div>
      <div style={{ display: tab === tabMemo.ayah ? 'block' : 'none' }}>
        <IdentitasWali
          subTitle="Peserta didik"
          wali={'Ayah Kandung'}
          previousButton={function (): void {
            setTab(tabMemo.murid);
          }}
          nextButton={function (): void {
            setTab(tabMemo.ibu);
          }}
        />
      </div>
      <div style={{ display: tab === tabMemo.ibu ? 'block' : 'none' }}>
        <IdentitasWali
          rules={rules.waliIbu}
          subTitle="Peserta didik"
          wali={'Ibu Kandung'}
          previousButton={function (): void {
            setTab(tabMemo.ayah);
          }}
          nextButton={function (): void {
            if (biodataMuridLocalData() === 'ya') {
              setTab(tabMemo.wali);
            } else {
              setTab(tabMemo.kontak);
            }
          }}
        />
      </div>
      <div style={{ display: tab === tabMemo.wali ? 'block' : 'none' }}>
        <IdentitasWali
          subTitle="Yang tinggal/mendampingi peserta didik"
          wali={'Wali Murid'}
          rules={rules.wali}
          nextButton={function (): void {
            setTab(tabMemo.kontak);
          }}
          previousButton={function (): void {
            setTab(tabMemo.ibu);
          }}
        ></IdentitasWali>
      </div>
      <div style={{ display: tab === tabMemo.kontak ? 'block' : 'none' }}>
        <KontakForm
          nextButtonOnClick={function (): void {
            setTab(tabMemo.dokumen);
          }}
          prevButtonOnClick={function (): void {
            if (biodataMuridLocalData() === 'ya') {
              setTab(tabMemo.wali);
            } else {
              setTab(tabMemo.ibu);
            }
          }}
          rules={rules.kontak}
        />
      </div>
      <div style={{ display: tab === tabMemo.dokumen ? 'block' : 'none' }}>
        <UploadForm
          nextButtonOnClick={function (): void {}}
          prevButtonOnClick={function (): void {
            setTab(tabMemo.kontak);
          }}
          rules={rules.dokumen}
        />
      </div>
    </div>
  );
}
