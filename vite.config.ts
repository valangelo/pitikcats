import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { defineConfig } from 'vite';


export default defineConfig({
	server: {
		fs: {
		  allow: [
			'/mnt/Files/Dropbox/svelte/pitikcats/public/assets/images', // Add your images directory
			// You can add other directories if needed
		  ]
		}
	  },
	base: '/',
	css: {
		preprocessorOptions: {
		  scss: {
			api: 'modern' 
		  }
		}
	  },
	  plugins: [
		enhancedImages(),
		sveltekit()
	  ]
});
