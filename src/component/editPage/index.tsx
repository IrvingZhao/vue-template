import { defineComponent } from 'vue'
import { ElScrollbar } from 'element-plus'

export default defineComponent({
  name: 'EditPage',
  components: { ElScrollbar },
  props: {
    type: {
      type: String,
      default: 'form'
    },
    contentScroll: {
      type: Boolean,
      default: true
    }
  },
  render() {
    const $title = this.$slots.title ? <div class={'title'}>{this.$slots.title()}</div> : null
    const $steps = this.$slots.step ? <div class={'step'}>{this.$slots.step()}</div> : null
    const $secTitle = this.$slots.secTitle ? <div class={'sec-title'}>{this.$slots.secTitle()}</div> : null
    const $content = this.$slots.default ? this.$slots.default() : null
    const $buttons = this.$slots.buttons ? this.$slots.buttons() : null

    let $editMainContent
    let $outContainerButtons: any = null

    if (this.type === 'full') {
      $editMainContent = this.contentScroll ? <ElScrollbar>{$content}</ElScrollbar> : $content
      $outContainerButtons = <div class={'out-buttons'}>{$buttons}</div>
    } else {
      $editMainContent = (
        <ElScrollbar>
          <div class={'edit-main-content'}>
            <div class={'edit-form-content'}>{$content}</div>
            <div class={'button'}>{$buttons}</div>
          </div>
        </ElScrollbar>
      )
    }
    return (
      <div class={['pj-edit-page', this.type]}>
        {$title}
        {$secTitle}
        {$steps}
        <div class={'edit-page-container'}>{$editMainContent}</div>
        {$outContainerButtons}
      </div>
    )
  }
})
