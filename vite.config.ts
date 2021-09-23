import { defineConfig } from 'vite'
import path from 'path'
import build from './build/build'
import plugins from './build/plugins'
import resolve from './build/resolve'
import server from './build/server'

const baseUrl = '/'

// https://vitejs.dev/config/
export default defineConfig({
  envDir: path.resolve(__dirname, 'env'),
  plugins,
  resolve,
  base: baseUrl,
  server,
  build
})
