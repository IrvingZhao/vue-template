<template>
  <teleport to="body" :disabled="!appendToBody">
    <transition name="dialog-fade" @after-enter="afterEnter" @after-leave="afterLeave" @before-leave="beforeLeave">
      <el-overlay v-show="visible" :mask="modal" :overlay-class="modalClass" :z-index="zIndex" @click="onModalClick" style="display: flex">
        <div
          ref="dialogRef"
          v-trap-focus
          :class="[
            'el-dialog',
            {
              'is-fullscreen': fullscreen,
              'el-dialog--center': center,
              'el-dialog--vertical-middle': verticalMiddle
            },
            customClass
          ]"
          aria-modal="true"
          role="dialog"
          :aria-label="title || 'dialog'"
          :style="style"
          @click.stop=""
        >
          <div class="el-dialog__header">
            <slot name="title">
              <span class="el-dialog__title">
                {{ title }}
              </span>
            </slot>
            <button v-if="showClose" aria-label="close" class="el-dialog__headerbtn" type="button" @click="handleClose">
              <i class="el-dialog__close el-icon el-icon-close"></i>
            </button>
          </div>
          <template v-if="rendered">
            <div class="el-dialog__body">
              <el-scrollbar v-if="hasScroll" class="dialog-content-scroll-bar" ref="scrollBar">
                <div v-resize="dialogContentResize">
                  <slot></slot>
                </div>
              </el-scrollbar>
              <div class="no-scroll-dialog-content" v-else>
                <slot></slot>
              </div>
            </div>
          </template>
          <div v-if="$slots.footer" class="el-dialog__footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </el-overlay>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { computed, defineComponent, ref, Ref } from 'vue'
import { ElDialog, ElScrollbar, Resize } from 'element-plus'

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
  name: 'PjDialog',
  extends: ElDialog,
  emits: ElDialog.emits,
  components: { ElScrollbar },
  directives: { Resize },
  props: {
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
  }
})
</script>

<style lang="scss" src="./style.scss"></style>
