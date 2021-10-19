import { App } from 'vue'
import Button from './button'
import CheckInput from './checkInput'
import Pagination from './pagination'

export default {
  install(app: App) {
    app.component('pj-button', Button)
    app.component('pj-check-input', CheckInput)
    app.component('pj-pagination', Pagination)
  }
}

export * from './button'
export * from './checkInput'
export * from './loadingbar'
