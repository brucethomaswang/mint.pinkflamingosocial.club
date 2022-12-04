import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react'
import svgrPlugin from 'vite-plugin-svgr'
import path from 'path'

export default defineConfig({
  plugins: [
    reactRefresh(),
    svgrPlugin({
      svgrOptions: {
        icon: true
      }
    })
  ],
  resolve: {
    alias: {
      abi: path.resolve(__dirname, './src/abi'),
      assets: path.resolve(__dirname, './src/assets'),
      components: path.resolve(__dirname, './src/components'),
      pages: path.resolve(__dirname, './src/pages'),
      hooks: path.resolve(__dirname, './src/hooks'),
      services: path.resolve(__dirname, './src/services'),
      providers: path.resolve(__dirname, './src/providers'),
      utils: path.resolve(__dirname, './src/utils'),
      config: path.resolve(__dirname, './src/config.ts')
    }
  }
})
