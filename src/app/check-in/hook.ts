import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function useCheckInHook() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const fields = Array.from(formData.entries()).map(([key, value]) => ({
      key,
      value,
    }));
    const body = fields.reduce<Record<string, unknown>>(
      (acc, { key, value }) => {
        acc[key] = value;
        return acc;
      },
      {},
    );
    const kelas: Record<string, string> = {
      '6bfd5b55-4f4c-440d-9308-091065f49953': '1A',
      '528b31cc-6477-46ea-9538-9183ad16bd6f': '1B',
    };
    const x: string = body.eventId as string;
    delete body.eventId;
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/checkin/masuk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error('Login gagal');
      const result = await res.json();
      localStorage.setItem('user', JSON.stringify(result));
      router.push(
        `/check-in/qr-code?eventId=${x}&nama=${body.nama}&nik=${body.nik}&kelas=${kelas[body.id_kelas as string]}`,
      );
    } catch (err) {
      console.error(err);
      setError('🚫 Username atau password tidak ditemukan. Coba lagi ya! 😢');
    } finally {
      setLoading(false);
    }
  };

  return { setLoading, loading, error, handleLogin };
}
