/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React from 'react';
import { IdentitasMurid } from './IdentitasMurid';
import { IdentitasWali } from './IdentitasWali';
import KontakForm from './Kontak';
import UploadForm from './UploadForm';
import { usePageHook } from './hookPage';
import { tabMemo } from './data';
import { LoadingComponent } from '@/src/components';
import PeriodikForm from './DataPeriodik';
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const {
    tab,
    setTab,
    rules,
    biodataMuridLocalData,
    handleSubmitForm,
    loading,
  } = usePageHook();
  const isEdit = useSearchParams().get('edit') === 'true';
  if (loading) return <LoadingComponent />;

  return (
    <div className="container">
      {/* Identitas Murid */}
      <div style={{ display: tab === tabMemo.murid ? 'block' : 'none' }}>
        <IdentitasMurid
          formId={tabMemo.murid}
          validationRules={rules.murid}
          nextButton={() => setTab(tabMemo.ayah)}
          previousButton={() => setTab(tabMemo.murid)}
          handleSubmitForm={handleSubmitForm}
        />
      </div>

      {/* Identitas Ayah Kandung */}
      <div style={{ display: tab === tabMemo.ayah ? 'block' : 'none' }}>
        <IdentitasWali
          formId={tabMemo.ayah}
          rules={rules.ayah}
          localStorageName={tabMemo.ayah}
          handleSubmitForm={handleSubmitForm}
          subTitle="Peserta didik"
          wali="Ayah Kandung"
          previousButton={() => setTab(tabMemo.murid)}
          nextButton={() => setTab(tabMemo.ibu)}
        />
      </div>

      {/* Identitas Ibu Kandung */}
      <div style={{ display: tab === tabMemo.ibu ? 'block' : 'none' }}>
        <IdentitasWali
          formId={tabMemo.ibu}
          localStorageName={tabMemo.ibu}
          handleSubmitForm={handleSubmitForm}
          rules={rules.waliIbu}
          subTitle="Peserta didik"
          wali="Ibu Kandung"
          previousButton={() => setTab(tabMemo.ayah)}
          nextButton={() => {
            if (biodataMuridLocalData() === 'ya') {
              setTab(tabMemo.wali);
            } else {
              setTab(tabMemo.kontak);
            }
          }}
        />
      </div>

      {/* Identitas Wali Murid */}
      <div style={{ display: tab === tabMemo.wali ? 'block' : 'none' }}>
        <IdentitasWali
          formId={tabMemo.wali}
          localStorageName={tabMemo.wali}
          handleSubmitForm={handleSubmitForm}
          rules={rules.wali}
          subTitle="Yang tinggal/mendampingi peserta didik"
          wali="Wali Murid"
          previousButton={() => setTab(tabMemo.ibu)}
          nextButton={() => setTab(tabMemo.kontak)}
        />
      </div>

      {/* Kontak Form */}
      <div style={{ display: tab === tabMemo.kontak ? 'block' : 'none' }}>
        <KontakForm
          localStorageName={tabMemo.kontak}
          formId={tabMemo.kontak}
          rules={rules.kontak}
          handleSubmitForm={handleSubmitForm}
          prevButtonOnClick={() => {
            if (biodataMuridLocalData() === 'ya') {
              setTab(tabMemo.wali);
            } else {
              setTab(tabMemo.ibu);
            }
          }}
          nextButtonOnClick={() => {
            setTab(tabMemo.periodik);
          }}
        />
      </div>

      {/* Data Periodik */}
      <div style={{ display: tab === tabMemo.periodik ? 'block' : 'none' }}>
        <PeriodikForm
          isEdit={isEdit}
          localStorageName={tabMemo.periodik}
          formId={tabMemo.periodik}
          prevButtonOnClick={() => {
            setTab(tabMemo.kontak)}}
          nextButtonOnClick={() => {
            if (!isEdit) {
              setTab(tabMemo.dokumen);
            }
          }}
          rules={rules.periodik}
          handleSubmitForm={handleSubmitForm}
        />
      </div>

      {/* Upload Dokumen */}
      <div style={{ display: tab === tabMemo.dokumen ? 'block' : 'none' }}>
        <UploadForm
          handleSubmitForm={handleSubmitForm}
          rules={rules.dokumen}
          prevButtonOnClick={() => setTab(tabMemo.kontak)}
          nextButtonOnClick={() => setTab(tabMemo.dokumen)}
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
