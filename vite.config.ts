/// <reference types="vitest" />

import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const { DIR, PORT = '8080' } = process.env;

export default defineConfig(({ mode }) => {
  if (mode === 'test') {
    return {
      resolve: { alias: { 'react-tracked': resolve('src') } },
      test: {
        environment: 'happy-dom',
        setupFiles: ['./tests/vitest-setup.js'],
      },
    };
  }
  if (!DIR) {
    throw new Error('DIR environment variable is required');
  }
  return {
    root: resolve('examples', DIR),
    server: { port: Number(PORT) },
    resolve: { alias: { 'react-tracked': resolve('src') } },
  };
});
