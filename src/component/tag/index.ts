import { defineComponent } from 'vue'
import { ElTag, tagProps, tagEmits } from 'element-plus'
import { generateTypeProp } from '@/component/theme'
import './theme.scss'

const type = generateTypeProp()

export default defineComponent({
  props: {
    ...tagProps,
    type
  },
  emits: tagEmits,
  render: ElTag.render,
  setup(props, ctx) {
    return ElTag.setup?.(props as any, ctx)
  }
})
