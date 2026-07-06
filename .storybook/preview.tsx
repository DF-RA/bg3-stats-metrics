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
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;
