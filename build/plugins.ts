import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import componentImport from 'vite-plugin-imp'
import { resolve } from 'path'
import { existsSync } from 'fs'

export default [
  vue(),
  vueJsx(),
  vueI18n({
    compositionOnly: true,
    include: resolve(__dirname, '../', './src/**/locales/**')
  }),
  componentImport({
    libList: [
      {
        libName: 'element-plus',
        style(name) {
          const path = `theme/lib/${name}.css`
          if (existsSync(resolve(__dirname, '../', path))) {
            return path
          }
          return false
        }
      }
    ]
  })
]
