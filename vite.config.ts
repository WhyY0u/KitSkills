import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    host: 'localhost',
    allowedHosts: ['b8f13df2d8de.ngrok-free.app', 'frondix.store'],
    proxy: {
      '/api': {
        target: 'https://drtyui.ru',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false
      },
      '/competencies': {
        target: 'https://frondix.store',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/competencies/, '/api/competencies'),
        secure: false
      }
    }
  },
})
