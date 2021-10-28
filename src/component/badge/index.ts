import { defineComponent } from 'vue'
import { badgeProps, ElBadge } from 'element-plus'
import { generateTypeProp } from '../theme'
import './theme.scss'

const type = generateTypeProp('danger')

export default defineComponent({
  props: {
    ...badgeProps,
    type
  },
  render: ElBadge.render,
  setup(props, ctx) {
    return ElBadge.setup?.(props as any, ctx)
  }
})

// TODO badgeProps 原有内容 ts 检查问题
