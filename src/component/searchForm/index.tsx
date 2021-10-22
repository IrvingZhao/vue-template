import { defineComponent, inject, ref, PropType, nextTick, VNode, onMounted } from 'vue'
import { ElButtonGroup } from 'element-plus'
import './style.scss'
import ElButton from '../button'
import { dialogButtonConfig } from '../buttonConfig'
import ElDialog from '../dialog'
import { ListPageContext, listPageKey } from '../listPage'

interface SearchTag {
  name: string
  label: string
  value: string
}

interface StateInterface {
  moreButtonVisible: boolean
  moreTag: boolean
  resizeCount: number
  contentComputing: boolean
  moreDiaVisible: boolean
  searchTags: SearchTag[]
}

export default defineComponent({
  name: 'SearchForm',
  props: {
    params: {
      type: Object,
      default: () => {
        return {}
      }
    },
    tags: {
      type: Array as PropType<SearchTag[]>,
      default: () => []
    },
    more: {
      type: Boolean,
      default: false
    }
  },
  components: { ElButton, ElButtonGroup, ElDialog },
  emits: ['remove', 'reset', 'search'],
  setup(props, ctx) {
    const listPage = inject<ListPageContext>(listPageKey)
    if (listPage) {
      listPage.dialogSearch = props.more
    }
    const state: StateInterface = ref({
      moreButtonVisible: false,
      moreDiaVisible: false,
      moreTag: false,
      resizeCount: 0,
      contentComputing: false,
      searchTags: []
    }).value

    const fieldArea = ref<HTMLElement | null>(null)
    const searchContent = ref<HTMLElement | null>(null)
    const searchForm = ref<HTMLElement[]>().value || []

    const visibleMore = () => {
      state.moreDiaVisible = true
    }

    const closeMore = () => {
      state.moreDiaVisible = false
    }

    const closeTag = (tag: any, index: number) => {
      ctx.emit('remove', tag)
      state.searchTags.splice(index, 1)
    }

    const search = () => {
      // 普通表单 提交查询
      ctx.emit('search')
    }

    const updateSearchTags = () => {
      const result: any[] = []
      const { params } = props
      props.tags.forEach((item) => {
        if (params[item.name]) {
          result.push({
            name: item.name,
            label: item.label,
            value: params[item.name]
          })
        }
      })
      state.searchTags = result
    }

    const moreSearchSubmit = () => {
      // 更多条件弹窗提交查询
      state.moreTag = true
      updateSearchTags()
      closeMore()
      search()
    }

    const computedSearchFormWidth = () => {
      if (state.moreTag || state.contentComputing || state.resizeCount === 0) {
        return
      }
      state.contentComputing = true
      state.resizeCount = 0
      // 计算查询条件区域宽度
      const $fieldArea = fieldArea.value
      const $searchContent = searchContent.value
      if (!$fieldArea || !$searchContent) {
        return
      }
      const fieldAreaScrollWidth = $fieldArea.scrollWidth
      const searchContentWidth = $searchContent.offsetWidth
      if (fieldAreaScrollWidth > searchContentWidth) {
        const $searchFormItems = searchForm || []
        for (let i = 0; i < $searchFormItems.length; i += 1) {
          const $formItem = $searchFormItems[i]
          if ($formItem && $formItem instanceof HTMLElement) {
            if ($formItem.offsetLeft + $formItem.offsetWidth > searchContentWidth - 123) {
              $fieldArea.style.maxWidth = `${$formItem.offsetLeft}px`
              state.moreButtonVisible = true
              break
            }
          }
        }
      } else {
        state.moreButtonVisible = false
      }
      state.contentComputing = false
      setTimeout(() => {
        computedSearchFormWidth()
      }, 10)
    }

    const searchFormContentResize = () => {
      if (!props.more) {
        return
      }
      state.resizeCount += 1
      computedSearchFormWidth()
    }

    const reset = () => {
      // 普通表单执行重置
      state.moreTag = false
      ctx.emit('reset')
      nextTick().then(() => {
        searchFormContentResize()
      })
    }

    const keyPressHandle = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.keyCode === 13) {
        search()
      }
    }

    const searchFormRefSetter = (el) => {
      searchForm.push(el)
    }

    const getSearchFormItems = (refName: string): VNode[] => {
      const searchFormItem: VNode[] = []
      const $searchForm = ctx.slots.default
      if ($searchForm) {
        const addSearchFormItem = ($childItem) => {
          if (refName === 'searchForm') {
            searchFormItem.push(
              <div class={'search-form-item'} ref={searchFormRefSetter} onKeypress={keyPressHandle}>
                {$childItem}
              </div>
            )
          } else {
            searchFormItem.push(<div class={'search-form-item'}>{$childItem}</div>)
          }
        }

        $searchForm()
          .flatMap((item) => {
            console.info(item)
            return item
            // return item.children && item.children.length > 0 ? item.children : item
          })
          .forEach(addSearchFormItem)
      }

      return searchFormItem
    }

    onMounted(() => {
      if (props.more) {
        state.resizeCount += 1
        computedSearchFormWidth()
      }
    })

    return {
      fieldArea,
      searchContent,
      state,
      visibleMore,
      closeMore,
      closeTag,
      moreSearchSubmit,
      search,
      reset,
      searchFormContentResize,
      getSearchFormItems,
      computedSearchFormWidth
    }
  },
  render(ctx, cache, props) {
    const $moreButton = ctx.state.moreButtonVisible ? (
      <div class={'more-tag'}>
        <ElButton type={'text'} onClick={ctx.visibleMore}>
          更多条件&gt;
        </ElButton>
      </div>
    ) : null
    const $moreTags = ctx.state.searchTags.map((item, index) => {
      const closeEvent = () => {
        ctx.closeTag(item, index)
      }
      return (
        <div class={'search-tag-item'} key={item.label}>
          <span>
            {item.label}:{item.value}
          </span>
          <span onClick={closeEvent} class={'close el-icon-close'} />
        </div>
      )
    })
    const $moreSearchTag = (
      <div class={'more-search-tag'} key={'more-search-tag'}>
        <div class={'label'}>搜索条件：</div>
        <div class={'search-tags'}>{$moreTags}</div>
        <div class={'operator-button'}>
          <ElButtonGroup>
            <ElButton size={'mini'} plain={true} round={true} onClick={ctx.visibleMore}>
              编辑
            </ElButton>
            <ElButton size={'mini'} plain={true} round={true} onClick={ctx.reset}>
              重置
            </ElButton>
          </ElButtonGroup>
        </div>
      </div>
    )
    const $normalSearch = (
      <div class={'normal-search-area'} key={'normal-search-area'} v-resize={ctx.searchFormContentResize}>
        <div class={'normal-search-content'} ref={'searchContent'} key={'normal-search-content'} v-resize={ctx.searchFormContentResize}>
          <div class={'search-form-item-area'} ref={'fieldArea'}>
            {ctx.getSearchFormItems('searchForm')}
          </div>
          <div class={'operator-button'}>
            <ElButtonGroup>
              <ElButton size={'mini'} plain={true} round={true} onClick={ctx.search}>
                搜索
              </ElButton>
              <ElButton size={'mini'} plain={true} round={true} onClick={ctx.reset}>
                重置
              </ElButton>
            </ElButtonGroup>
          </div>
        </div>
        {$moreButton}
      </div>
    )
    // show-close={false} on={{ close: this.closeMore }}
    // verticalMiddle={true} width={'800px'} min-height={'440px'}

    const dialogFooter = () => (
      <div style={'text-align:right'}>
        <ElButton config={dialogButtonConfig.default} onClick={ctx.closeMore}>
          取消
        </ElButton>
        <ElButton config={dialogButtonConfig.confirm} onClick={ctx.moreSearchSubmit}>
          提交
        </ElButton>
      </div>
    )
    const moreDialog = (
      <ElDialog modelValue={ctx.state.moreDiaVisible} v-slots={{ footer: dialogFooter }}>
        <div class={'dialog-search-form-area'}>{ctx.getSearchFormItems('dialogForm')}</div>
      </ElDialog>
    )
    return (
      <div class={['search-form', { 'has-more': props.more }]}>
        {ctx.state.moreTag ? $moreSearchTag : $normalSearch}
        {props.more ? moreDialog : null}
      </div>
    )
  }
})
