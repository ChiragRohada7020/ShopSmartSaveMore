import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),],
   server: {
    proxy: {
      '/auth': {
        target: 'http://localhost:8082',
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace(/^\/auth/, '/auth')
      },
      '/compare': {
        target: 'http://localhost:8082',
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace(/^\/auth/, '/auth')
      },
      '/cart': {
        target: 'http://localhost:8082',
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace(/^\/auth/, '/auth')
      }
    }}
})
