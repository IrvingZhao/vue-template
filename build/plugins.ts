import { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import ElementPlus from 'unplugin-element-plus'
import { resolve } from 'path'

const plugins: Plugin[] = [
  vue(),
  vueJsx(),
  vueI18n({
    compositionOnly: true,
    include: resolve(__dirname, '../', './src/**/locales/**')
  }),
  ElementPlus.rollup({ useSource: true }) as Plugin
]

export default plugins
