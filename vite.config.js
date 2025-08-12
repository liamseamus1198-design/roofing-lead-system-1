import { defineConfig } from 'vite';

export default defineConfig({
  // Root directory for the project
  root: 'public',
  
  // Build configuration
  build: {
    outDir: '../dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: 'index.html'
      }
    }
  },
  
  // Development server configuration
  server: {
    port: 3000,
    open: true,
    host: true
  },
  
  // Preview server configuration
  preview: {
    port: 4173,
    open: true
  },
  
  // Optimizations
  optimizeDeps: {
    include: ['script.js']
  },
  
  // CSS configuration
  css: {
    devSourcemap: true
  }
}); 