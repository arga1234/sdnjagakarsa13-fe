import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SDN Jagakarsa 13 Pagi',
  description: 'Website resmi mutasi siswa ke SDN Jagakarsa 13 Pagi',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
