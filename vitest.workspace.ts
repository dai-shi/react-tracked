import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  {
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
