'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export interface SectionProps {
  /** Título de la sección (da nombre accesible → rol `region`). */
  title?: string;
  description?: string;
  /** Slot de acciones a la derecha del encabezado (p. ej. "Ver todos"). */
  actions?: React.ReactNode;
  children?: React.ReactNode;
  titleVariant?: 'h3' | 'h4' | 'h5';
  /** Nivel semántico del título (h2 por defecto). */
  titleComponent?: React.ElementType;
  /** Espaciado entre encabezado y contenido. */
  spacing?: number;
  /** Nombre accesible cuando no hay título visible. */
  ariaLabel?: string;
}

/**
 * Agrupación temática (`<section>`). Agrupa contenido relacionado bajo un
 * encabezado. Con `title` o `ariaLabel` es un landmark (rol `region`).
 */
export function Section({
  title,
  description,
  actions,
  children,
  titleVariant = 'h4',
  titleComponent = 'h2',
  spacing = 2,
  ariaLabel,
}: SectionProps) {
  const headingId = React.useId();
  const hasHeader = Boolean(title || description || actions);

  const label = title
    ? { 'aria-labelledby': headingId }
    : ariaLabel
      ? { 'aria-label': ariaLabel }
      : {};

  return (
    <Box component="section" {...label}>
      <Stack spacing={spacing}>
        {hasHeader && (
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            sx={{
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', sm: 'baseline' },
            }}
          >
            <Box>
              {title && (
                <Typography
                  id={headingId}
                  variant={titleVariant}
                  component={titleComponent}
                >
                  {title}
                </Typography>
              )}
              {description && (
                <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                  {description}
                </Typography>
              )}
            </Box>
            {actions && <Box sx={{ flexShrink: 0 }}>{actions}</Box>}
          </Stack>
        )}
        {children}
      </Stack>
    </Box>
  );
}

export default Section;
