'use client';

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

/** Un ítem de navegación. */
export interface NavItem {
  label: string;
  href?: string;
  /** Marca el ítem como activo (ruta actual). */
  active?: boolean;
}

export interface NavProps {
  items: NavItem[];
  onItemClick?: (item: NavItem) => void;
  /**
   * Componente de enlace (p. ej. el `Link` del router) para navegación
   * client-side. Si se omite, se usa un `<a>` normal.
   */
  linkComponent?: React.ElementType;
  /** Disposición: fila (header) o columna (drawer móvil). */
  orientation?: 'horizontal' | 'vertical';
  /** Etiqueta accesible del `<nav>`. */
  ariaLabel?: string;
}

export function Nav({
  items,
  onItemClick,
  linkComponent,
  orientation = 'horizontal',
  ariaLabel = 'Navegación principal',
}: NavProps) {
  const isVertical = orientation === 'vertical';
  // Solo pasamos LinkComponent si se proporcionó, para no pisar el `<a>` default.
  const linkProps = linkComponent ? { LinkComponent: linkComponent } : {};

  return (
    <Stack
      component="nav"
      aria-label={ariaLabel}
      direction={isVertical ? 'column' : 'row'}
      spacing={isVertical ? 0.25 : 0.5}
      sx={isVertical ? { alignItems: 'stretch' } : undefined}
    >
      {items.map((item) => (
        <Button
          key={item.label}
          href={item.href}
          {...linkProps}
          onClick={() => onItemClick?.(item)}
          variant="text"
          color={item.active ? 'primary' : 'inherit'}
          aria-current={item.active ? 'page' : undefined}
          sx={{
            fontWeight: item.active ? 700 : 500,
            justifyContent: isVertical ? 'flex-start' : 'center',
          }}
        >
          {item.label}
        </Button>
      ))}
    </Stack>
  );
}

export default Nav;
