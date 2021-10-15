import { App } from 'vue'
import Button, { ButtonConfig } from './button'

export default {
  install(app: App) {
    app.component('pj-button', Button)
  }
}

export { ButtonConfig }
