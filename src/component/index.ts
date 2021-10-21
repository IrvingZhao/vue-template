import { App } from 'vue'
import Button from './button'
import CheckInput from './checkInput'
import Dialog from './dialog/index.vue'
import MultipleSelect from './multiple-select'
import Pagination from './pagination'
import Password from './password'

export default {
  install(app: App) {
    app.component('pj-button', Button)
    app.component('pj-check-input', CheckInput)
    app.component('pj-dialog', Dialog)
    app.component('pj-multiple-select', MultipleSelect)
    app.component('pj-pagination', Pagination)
    app.component('pj-password', Password)
  }
}

export { Button, CheckInput, Dialog, Pagination, Password }

export * from './button'
export * from './checkInput'
export * from './loadingbar'
