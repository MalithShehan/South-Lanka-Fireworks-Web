import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { compression } from 'vite-plugin-compression2'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    compression({ algorithm: 'gzip', threshold: 1024 }),
    compression({ algorithm: 'brotliCompress', threshold: 1024 }),
  ],
  base: './',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Core React + scheduler – loaded immediately (scheduler must stay with react-dom)
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/') || id.includes('node_modules/scheduler')) {
            return 'vendor-react';
          }
          // Framer Motion – needed soon after first paint
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-motion';
          }
          // Firebase – only needed by Feedback section (below-fold)
          if (id.includes('node_modules/firebase') || id.includes('node_modules/@firebase')) {
            return 'vendor-firebase';
          }
          // Heavy PDF/canvas libs – only used on user action
          if (id.includes('node_modules/jspdf') || id.includes('node_modules/html2canvas')) {
            return 'vendor-pdf';
          }
          // SweetAlert2 – only used on form submission
          if (id.includes('node_modules/sweetalert2')) {
            return 'vendor-swal';
          }
          // Other node_modules
          if (id.includes('node_modules/')) {
            return 'vendor-misc';
          }
        },
      },
    },
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    target: 'es2020',
    minify: 'esbuild',
  },
})
