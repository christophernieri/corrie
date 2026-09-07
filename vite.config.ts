import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Relative assets support both the custom Pages domain and /corrie/ fallback.
  base: './',
  plugins: [react()],
})
