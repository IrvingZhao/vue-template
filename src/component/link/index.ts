import { defineComponent } from 'vue'
import { ElLink, linkProps, linkEmits } from 'element-plus'
import { generateTypeProp } from '../theme'
import './theme.scss'

const type = generateTypeProp()

export default defineComponent({
  props: {
    ...linkProps,
    type
  },
  render: ElLink.render,
  emits: linkEmits,
  setup(props, ctx) {
    return ElLink.setup?.(props as any, ctx)
  }
})
