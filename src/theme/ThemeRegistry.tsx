'use client';

import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { bg3Theme } from './theme';

/**
 * Envuelve la app con:
 *  - AppRouterCacheProvider: inyección SSR de estilos Emotion sin flash.
 *  - ThemeProvider: el tema BG3.
 *  - CssBaseline: reset + fondo/typografía base del tema.
 */
export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppRouterCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={bg3Theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
