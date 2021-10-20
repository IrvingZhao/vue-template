import { defineComponent, ref, watch } from 'vue'
import { ElSelect, ElOption } from 'element-plus'
import CusButton, { ButtonConfig } from '../button'
import './style.scss'

const buttonConfig: { [key: string]: ButtonConfig } = {
  add: {
    size: 'small',
    circle: true,
    type: 'primary',
    icon: 'el-icon-circle-plus-outline'
  },
  delete: {
    size: 'small',
    circle: true,
    type: 'danger',
    icon: 'el-icon-remove-outline'
  }
}

export default defineComponent({
  name: 'MultipleSelect',
  props: {
    modelValue: { type: Array, default: () => [] },
    options: {
      type: Array,
      default: () => []
    },
    valueKey: {
      type: String,
      default: 'value'
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    filterMethod: { type: Function, default: () => true }
  },
  components: {
    ElSelect,
    ElOption,
    CusButton
  },
  emit: ['update:modelValue'],
  render(ctx, cache, props) {
    const $labelRender = this.$slots.default || ((item) => item[ctx.labelKey])
    const buildOption = () => {
      return ctx.options
        .filter((item) => {
          return props.filterMethod(ctx.filterKey, item)
        })
        .map((item) => {
          return (
            <ElOption key={item[ctx.valueKey]} value={item[ctx.valueKey]} label={item[ctx.labelKey]} disabled={ctx.selectMap[item[ctx.valueKey]]}>
              {$labelRender(item)}
            </ElOption>
          )
        })
    }
    const $selects = ctx.renderData.map((item, i) => {
      return (
        <div key={item.id} class={'select-item'}>
          <ElSelect
            key={`multiple-item-${i}`}
            class={'select-area'}
            v-model={item.value}
            filterable={true}
            filter-method={ctx.selectFilterMethod}
            onVisible-change={ctx.selectVisibleChange}
          >
            {buildOption()}
          </ElSelect>
          <CusButton config={buttonConfig.add} class={'add-button'} onClick={ctx.addHandle(i)} />
          <CusButton config={buttonConfig.delete} class={'delete-button'} onClick={ctx.deleteHandle(i)} />
        </div>
      )
    })
    return <div class={'multiple-select'}>{$selects}</div>
  },
  setup(props, ctx) {
    const renderData = ref<any[]>([{ id: Date.now(), value: '' }])
    const selectMap = ref<any>({})

    watch(
      renderData,
      (newVal) => {
        const value = newVal.map((item) => item.value)
        const diffCheckTemp: any = {}
        selectMap.value = {}
        newVal.forEach((item) => {
          diffCheckTemp[item.value] = true
          selectMap.value[item.value] = true
        })
        ;(props.modelValue as any[]).forEach((item) => {
          diffCheckTemp[item] = !diffCheckTemp[item]
        })
        const diff = Object.entries(diffCheckTemp).some(([, v]) => v)
        if (diff) {
          ctx.emit('update:modelValue', value)
        }
      },
      { deep: true }
    )

    watch(
      () => props.modelValue,
      (newVal) => {
        renderData.value = newVal.map((item, i) => {
          return {
            id: `${Date.now()}${i}`,
            value: item
          }
        })
        if (renderData.value.length === 0) {
          renderData.value.push({ id: Date.now(), value: '' })
        }
      }
    )

    watch(
      () => props.options,
      () => {
        renderData.value = props.modelValue.map((item, i) => {
          return {
            id: `${Date.now()}${i}`,
            value: item
          }
        })
        if (renderData.value.length === 0) {
          renderData.value.push({ id: Date.now(), value: '' })
        }
      },
      { deep: true }
    )

    const filterKey = ref<string>('')

    const deleteHandle = (i) => {
      return () => {
        renderData.value.splice(i, 1)
      }
    }
    const addHandle = (i) => {
      return () => {
        renderData.value.splice(i + 1, 0, {
          id: Date.now(),
          value: ''
        })
      }
    }
    const selectVisibleChange = (val) => {
      if (val) {
        filterKey.value = ''
      }
    }
    const selectFilterMethod = (val) => {
      filterKey.value = val
    }

    return {
      filterKey,
      renderData,
      selectMap,
      deleteHandle,
      addHandle,
      selectVisibleChange,
      selectFilterMethod
    }
  }
})
