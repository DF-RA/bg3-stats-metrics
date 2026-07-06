import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [reactRouter()],
  resolve: {
    // Resuelve los alias de tsconfig (@/* → src/*, ~/* → app/*).
    tsconfigPaths: true,
  },
});
