import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'github-pages-spa-fallback',
      closeBundle() {
        const indexPath = resolve(__dirname, 'dist/index.html')
        copyFileSync(indexPath, resolve(__dirname, 'dist/404.html'))
      },
    },
  ],
  base: '/',
})
