/**
 * Paleta de color inspirada en Baldur's Gate 3.
 *
 * La estética del juego combina fondos oscuros y cálidos (pergamino quemado,
 * piedra), ornamentación en oro/bronce y acentos en carmesí. Aquí centralizamos
 * los tokens crudos; el tema (`theme.ts`) los consume y los mapea a MUI.
 */

export const bg3Colors = {
  // Fondos: negro cálido con tinte marrón, como el pergamino a contraluz.
  ink: {
    900: '#100c08',
    800: '#14100c',
    700: '#1e1913',
    600: '#2a231a',
    500: '#372d21',
  },

  // Oro/bronce: la ornamentación de la UI, botones y bordes.
  gold: {
    light: '#e3c476',
    main: '#c9a24b',
    dark: '#8f7220',
    contrast: '#100c08',
  },

  // Carmesí: peligro, daño, salud enemiga.
  crimson: {
    light: '#c14a45',
    main: '#9b2d2d',
    dark: '#6b1a1a',
    contrast: '#f4e9d8',
  },

  // Texto en tono pergamino.
  parchment: {
    100: '#f4e9d8',
    200: '#ece3d0',
    300: '#d8cbb0',
    400: '#b3a488',
    500: '#8a7d64',
  },

  // Estados semánticos alineados a la paleta.
  success: '#5c8a3a', // veneno/naturaleza
  info: '#3f6fa3', // arcano
  warning: '#c9862b', // concentración
  error: '#9b2d2d',
} as const;

/**
 * Rarezas de objeto de BG3 — base de todo lo relacionado con "escalados".
 * El mismo código de color se usa en la wiki, tooltips y bordes de items.
 */
export const rarityColors = {
  common: '#c9c3b6',
  uncommon: '#4f9d69',
  rare: '#4a7fc1',
  veryRare: '#a05fc4',
  legendary: '#d98a2b',
  story: '#c9a24b',
} as const;

export type Rarity = keyof typeof rarityColors;
