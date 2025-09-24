import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // allow access from external IP/domains
    port: 4000,      // your port
    allowedHosts: ["business.dutyhourapp.com", "www.business.dutyhourapp.com", "www.api.dutyhourapp.com", "api.dutyhourapp.com"], // 👈 add your domain here
  },
})