import { createI18n } from 'vue-i18n'
import pluginMessage from '@intlify/vite-plugin-vue-i18n/messages'

const messages = {
  ...pluginMessage
}

export default function create() {
  return createI18n({
    legacy: false,
    locale: import.meta.env.ENV_I18N_LOCALE || 'en',
    fallbackLocale: import.meta.env.ENV_I18N_FAIL_LOCALE || 'en',
    messages
  })
}
