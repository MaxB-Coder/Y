import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // The portfolio serves the demo from a sub-path, e.g. /demos/y/
  base: process.env.DEMO_BASE ?? '/',
  // A constant, so normal builds drop the demo code (src/demo) entirely
  define: {
    'import.meta.env.VITE_DEMO': JSON.stringify(process.env.VITE_DEMO ?? 'false'),
  },
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.js'],
    testMatch: ['./tests/**/*.test.jsx'],
    globals: true,
    coverage: {
      provider: 'v8',
    },
  },
});
