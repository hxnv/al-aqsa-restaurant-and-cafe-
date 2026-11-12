import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 5173, host: true },
  build: {
    chunkSizeWarningLimit: 700,
    assetsInlineLimit: 0,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: { react: ['react', 'react-dom'], motion: ['framer-motion', 'lenis'] },
      },
    },
  },
});
