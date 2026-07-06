import * as React from 'react';
import type { Preview } from '@storybook/react-vite';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { bg3Theme } from '../src/theme/theme';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        bg3: { name: 'BG3 Ink', value: '#14100c' },
        stone: { name: 'Stone', value: '#2a231a' },
        light: { name: 'Light', value: '#ece3d0' },
      },
    },
    a11y: {
      test: 'todo',
    },
  },
  initialGlobals: {
    backgrounds: { value: 'bg3' },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={bg3Theme}>
        <CssBaseline />
        {/*
         * En Storybook los enlaces (<a href>) no deben navegar de verdad:
         * romperían el iframe del canvas. En fase de burbuja prevenimos la
         * navegación SOLO si nadie la gestionó antes: un router client-side
         * (p. ej. el <Link> de React Router) llama a preventDefault al navegar,
         * así que lo detectamos vía `defaultPrevented` y lo dejamos pasar.
         * Los handlers de React (onNavItemClick…) siguen ejecutándose.
         * `display: contents` evita que el wrapper altere el layout.
         */}
        <div
          style={{ display: 'contents' }}
          onClick={(event) => {
            if (event.defaultPrevented) return;
            const anchor = (event.target as HTMLElement).closest?.('a');
            if (anchor?.getAttribute('href')) event.preventDefault();
          }}
        >
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default preview;
