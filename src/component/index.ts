import { App } from 'vue'
import Button from './button'
import CheckInput from './checkInput'
import Dialog from './dialog/index.vue'
import MultipleSelect from './multiple-select'
import Pagination from './pagination'

export default {
  install(app: App) {
    app.component('pj-button', Button)
    app.component('pj-check-input', CheckInput)
    app.component('pj-dialog', Dialog)
    app.component('pj-multiple-select', MultipleSelect)
    app.component('pj-pagination', Pagination)
  }
}

export { Button, CheckInput, Dialog, Pagination }

export * from './button'
export * from './checkInput'
export * from './loadingbar'
