import React from 'react'

export  function LoadingComponent() {
  return (
    <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #a1c4fd, #c2e9fb)',
            animation: 'bgMove 8s ease infinite',
            width: '100%',
        }}
    >
        <p
        style={{
        fontSize: '1.6rem',
        color: '#333',
        animation: 'pulse 1.5s ease-in-out infinite',
        margin: 0,
        }}
        >
        ⏳ Memuat halaman
        </p>
        <style jsx>{`
        @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
        }
        `}</style>
    </div>
  )
}
