import { App } from 'vue'
import Button, { ButtonConfig } from './button'
import CheckInput, { CheckInputValue } from './checkInput'

export default {
  install(app: App) {
    app.component('pj-button', Button)
    app.component('pj-check-input', CheckInput)
  }
}

export { ButtonConfig, CheckInputValue }
