import { defineComponent, provide, ref, InjectionKey, reactive } from 'vue'
import './style.scss'

export interface ListPageContext {
  dialogSearch: boolean
}

export const listPageKey: InjectionKey<ListPageContext> = Symbol('listPage')

export default defineComponent({
  name: 'ListPage',
  props: {
    followForm: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const dialogSearch = ref(false)

    const listPage: ListPageContext = reactive({
      dialogSearch
    })

    provide(listPageKey, listPage)

    return {
      dialogSearch
    }
  },
  render() {
    const { searchForm, dataTag, toolbar, grid, pagination } = this.$slots
    const renderFollowForm = !dataTag && this.followForm && !this.dialogSearch
    const $searchForm =
      renderFollowForm || searchForm ? (
        <div class={'search-form-area'}>
          <div class={'search-form-content'}>{searchForm && searchForm()}</div>
          {renderFollowForm ? <div class={'form-tool-bar'}>{toolbar && toolbar()}</div> : null}
        </div>
      ) : null
    let $toolbar
    if (!renderFollowForm) {
      const $dataTag = dataTag ? <div class={'data-tag-area'}>{dataTag()}</div> : null
      $toolbar = (
        <div class={'tool-bar'}>
          {$dataTag}
          <div class={'button-area'}>{toolbar && toolbar()}</div>
        </div>
      )
    }

    return (
      <div class={['list-page', { 'follow-form': renderFollowForm }]}>
        {$searchForm}
        {$toolbar}
        <div class={'grid'}>{grid && grid()}</div>
        <div class={'pagination'}>{pagination && pagination()}</div>
      </div>
    )
  }
})
