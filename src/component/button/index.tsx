import { defineComponent, ref, computed, PropType } from 'vue'
import { ElButton, buttonProps, buttonEmits, ElTooltip, Effect } from 'element-plus'
import { generateTypeProp, generateSizeProp } from '../theme'
import './theme.scss'

export interface ButtonConfig {
  type?: ComponentColor
  size?: ComponentSize
  icon?: string
  plain?: boolean
  round?: boolean
  circle?: boolean
  minWidth?: string | number
}

const size = generateSizeProp()
const type = generateTypeProp()

const EL_BUTTON_PROP_KEY = ['type', 'size', 'icon', 'nativeType', 'loading', 'disabled', 'plain', 'autofocus', 'round', 'circle']

export default defineComponent({
  name: 'ElButton',
  components: { ElTooltip },
  emits: buttonEmits,
  props: {
    ...buttonProps,
    size,
    type,
    config: {
      type: Object as PropType<ButtonConfig>,
      required: false
    },
    tooltip: String
  },
  render(ctx, cache, prop, setup, data, option) {
    const { render } = ElButton
    const config = ctx.ctxConfig
    let $btn
    if (render) {
      $btn = render(ctx, cache, prop, setup, data, option)
      if (config && config.minWidth) {
        $btn = (
          <div style={ctx.computedStyle} class={'el-button-width'}>
            {$btn}
          </div>
        )
      }
      if (prop.tooltip) {
        $btn = (
          <ElTooltip placement={'top'} content={prop.toolTip} effect={Effect.DARK}>
            {$btn}
          </ElTooltip>
        )
      }
    } else {
      throw new Error('cannot find render of ElButton')
    }
    return $btn
  },
  setup(props, ctx: any) {
    const { setup } = ElButton
    if (!setup) {
      throw new Error('cannot found setup of ElButton')
    }
    const resultCtx: any = ref({}).value
    const config = ref(props.config).value
    if (config) {
      EL_BUTTON_PROP_KEY.forEach((key) => {
        const data = config[key]
        if (data) {
          resultCtx[key] = data
        }
      })
    }
    const btnProp = {
      ...props,
      ...resultCtx
    }
    const result = setup(btnProp, ctx) || {}

    const computedStyle = computed(() => {
      const styleResult: any = {}
      if (config && config.minWidth) {
        if (typeof config.minWidth === 'string') {
          styleResult.minWidth = config.minWidth
        } else {
          styleResult.minWidth = `${config.minWidth}px`
        }
      }
      return styleResult
    })

    return {
      ...result,
      ...resultCtx,
      ctxConfig: config,
      computedStyle
    }
  }
})
