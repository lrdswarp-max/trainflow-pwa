import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'TrainFlow',
        short_name: 'TrainFlow',
        description: 'A PWA that connects personal trainers with their students.',
        theme_color: '#1A1F3A',
        background_color: '#1A1F3A',
        display: 'standalone',
        icons: [
          {
            src: 'favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./src/lib/db.test.ts']
  }
})
