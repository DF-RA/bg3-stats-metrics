'use client';

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export interface AsideProps {
  /** Título de la barra lateral (da nombre accesible al `<aside>`). */
  title?: string;
  children?: React.ReactNode;
  titleVariant?: 'h5' | 'h6' | 'subtitle1';
  /** Nivel semántico del título (h2 por defecto). */
  titleComponent?: React.ElementType;
  /** Estilo del contenedor. */
  variant?: 'elevated' | 'outlined' | 'plain';
  /** Fija el aside al hacer scroll (útil como sidebar). */
  sticky?: boolean;
  /** Nombre accesible cuando no hay título visible. */
  ariaLabel?: string;
}

/**
 * Contenido complementario (`<aside>`): barra lateral junto al `Main`. Su rol
 * ARIA es `complementary`; con `title` o `ariaLabel` obtiene nombre accesible.
 */
export function Aside({
  title,
  children,
  titleVariant = 'h6',
  titleComponent = 'h2',
  variant = 'outlined',
  sticky = false,
  ariaLabel,
}: AsideProps) {
  const headingId = React.useId();

  const stickySx = sticky
    ? { position: 'sticky', top: 16, alignSelf: 'flex-start' }
    : {};

  const label = title
    ? { 'aria-labelledby': headingId }
    : ariaLabel
      ? { 'aria-label': ariaLabel }
      : {};

  const content = (
    <>
      {title && (
        <Typography
          id={headingId}
          variant={titleVariant}
          component={titleComponent}
          gutterBottom
        >
          {title}
        </Typography>
      )}
      {children}
    </>
  );

  if (variant === 'plain') {
    return (
      <Box component="aside" {...label} sx={stickySx}>
        {content}
      </Box>
    );
  }

  return (
    <Paper
      component="aside"
      variant={variant === 'outlined' ? 'outlined' : 'elevation'}
      {...label}
      sx={{ p: 2.5, ...stickySx }}
    >
      {content}
    </Paper>
  );
}

export default Aside;
