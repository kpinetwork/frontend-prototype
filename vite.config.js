import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  return {
    mode: mode,
    plugins: [react()],
    server: {
      host: true
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@components': path.resolve(__dirname, 'src/components')
      }
    },
    test: {
      global: true,
      environment: 'happy-dom'
    }
  }
})
