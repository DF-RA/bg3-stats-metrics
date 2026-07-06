import type { Config } from '@react-router/dev/config';

export default {
  // SPA estática sin backend: sin SSR en runtime. `react-router build` genera
  // un cliente estático en build/client/ (index.html + assets).
  ssr: false,
} satisfies Config;
