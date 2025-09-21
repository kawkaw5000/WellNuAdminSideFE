import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://localhost:5129', // backend ASP.NET Core app
        changeOrigin: true,
        secure: false, // allow self-signed dev cert
        // strip nothing because we already prefix with /api
      }
    }
  }
})
