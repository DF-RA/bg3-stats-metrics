'use client';

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export interface ArticleProps {
  /** Título del artículo (da nombre accesible al `<article>`). */
  title?: string;
  subtitle?: string;
  /** Slot de acciones a la derecha del encabezado (p. ej. botones). */
  actions?: React.ReactNode;
  children?: React.ReactNode;
  /** Variante tipográfica del título. */
  titleVariant?: 'h4' | 'h5' | 'h6';
  /** Nivel semántico del título (h2 por defecto). */
  titleComponent?: React.ElementType;
  /** Estilo del contenedor. */
  variant?: 'elevated' | 'outlined' | 'plain';
}

/**
 * Bloque de contenido autocontenido (`<article>`). Se coloca dentro del `Main`.
 * Con `title` obtiene un nombre accesible (`aria-labelledby`).
 */
export function Article({
  title,
  subtitle,
  actions,
  children,
  titleVariant = 'h5',
  titleComponent = 'h2',
  variant = 'elevated',
}: ArticleProps) {
  const headingId = React.useId();
  const hasHeader = Boolean(title || subtitle || actions);

  const content = (
    <>
      {hasHeader && (
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
          sx={{
            mb: 2,
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
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
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          {actions && (
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              {actions}
            </Stack>
          )}
        </Stack>
      )}
      {children}
    </>
  );

  const labelledBy = title ? { 'aria-labelledby': headingId } : {};

  if (variant === 'plain') {
    return (
      <Box component="article" {...labelledBy}>
        {content}
      </Box>
    );
  }

  return (
    <Paper
      component="article"
      variant={variant === 'outlined' ? 'outlined' : 'elevation'}
      {...labelledBy}
      sx={{ p: 3 }}
    >
      {content}
    </Paper>
  );
}

export default Article;
