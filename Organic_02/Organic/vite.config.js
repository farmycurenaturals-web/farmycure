import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

console.log("CONFIG FILE IS LOADED")

export default defineConfig({
  base:"./",
  plugins: [react()],

  server: {
    host: true,
    allowedHosts: true
  },

  preview: {
    host: true,
    allowedHosts: true
  }
})