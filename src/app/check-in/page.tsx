'use client';

import React, { useEffect, useState } from 'react';
import { LoadingComponent } from '../../components';
import { SelectField, TextField } from '@/src/components/fieldv2';
import { useCheckInHook } from './hook';

export default function Page() {
  const {loading, error, handleLogin: originalSubmit, setLoading} = useCheckInHook()
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    originalSubmit(e);
    e.preventDefault();
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
    const onFullChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFullChange);
    return () => document.removeEventListener('fullscreenchange', onFullChange);
  }, []);

  if (loading) return <LoadingComponent />;

  return (
    <div className="login-page">
      <style jsx>{`
        @keyframes gradientBG {
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
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        .login-page {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(
            -45deg,
            #ffeaa7,
            #fab1a0,
            #a29bfe,
            #74b9ff
          );
          background-size: 400% 400%;
          animation: gradientBG 20s ease infinite;
          padding: 20px;
        }
        .login-card {
          position: relative;
          background: rgba(241, 241, 241, 0.96);
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 14px 34px rgba(0, 0, 0, 0.2);
          max-width: 420px;
          width: 100%;
          text-align: left;
        }
        .login-card::before {
          content: '🎉';
          font-size: 36px;
          position: absolute;
          top: -20px;
          left: -20px;
          animation: float 3s ease-in-out infinite;
        }
        .login-card::after {
          content: '🚀';
          font-size: 36px;
          position: absolute;
          bottom: -20px;
          right: -20px;
          animation: float 4s ease-in-out infinite;
        }
        .fullscreen-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 1000;
          background: rgba(0, 0, 0, 0.05);
          border: none;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          cursor: pointer;
          transition:
            background 0.2s ease,
            transform 0.2s ease;
        }
        .fullscreen-btn:hover {
          background: rgba(0, 0, 0, 0.1);
          transform: scale(1.1);
        }
        h2 {
          margin-bottom: 18px;
          font-size: 26px;
          color: #6c5ce7;
        }
        .input-group {
          margin-bottom: 20px;
          text-align: left;
        }
        .input-group label {
          display: block;
          margin-bottom: 6px;
          font-weight: bold;
          font-size: 16px;
        }
        .input-group input {
          width: 100%;
          padding: 12px;
          border: 2px solid #dfe6e9;
          border-radius: 10px;
          font-size: 16px;
          transition: 0.2s ease;
          background: #fff;
          color: #2d3436;
        }
        .input-group input:focus {
          border-color: #6c5ce7;
          outline: none;
        }
        .btn-login {
          width: 100%;
          padding: 14px;
          background: #6c5ce7;
          color: #fff;
          border: none;
          border-radius: 14px;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          transition:
            transform 0.2s ease,
            background 0.2s ease;
        }
        .btn-login:hover {
          transform: scale(1.03);
          background: #341f97;
        }
        .error-msg {
          color: #d63031;
          margin-top: 14px;
          font-size: 14px;
        }
      `}</style>

      <div className="login-card">
        <button
          className="fullscreen-btn"
          onClick={toggleFullscreen}
          aria-label="Toggle Fullscreen"
        >
          {isFullscreen ? '✖' : '⛶'}
        </button>
        <h2 style={{textAlign: 'center'}}>Masuk Yuk!</h2>
        <form style={{color: 'grey'}} onSubmit={handleLogin}>
          <TextField
            label="Nama Anak"
            placeholder="Masukan Nama Anak"
            name="nama"
            icon=""
            rules={[{ required: true, message: 'Nama wajib diisi' }]}
          />
          <TextField
            label="NIK"
            placeholder="Masukan NIK"
            name="nik"
            icon=""
            rules={[{ required: true, message: 'NIK wajib diisi' }]}
          />
          <SelectField label={'Kehadiran MPLS'} name={'eventId'} options={[{label: 'Kehadiran MPLS', value: 'd9701a7d-b86d-4cdb-b6b8-873219eedd2f'}]} ></SelectField>
          <SelectField
            label={'Kelas'}
            name={'id_kelas'}
            options={[
              { label: '1A', value: '6bfd5b55-4f4c-440d-9308-091065f49953' },
              { label: '1B', value: '528b31cc-6477-46ea-9538-9183ad16bd6f' },
            ]}
            rules={[{ required: true, message: 'Kelas wajib dipilih' }]}
          />
          <SelectField
            label={'Jenis Kelamin'}
            name={'gender'}
            options={[
              { label: 'Laki-laki', value: 'Laki-laki' },
              { label: 'Perempuan', value: 'Perempuan' },
            ]}
            rules={[{ required: true, message: 'Jenis kelamin wajib dipilih' }]}
          />
          <button type="submit" className="btn-login">
            ✅ Masuk Sekarang
          </button>
        </form>
        {error && <p className="error-msg">{error}</p>}
      </div>
    </div>
  );
}
