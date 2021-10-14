import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import { resolve } from 'path'

export default [
  vue(),
  vueJsx(),
  vueI18n({
    compositionOnly: true,
    include: resolve(__dirname, '../', './src/**/locales/**')
  })
]
