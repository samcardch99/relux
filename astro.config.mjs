// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // Absolute base for canonical links, share previews and the sitemap.
  site: 'https://relux-construction.com',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()]
});