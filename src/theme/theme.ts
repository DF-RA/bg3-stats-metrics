'use client';

import { createTheme } from '@mui/material/styles';
import { bg3Colors, rarityColors, type Rarity } from './palette';

/**
 * Extensión del tema de MUI: añadimos una paleta de `rarity` para poder usar
 * `color="legendary"` u obtener `theme.palette.rarity.rare` en cualquier
 * componente de stats/escalados.
 */
declare module '@mui/material/styles' {
  interface Palette {
    rarity: Record<Rarity, string>;
  }
  interface PaletteOptions {
    rarity?: Record<Rarity, string>;
  }
}

export const bg3Theme = createTheme({
  cssVariables: true,
  palette: {
    mode: 'dark',
    primary: {
      light: bg3Colors.gold.light,
      main: bg3Colors.gold.main,
      dark: bg3Colors.gold.dark,
      contrastText: bg3Colors.gold.contrast,
    },
    secondary: {
      light: bg3Colors.crimson.light,
      main: bg3Colors.crimson.main,
      dark: bg3Colors.crimson.dark,
      contrastText: bg3Colors.crimson.contrast,
    },
    background: {
      default: bg3Colors.ink[800],
      paper: bg3Colors.ink[700],
    },
    text: {
      primary: bg3Colors.parchment[200],
      secondary: bg3Colors.parchment[400],
    },
    success: { main: bg3Colors.success },
    info: { main: bg3Colors.info },
    warning: { main: bg3Colors.warning },
    error: { main: bg3Colors.error },
    divider: 'rgba(201, 162, 75, 0.24)',
    rarity: rarityColors,
  },

  shape: {
    borderRadius: 4,
  },

  typography: {
    fontFamily: 'var(--font-body, "Georgia", "Times New Roman", serif)',
    h1: { fontFamily: 'var(--font-display, "Cinzel", serif)', fontWeight: 700 },
    h2: { fontFamily: 'var(--font-display, "Cinzel", serif)', fontWeight: 700 },
    h3: { fontFamily: 'var(--font-display, "Cinzel", serif)', fontWeight: 600 },
    h4: { fontFamily: 'var(--font-display, "Cinzel", serif)', fontWeight: 600 },
    button: { textTransform: 'none', letterSpacing: '0.03em' },
  },

  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          border: `1px solid ${bg3Colors.gold.dark}33`,
          backgroundImage: 'none',
        },
      },
    },
    MuiButton: {
      defaultProps: { variant: 'contained' },
      styleOverrides: {
        root: {
          borderRadius: 2,
        },
      },
    },
  },
});
