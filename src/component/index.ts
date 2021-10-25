import { App } from 'vue'
import Button from './button'
import CheckInput from './check-input'
import Dialog from './dialog'
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

export { Button, CheckInput, Dialog, MultipleSelect, Pagination, Password }

export * from './button'
export * from './check-input'
export * from './loadingbar'
