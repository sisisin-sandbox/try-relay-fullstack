import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import relay from 'vite-plugin-relay';
import { flowPlugin, esbuildFlowPlugin } from '@bunchtogether/vite-plugin-flow';

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    esbuildOptions: { plugins: [esbuildFlowPlugin()] },
  },
  plugins: [flowPlugin(), react(), relay],
  define: {
    global: 'window',
  },
});
