'use client';

import React, { useEffect, useState } from 'react';
import { DisplayModeComponent } from '@/src/components';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null; // Hindari rendering di server

  return <DisplayModeComponent>{children}</DisplayModeComponent>;
}
