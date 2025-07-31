// @ts-check
import { defineConfig } from 'astro/config';
import path from 'path';
import pageInsight from 'astro-page-insight';

import tailwindcss from '@tailwindcss/vite';



// https://astro.build/config
export default defineConfig({
  i18n: {
    defaultLocale: 'pl',
    locales: ['pl', 'en'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  integrations: [
    pageInsight({
      // For example: threshold: 0.8, // Performance threshold
    })
  ],
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    },
    // Enable image optimization
    domains: [],
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@/ui': path.resolve('./src/components/ui'),
        '@/slices': path.resolve('./src/components/slices'),
        '@/shared': path.resolve('./src/components/shared'),
        '@/layouts': path.resolve('./src/layouts'),
        '@/utils': path.resolve('./src/utils'),
        '@/blocks': path.resolve('./src/components/blocks'),
        '@/content': path.resolve('./src/content'),
        '@/assets': path.resolve('./src/assets')
      }
    }
  },
});
