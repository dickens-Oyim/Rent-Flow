import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    watch: {
      // falls back to polling if inotify watchers are exhausted
      usePolling: true,
      ignored: ['**/node_modules/**', '**/dist/**'],
    },
  },
})
