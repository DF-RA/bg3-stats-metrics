'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import type { Breakpoint } from '@mui/material/styles';

export interface MainProps {
  children?: React.ReactNode;
  /** Ancho máximo del contenido (Container). `false` = ancho completo. */
  maxWidth?: Breakpoint | false;
  /** Elimina el padding horizontal del Container. */
  disableGutters?: boolean;
}

/**
 * Región principal de contenido (`<main>`). Usa `flexGrow: 1` para ocupar el
 * espacio disponible y empujar el footer al fondo (patrón sticky footer).
 */
export function Main({
  children,
  maxWidth = 'lg',
  disableGutters = false,
}: MainProps) {
  return (
    <Box component="main" sx={{ flexGrow: 1, width: '100%', py: 4 }}>
      <Container maxWidth={maxWidth} disableGutters={disableGutters}>
        {children}
      </Container>
    </Box>
  );
}

export default Main;
