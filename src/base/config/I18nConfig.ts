import { createI18n } from 'vue-i18n'
import { App } from 'vue'
import pluginMessage from '@intlify/vite-plugin-vue-i18n/messages'

const messages = {
  ...pluginMessage
}

const i18n = createI18n({
  legacy: false,
  locale: import.meta.env.VITE_I18N_LOCALE || 'en',
  fallbackLocale: import.meta.env.VITE_I18N_FAIL_LOCALE || 'en',
  messages
})

export default {
  install(app: App) {
    app.use(i18n)
  }
}
