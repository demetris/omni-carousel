// @ts-check

import { defineConfig } from 'astro/config';

import autoprefixer from 'autoprefixer';
import postcssLogical from 'postcss-logical';
import postcssExponentialFunctions from '@csstools/postcss-exponential-functions';

import { remarkFiles } from './site/utils/remark-files.mjs';
import { rehypeTables } from './site/utils/rehype-tables.mjs';

export default defineConfig({
  srcDir: './site',
  
  experimental: {
  },

  prefetch: true,

  markdown: {
    remarkPlugins: [remarkFiles],
    rehypePlugins: [rehypeTables],
    shikiConfig: {
      theme: 'night-owl',
      transformers: [
        {
          span(node) {
            //
            // Override comment color for better contrast
            //
            if (
              typeof node.properties?.style === 'string'
              && node.properties.style.includes('color:#637777')
            ) {
              node.properties.style = node.properties.style.replace('#637777', '#A1A7B1');
            }
          }
        }
      ]
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
