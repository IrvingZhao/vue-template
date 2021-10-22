import { defineComponent, PropType, inject, computed, ref, watch } from 'vue'
import { elFormKey, elFormItemKey, ElFormContext, ElFormItemContext, ElInput, ElCheckbox } from 'element-plus'
// import { CheckInputValue } from './define'
import './style.scss'

export interface CheckInputValue {
  text: string
  check: string
}

export default defineComponent({
  name: 'CheckInput',
  inheritAttrs: false,
  components: { ElInput, ElCheckbox },
  props: {
    modelValue: {
      type: Object as PropType<CheckInputValue>,
      required: true
    },
    checkLabel: {
      type: String,
      default: ''
    },
    trueLabel: {
      type: String,
      default: 'true'
    },
    falseLabel: {
      type: String,
      default: 'false'
    },
    checkDisableInput: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  render(ctx, cache, props) {
    return (
      <div class={'check-input'}>
        <div class={'input-area'}>
          <ElInput v-model={ctx.value.text} disabled={ctx.formItemDisable || ctx.inputDisable} />
        </div>
        <div class={'checkbox-area'}>
          <ElCheckbox v-model={ctx.value.check} true-label={props.trueLabel} false-label={props.falseLabel}>
            {props.checkLabel}
          </ElCheckbox>
        </div>
      </div>
    )
  },
  setup(props) {
    const elForm = inject(elFormKey, {} as ElFormContext)
    const elFormItem = inject(elFormItemKey, {} as ElFormItemContext)

    const formItemDisable = computed(() => {
      return props.disabled || elForm.disabled
    })

    const { value } = ref(props.modelValue)

    const inputDisable = computed(() => {
      return props.checkDisableInput && props.modelValue.check !== props.trueLabel
    })

    watch(value, () => {
      elFormItem?.validate?.('change')
    })

    return {
      formItemDisable,
      inputDisable,
      value
    }
  }
})
