import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-mcp',
  ],
  framework: '@storybook/react-vite',
  staticDirs: ['../public'],
  async viteFinal(viteConfig) {
    // El plugin de React Router (de vite.config.ts) requiere el contexto de RR
    // y no aplica en Storybook. Lo quitamos (viene anidado en un array);
    // Storybook aporta su propio plugin de React.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const flatten = (list: any[]): any[] =>
      list.flatMap((item) => (Array.isArray(item) ? flatten(item) : [item]));

    viteConfig.plugins = flatten(viteConfig.plugins ?? []).filter((plugin) => {
      const name =
        plugin && typeof plugin === 'object' && 'name' in plugin
          ? (plugin as { name?: string }).name
          : undefined;
      return !(typeof name === 'string' && name.includes('react-router'));
    });
    return viteConfig;
  },
};
export default config;
