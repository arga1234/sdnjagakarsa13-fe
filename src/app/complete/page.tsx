'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation'

export default function RegistrasiUlangCompletePage() {
  const urlsearchParams = useSearchParams();  
  const message = urlsearchParams.get('message'); 
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100dvh',
        padding: '0 24px',
        backgroundColor: '#f5f5f5',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          backgroundColor: '#ffffff',
          padding: '40px',
          borderRadius: '16px',
          maxWidth: '600px',
          width: '100%',
        }}
      >
        <span style={{ fontSize: '2rem' }}>🎉</span>
        <h1 style={{ margin: '16px 0px', fontSize: '2rem', color: '#2b6cb0' }}>
          {message}
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#4a5568' }}>
          Terima kasih telah melengkapi.
        </p>
      </div>
    </div>
  );
}
