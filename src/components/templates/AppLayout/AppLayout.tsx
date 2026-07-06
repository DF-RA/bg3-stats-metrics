'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import type { Breakpoint } from '@mui/material/styles';
import { Main } from '@/components/organisms/Main';

export interface AppLayoutProps {
  /** Cabecera (normalmente un <Header />). */
  header?: React.ReactNode;
  /** Pie (normalmente un <Footer />). */
  footer?: React.ReactNode;
  /** Contenido de la región principal. */
  children?: React.ReactNode;
  /** Ancho máximo del contenido del <main>. */
  maxWidth?: Breakpoint | false;
}

/**
 * Estructura base de la web: header arriba, main que crece y footer al fondo.
 * Columna flex con `minHeight: 100vh` → patrón sticky footer.
 */
export function AppLayout({
  header,
  footer,
  children,
  maxWidth = 'lg',
}: AppLayoutProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      {header}
      <Main maxWidth={maxWidth}>{children}</Main>
      {footer}
    </Box>
  );
}

export default AppLayout;
