import { resolve } from 'node:path';
import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  {
    resolve: { alias: { 'react-tracked': resolve('src') } },
    test: {
      name: 'spec',
      environment: 'happy-dom',
      setupFiles: ['./tests/vitest-setup.js'],
    },
  },
  {
    test: {
      name: 'e2e',
      include: ['./tests/e2e/*.ts'],
      testTimeout: 15 * 1000,
    },
  },
]);
