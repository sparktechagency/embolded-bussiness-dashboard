import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "217.15.171.166", // allow access from external IP/domains
    port: 4000,      // your port

  },
})