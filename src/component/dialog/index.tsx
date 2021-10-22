import { computed, defineComponent, ref, Ref, Teleport, Transition } from 'vue'
import { ElDialog, dialogProps, dialogEmits, ElScrollbar, Resize, ElOverlay, TrapFocus, ElButton } from 'element-plus'
import './style.scss'

interface DialogSetupResult {
  appendToBody: boolean
  afterEnter: () => any
  afterLeave: () => any
  beforeLeave: () => any
  visible: any
  modal: any
  modalClass: any
  zIndex: any
  onModalClick: any
  title: string
  dialogRef: Ref<HTMLElement>
  style: any
}

export default defineComponent({
  name: 'Dialog',
  emits: dialogEmits,
  components: { ElScrollbar, Transition, ElOverlay, ElButton },
  directives: { Resize, TrapFocus },
  props: {
    ...dialogProps,
    minHeight: {
      type: String,
      default: ''
    },
    maxHeight: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    },
    verticalMiddle: {
      type: Boolean,
      default: false
    },
    hasScroll: {
      type: Boolean,
      default: true
    }
  },
  setup(props, ctx) {
    const { setup } = ElDialog
    if (!setup) {
      throw new Error('cannot find ElDialog.setup')
    }
    const setupResult: any = setup(props, ctx)
    const dialogResult: DialogSetupResult = setupResult
    const scrollBar = ref<typeof ElScrollbar | null>(null)

    dialogResult.style = computed(() => {
      const computedStyle = dialogResult.style.value || {}
      if (!props.fullscreen) {
        if (!props.verticalMiddle) {
          computedStyle.marginTop = props.top
        }
        if (props.minHeight) {
          computedStyle.minHeight = props.minHeight
        }
        if (props.maxHeight) {
          computedStyle.maxHeight = props.maxHeight
        }
        if (props.height) {
          computedStyle.height = props.height
        }
      }
      return computedStyle
    })

    const computedDialogHeight = () => {
      if (!props.height) {
        const $dialog = dialogResult.dialogRef.value
        $dialog.style.height = `${$dialog.offsetHeight}px`
        const $scrollBar = scrollBar.value
        if ($scrollBar) {
          $scrollBar.update()
        }
      }
    }

    const dialogContentResize = () => {
      if (!props.height) {
        const $dialog = dialogResult.dialogRef.value
        $dialog.style.height = 'auto'
        computedDialogHeight()
      }
    }

    return {
      ...dialogResult,
      scrollBar,
      dialogContentResize
    }
  },
  render(ctx) {
    const mainClass = [
      'el-dialog',
      {
        'is-fullscreen': ctx.fullscreen,
        'el-dialog--center': ctx.center,
        'el-dialog--vertical-middle': ctx.verticalMiddle
      },
      ctx.customClass
    ]
    const $close = ctx.showClose ? (
      <ElButton aria-label={'close'} class={'el-dialog__headerbtn'} onClick={ctx.handleClose}>
        <i class={'el-dialog__close el-icon el-icon-close'} />
      </ElButton>
    ) : null
    const $title = ctx.$slots.title?.() || <span class={'el-dialog__title'}>{ctx.title}</span>
    const $content = ctx.hasScroll ? (
      <el-scrollbar class={'dialog-content-scroll-bar'} ref={ctx.scrollBar}>
        <div v-resize={ctx.dialogContentResize}>{ctx.$slots.default()}</div>
      </el-scrollbar>
    ) : (
      <div class={'no-scroll-dialog-content'}>{ctx.$slots.default()}</div>
    )

    const $body = ctx.rendered ? <div class={'el-dialog__body'}>{$content}</div> : null

    const $footer = ctx.$slots.footer ? <div class={'el-dialog__footer'}>{ctx.$slots.footer()}</div> : null
    return (
      <Teleport to={'body'} disabled={!ctx.appendToBody}>
        <Transition name={'dialog-fade'} onAfterEnter={ctx.afterEnter} onAfterLeave={ctx.afterLeave} onBeforeLeave={ctx.beforeLeave}>
          <ElOverlay
            v-show={ctx.visible}
            mask={ctx.modal}
            overlayClass={ctx.modalClass}
            zIndex={ctx.zIndex}
            onClick={ctx.onModalClick}
            style={'display:flex'}
          >
            <div
              ref="dialogRef"
              v-trap-focus
              class={mainClass}
              aria-modal={'true'}
              role={'dialog'}
              aria-label={ctx.title || 'dialog'}
              style={ctx.style}
            >
              <div class={'el-dialog__header'}>
                {$title}
                {$close}
              </div>
              {$body}
              {$footer}
            </div>
          </ElOverlay>
        </Transition>
      </Teleport>
    )
  }
})
