import { defineComponent } from 'vue'
import { ElPagination, paginationEmits, paginationProps } from 'element-plus'

export default defineComponent({
  name: 'pagination',
  components: { ElPagination },
  props: {
    ...paginationProps,
    pageInfo: {
      type: Object
    }
  },
  emits: paginationEmits,
  setup(props, ctx) {
    const wrapEvent = (key) => {
      return (val) => {
        ctx.emit(key, val)
      }
    }
    const { pageInfo } = props

    const currentPageHandle = (val) => {
      if (pageInfo) {
        pageInfo.pageIndex = val
      }
      ctx.emit('update:current-page', val)
    }

    const pageSizeHandle = (val) => {
      if (pageInfo) {
        pageInfo.pageSize = val
      }
      ctx.emit('update:page-size', val)
    }

    return { wrapEvent, currentPageHandle, pageSizeHandle }
  },
  render(ctx, cache, props) {
    const newProps = {
      ...props,
      pageSize: props.pageInfo?.pageSize || props.pageSize,
      currentPage: props.pageInfo?.pageIndex || props.currentPage,
      total: props.pageInfo?.total || props.total || 0,
      'onSize-change': ctx.wrapEvent('size-change'),
      'onCurrent-change': ctx.wrapEvent('current-change'),
      'onPrev-click': ctx.wrapEvent('prev-click'),
      'onNext-click': ctx.wrapEvent('next-click'),
      'onUpdate:currentPage': ctx.currentPageHandle,
      'onUpdate:pageSize': ctx.pageSizeHandle
    }

    return <ElPagination {...newProps} />
  }
})
