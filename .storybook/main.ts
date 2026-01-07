import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import * as path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      base: '/product-design/',
      resolve: {
        alias: {
          '@': path.resolve(process.cwd(), 'src'),
        },
      },
    });
  },
};

export default config;

