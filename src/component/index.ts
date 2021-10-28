import { App } from 'vue'
import Badge from './badge'
import Button from './button'
import CheckInput from './check-input'
import Dialog from './dialog'
import EditPage from './edit-page'
import Link from './link'
import ListPage from './list-page'
import MultipleSelect from './multiple-select'
import Pagination from './pagination'
import Password from './password'
import SearchForm from './search-form'
import Tag from './tag'

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
    app.component('pj-search-form', SearchForm)
  }
}

export { Badge, Button, CheckInput, Dialog, EditPage, Link, ListPage, MultipleSelect, Pagination, Password, SearchForm, Tag }

export * from './button'
export * from './button-config'
export * from './check-input'
export * from './loadingbar'
