'use client';
import { ConfigProvider, theme } from 'antd';
import React, { useEffect } from 'react';

function DisplayMode({ children }: { children: React.ReactNode }) {
  // const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // if(window) {
    // const match = window.matchMedia('(prefers-color-scheme: dark)');
    // setIsDarkMode(match.matches);
    // const listener = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    // match.addEventListener('change', listener);
    // return () => match.removeEventListener('change', listener);
    // }
  }, []);
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export const DisplayModeComponent = React.memo(DisplayMode);
