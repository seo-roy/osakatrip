import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Project Pages: https://seo-roy.github.io/osakatrip/
// (User/org root Pages would use base: '/' instead.)
export default defineConfig({
  base: '/osakatrip/',
  plugins: [react()],
})
