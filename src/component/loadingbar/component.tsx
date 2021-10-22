import { defineComponent, computed, createApp, ref, Transition } from 'vue'
import './style.scss'

export interface LoadingBarProps {
  /**
   * 加载中颜色
   * */
  color?: string
  /**
   * 成功的颜色
   * */
  successColor?: string
  /**
   * 失败颜色
   * */
  failedColor?: string
  /**
   * 高度
   * */
  height?: number
}

export interface LoadingBarStatus {
  percent?: number
  status?: 'start' | 'success' | 'error'
  show?: boolean
}

export interface LoadingBarInstance {
  update(status: LoadingBarStatus): void

  destroy(): void
}

const loadingBarComponent = defineComponent({
  name: 'LoadingBar',
  components: { Transition },
  props: {
    color: {
      type: String,
      default: 'primary'
    },
    failedColor: {
      type: String,
      default: 'error'
    },
    successColor: {
      type: String,
      default: 'success'
    },
    height: {
      type: Number,
      default: 2
    },
    percent: {
      type: Number,
      default: 0
    },
    status: {
      type: String
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  render(ctx) {
    return (
      <transition name={'fade'}>
        <div class={ctx.classes} style={ctx.outerStyles} v-show={ctx.show}>
          <div class={ctx.innerClasses} style={ctx.styles} />
        </div>
      </transition>
    )
  },
  setup(props) {
    const prefixCls = 'loading-bar'
    const classes = computed(() => prefixCls)
    const innerClasses = computed(() => {
      return [
        `${prefixCls}-inner`,
        {
          [`${prefixCls}-inner-color-primary`]: props.color === 'primary' && props.status === 'start',
          [`${prefixCls}-inner-failed-color-error`]: props.failedColor === 'error' && props.status === 'error',
          [`${prefixCls}-inner-color-success`]: props.successColor === 'success' && props.status === 'success'
        }
      ]
    })
    const outerStyles = computed(() => {
      return { height: `${props.height}px` }
    })
    const styles = computed(() => {
      const style = {
        width: `${props.percent}%`,
        height: `${props.height}px`,
        backgroundColor: ''
      }

      if (props.color !== 'primary' && props.status === 'start') {
        style.backgroundColor = props.color
      }

      if (props.successColor !== 'success' && props.status === 'success') {
        style.backgroundColor = props.successColor
      }

      if (props.failedColor !== 'error' && props.status === 'error') {
        style.backgroundColor = props.failedColor
      }

      return style
    })

    return {
      classes,
      innerClasses,
      outerStyles,
      styles
    }
  }
})

export default function newInstance(properties?: LoadingBarProps): LoadingBarInstance {
  const props = properties || {}
  const refProps: any = ref(props).value
  const instance = createApp({
    components: { loadingBarComponent },
    render() {
      return <loadingBarComponent {...refProps} />
    }
  })

  const $root = document.createElement('div')

  const component = instance.mount($root)
  const loadingBarEl = component.$el
  document.body.appendChild(loadingBarEl)

  return {
    update(options: LoadingBarStatus) {
      if (options.percent || options.percent === 0) {
        refProps.percent = options.percent
      }
      if (refProps !== options.status) {
        refProps.status = options.status
      }
      if (options.show !== undefined) {
        refProps.show = options.show
      }
    },
    destroy() {
      document.body.removeChild(loadingBarEl)
    }
  }
}
