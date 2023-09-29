import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import mkcert from 'vite-plugin-mkcert';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

export default defineConfig({
  server: {
    https: true,
  },
  plugins: [sveltekit(), mkcert({ savePath: '.mkcert' })],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
});
