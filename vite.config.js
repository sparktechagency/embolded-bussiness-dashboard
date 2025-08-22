import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host:"10.10.7.109",
    port: 4000, // change to your desired port
  },
})
