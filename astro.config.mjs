// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // Absolute base for canonical links and share previews. Change it to
  // https://relux-construction.com when the site moves to the main domain.
  site: 'https://test.relux-construction.com',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()]
});