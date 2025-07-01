// @ts-check

import { defineConfig } from 'astro/config';

import autoprefixer from 'autoprefixer';
import postcssLogical from 'postcss-logical';
import postcssExponentialFunctions from '@csstools/postcss-exponential-functions';

import { remarkFiles } from './site/utils/remark-files.mjs';

export default defineConfig({
  srcDir: './site',
  
  experimental: {
  },

  prefetch: true,

  markdown: {
    remarkPlugins: [remarkFiles],
    shikiConfig: {
      theme: 'night-owl',
    },
    smartypants: false,
  },

  vite: {
    build: {
      assetsInlineLimit: 0,
      sourcemap: process.env.NODE_ENV === 'localhost',
    },
    css: {
      postcss: {
        plugins: [
          autoprefixer(),
          postcssLogical(),
          postcssExponentialFunctions(),
        ]
      }
    }
  },

  integrations: [
  ],
});
