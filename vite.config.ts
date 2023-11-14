import path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/saper/dist/',
  plugins: [vue(), svgLoader()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@views': path.resolve(__dirname, './src/views'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@components': path.resolve(__dirname, './src/components'),
      '@models': path.resolve(__dirname, './src/models'),
      '@store': path.resolve(__dirname, './src/store'),
      '@router': path.resolve(__dirname, './src/router'),
      '@configs': path.resolve(__dirname, './src/configs')
    }
  }
})
