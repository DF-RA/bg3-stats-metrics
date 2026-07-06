'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ShieldMoonOutlinedIcon from '@mui/icons-material/ShieldMoonOutlined';
import { Nav, type NavItem } from '@/components/molecules/Nav';

/** Un ítem de navegación del header. */
export type HeaderNavItem = NavItem;

export interface HeaderProps {
  /** Título/marca de la aplicación. */
  title?: string;
  /** Ítems de navegación (se ocultan en pantallas pequeñas). */
  navItems?: HeaderNavItem[];
  onNavItemClick?: (item: HeaderNavItem) => void;
  /** Slot de acciones al extremo derecho (p. ej. perfil, tema). */
  actions?: React.ReactNode;
  /** Handler al pulsar la marca (p. ej. ir a inicio). */
  onBrandClick?: () => void;
  /**
   * Componente de enlace para la navegación (p. ej. el `Link` del router) y así
   * conseguir transiciones client-side. Si se omite, se usa un `<a>` normal.
   */
  linkComponent?: React.ElementType;
}

export function Header({
  title = 'BG3 Stats Metrics',
  navItems = [],
  onNavItemClick,
  actions,
  onBrandClick,
  linkComponent,
}: HeaderProps) {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        color: 'text.primary',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar sx={{ gap: 2 }}>
        {/* Marca */}
        <Stack
          direction="row"
          spacing={1}
          onClick={onBrandClick}
          sx={{
            alignItems: 'center',
            cursor: onBrandClick ? 'pointer' : 'default',
            userSelect: 'none',
          }}
        >
          <ShieldMoonOutlinedIcon sx={{ color: 'primary.main' }} />
          <Typography
            variant="h6"
            component="span"
            sx={{
              fontFamily: 'var(--font-display, serif)',
              letterSpacing: '0.04em',
              whiteSpace: 'nowrap',
            }}
          >
            {title}
          </Typography>
        </Stack>

        {/* Navegación (oculta en pantallas pequeñas) */}
        {navItems.length > 0 && (
          <Box sx={{ display: { xs: 'none', md: 'block' }, ml: 2 }}>
            <Nav
              items={navItems}
              onItemClick={onNavItemClick}
              linkComponent={linkComponent}
            />
          </Box>
        )}

        {/* Empuja las acciones a la derecha */}
        <Box sx={{ flexGrow: 1 }} />

        {actions && (
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            {actions}
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
