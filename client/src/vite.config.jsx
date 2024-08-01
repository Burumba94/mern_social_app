import { defineConfig } from 'vite';

export default defineConfig({
  //... other config options...
  build: {
    mimeTypes: {
      js: 'application/javascript',
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5173',
    },
  },
});