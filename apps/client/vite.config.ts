/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/client',
  server: {
    port: parseInt(process.env.CLIENT_PORT || '4200', 10),
    host: process.env.CLIENT_HOST || 'localhost',
  },
  preview: {
    port: parseInt(process.env.CLIENT_PREVIEW_PORT || '4300', 10),
    host: process.env.CLIENT_HOST || 'localhost',
  },
  plugins: [react(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],
  define: {
    'process.env': {
      'SERVER_HOSTNAME': process.env.SERVER_HOSTNAME,
      'SERVER_PORT': process.env.SERVER_PORT,
      'SERVER_BASE_URL': process.env.SERVER_BASE_URL,
      'CLIENT_HOSTNAME': process.env.CLIENT_HOSTNAME,
      'CLIENT_PORT': process.env.CLIENT_PORT,
      'CLIENT_BASE_URL': process.env.CLIENT_BASE_URL,
    }
  },
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  build: {
    outDir: '../../dist/apps/client',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  test: {
    name: 'client',
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/apps/client',
      provider: 'v8' as const,
    },
  },
}));
