import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import vue from '@vitejs/plugin-vue';
import ElementPlusLoader from 'unplugin-element-plus/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({ registerType: 'autoUpdate' }),
    ElementPlusLoader({}),
  ],

  server: {
    hmr: true,
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src/', import.meta.url)),
      '@api': fileURLToPath(new URL('./src/api/', import.meta.url)),
      '@comp': fileURLToPath(new URL('./src/components/', import.meta.url)),
      '@page': fileURLToPath(new URL('./src/page/', import.meta.url)),
      '@const': fileURLToPath(new URL('./src/constants/', import.meta.url)),
      '@typings': fileURLToPath(new URL('./src/typings/', import.meta.url)),
    },
  },
});
