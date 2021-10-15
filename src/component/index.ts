import { App } from 'vue'
import Button from './button'
import CheckInput from './checkInput'

export default {
  install(app: App) {
    app.component('pj-button', Button)
    app.component('pj-check-input', CheckInput)
  }
}

export * from './button'
export * from './checkInput'
