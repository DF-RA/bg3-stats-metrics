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
         * En Storybook los enlaces (<a href>) no deben navegar: romperían el
         * iframe del canvas. Prevenimos la navegación por defecto; los handlers
         * de React (onNavItemClick, onLinkClick…) siguen ejecutándose, así que
         * los play functions y sus aserciones no se ven afectados.
         * `display: contents` evita que el wrapper altere el layout.
         */}
        <div
          style={{ display: 'contents' }}
          onClickCapture={(event) => {
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
