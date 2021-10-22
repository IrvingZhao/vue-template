import { App } from 'vue'
import Button from './button'
import CheckInput from './checkInput'
import Dialog from './dialog/index.vue'
import EditPage from './editPage'
import ListPage from './listPage'
import MultipleSelect from './multiple-select'
import Pagination from './pagination'
import Password from './password'

export default {
  install(app: App) {
    app.component('pj-button', Button)
    app.component('pj-check-input', CheckInput)
    app.component('pj-dialog', Dialog)
    app.component('pj-edit-page', EditPage)
    app.component('pj-list-page', ListPage)
    app.component('pj-multiple-select', MultipleSelect)
    app.component('pj-pagination', Pagination)
    app.component('pj-password', Password)
  }
}

export { Button, CheckInput, Dialog, EditPage, Pagination, Password }

export * from './button'
export * from './checkInput'
export * from './loadingbar'
