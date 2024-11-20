import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { defineConfig } from 'vite';
import { resolve } from 'path'; // Only import resolve

export default defineConfig({
  resolve: {
    alias: {
      $stores: resolve('./src/stores'),
      $imagegallery: resolve('./static/assets/images/gallery'), // Ensure correct alias
    },
  },
  server: {
    fs: {
      allow: [
        '/mnt/Files/Dropbox/svelte/pitikcats/public/assets/images/design',
        '/mnt/Files/Dropbox/svelte/pitikcats/public/assets/images/gallery',
        '/mnt/Files/Dropbox/svelte/pitikcats/src/assets/images/design',
        '/mnt/Files/Dropbox/svelte/pitikcats/src/assets/images/gallery',
      ],
    },
  },
  base: '/',
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
      },
    },
  },
  plugins: [
    enhancedImages(),
    sveltekit(),
  ],
});
