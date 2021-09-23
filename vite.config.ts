import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import componentImport from 'vite-plugin-imp'
import { resolve } from 'path'

const host = 'localhost'
const port = 3000
const baseUrl = '/'
const outputDir = 'dist/render'

const proxy = {
  '/api': {
    target: 'http://localhost:8080',
    changeOrigin: true,
    ws: true,
    logLevel: 'debug'
  }
}

interface ModuleResolve {
  pattern: RegExp
  executor: ((id: string, regResult: RegExpExecArray) => string) | string
}

const moduleResolves: ModuleResolve[] = [
  {
    pattern: /\/node_modules\/element-plus/,
    executor: 'element-plus'
  },
  {
    pattern: /\/node_modules\/vue/,
    executor: 'vue'
  },
  {
    pattern: /\/node_modules\//,
    executor: 'vendor'
  },
  {
    pattern: /\/theme\//,
    executor: 'element-plus'
  },
  {
    pattern: /\/src\/([^/])*\/*/,
    executor(id) {
      const paths = id.split('/')
      const result: string[] = []
      let check = false
      for (let i = 0; i < paths.length; i += 1) {
        const pathItem = paths[i]
        if (check) {
          result.push(pathItem)
        }
        if (pathItem === 'src') {
          check = true
        }
      }
      result.pop()
      return result.join('/')
    }
  }
]

// https://vitejs.dev/config/
export default defineConfig({
  envDir: resolve(__dirname, 'env'),
  plugins: [
    vue(),
    vueJsx(),
    componentImport({
      libList: [
        {
          libName: 'element-plus',
          style(name) {
            if (name.indexOf('el') > -1) {
              return `theme/lib/${name}.css`
            }
            return false
          }
        }
      ]
    }),
    vueI18n({
      compositionOnly: true,
      include: resolve(__dirname, './src/render/**/locales/**')
    })
  ],
  resolve: {
    alias: {
      theme: resolve(__dirname, 'theme'),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
    }
  },
  base: baseUrl,
  server: {
    host,
    port,
    proxy
  },
  build: {
    outDir: outputDir,
    rollupOptions: {
      output: {
        manualChunks(id) {
          for (let i = 0; i < moduleResolves.length; i += 1) {
            const pathExecutor = moduleResolves[i]
            const patternResult = pathExecutor.pattern.exec(id)
            if (patternResult) {
              if (pathExecutor.executor instanceof Function) {
                return pathExecutor.executor(id, patternResult)
              }
              return pathExecutor.executor
            }
          }
          return undefined
        }
      }
    }
  }
})
