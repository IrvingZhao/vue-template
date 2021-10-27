import { resolve } from 'path'

export default {
  alias: {
    theme: resolve(__dirname, '../', 'theme'),
    'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
    '@': resolve(__dirname, '../', 'src'),
    '~element-plus': resolve(__dirname, '../', 'node_modules', 'element-plus')
  }
}
