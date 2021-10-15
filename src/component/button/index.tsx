import { defineComponent, ref, computed } from 'vue'
import { ElButton, buttonProps } from 'element-plus'

export interface ButtonConfig {
  type?: ComponentColor
  size?: ComponentSize
  icon?: string
  plain?: boolean
  round?: boolean
  circle?: boolean
}

const EL_BUTTON_PROP_KEY = ['type', 'size', 'icon', 'nativeType', 'loading', 'disabled', 'plain', 'autofocus', 'round', 'circle']

export default defineComponent({
  name: 'ElButton',
  extends: ElButton,
  props: {
    ...buttonProps,
    config: Object,
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
          <pj-tool-tip placement={'top'} content={prop.toolTip} effect={'dark'}>
            {$btn}
          </pj-tool-tip>
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
        styleResult.minWidth = config.minWidth
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
