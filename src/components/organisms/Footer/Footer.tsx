'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

/** Un enlace del footer. */
export interface FooterLink {
  label: string;
  href?: string;
}

export interface FooterProps {
  /** Texto de copyright. Si se omite, no se muestra. */
  copyright?: string;
  /** Enlaces (p. ej. Acerca de, GitHub). */
  links?: FooterLink[];
  onLinkClick?: (link: FooterLink) => void;
}

export function Footer({ copyright, links = [], onLinkClick }: FooterProps) {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        color: 'text.secondary',
        borderTop: '1px solid',
        borderColor: 'divider',
        py: 3,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
          }}
        >
          {copyright && <Typography variant="body2">{copyright}</Typography>}

          {links.length > 0 && (
            <Stack
              direction="row"
              spacing={2}
              component="nav"
              sx={{ flexWrap: 'wrap' }}
            >
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => onLinkClick?.(link)}
                  color="inherit"
                  underline="hover"
                  variant="body2"
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          )}
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;
