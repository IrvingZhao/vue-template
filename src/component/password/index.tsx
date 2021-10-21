import { defineComponent, ref, watch } from 'vue'
import { ElInput, ElProgress, inputEmits, inputProps } from 'element-plus'

const PASS_REG = [/[a-z]+/, /[0-9]+/, /[A-Z]+/, /[~!@#$%^&*()_+]+/]
const STATUS = ['exception', 'exception', 'warning', 'success']

export default defineComponent({
  name: 'password',
  props: {
    ...inputProps
  },
  emits: inputEmits,
  components: { ElInput, ElProgress },
  setup(props, ctx) {
    const progressProp = ref({
      status: '',
      percentage: 0,
      showText: false
    })

    watch(
      () => props.modelValue,
      (newVal) => {
        if (newVal) {
          const matchSize = PASS_REG.filter((item) => item.test(`${newVal}`)).length
          progressProp.value.percentage = Math.floor((100 / PASS_REG.length) * matchSize)
          progressProp.value.status = STATUS[matchSize] || 'success'
        } else {
          progressProp.value.percentage = 0
          progressProp.value.status = ''
        }
      }
    )

    const mockEvent = (type) => {
      return (val) => {
        ctx.emit(type, val)
      }
    }

    return { progressProp, mockEvent }
  },
  render(ctx, cache, props) {
    const { $slots } = this
    const events: any = {}
    Object.keys(inputEmits).forEach((type) => {
      const key = `on${type[0].toUpperCase()}${type.substring(1)}`
      events[key] = ctx.mockEvent(type)
    })

    const $input = <pj-input {...props} {...events} type={'password'} v-slots={$slots} />
    const $progress = <pj-progress {...ctx.progressProp} style={{ marginTop: '10px' }} />
    return (
      <div>
        {$input}
        {$progress}
      </div>
    )
  }
})
