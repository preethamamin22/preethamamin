import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        resume: resolve(__dirname, 'resume.html'),
        findMyPg: resolve(__dirname, 'work/find-my-pg.html'),
        dreamWash: resolve(__dirname, 'work/dream-wash.html'),
        outvox: resolve(__dirname, 'work/outvox.html'),
      },
    },
  },
});

