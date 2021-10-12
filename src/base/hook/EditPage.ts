import { watch, onActivated, onDeactivated } from 'vue'

export interface EditPageProps {
  id?: string
}

export interface EditPageOption {
  addLoad?: () => void
  editLoad?: () => void
  reset?: () => void
}

const updateData = (props: EditPageProps, options: EditPageOption) => {
  const load = props.id ? options.editLoad : options.addLoad
  if (load) {
    load()
  }
}

export default function useEditPage(props: EditPageProps, options: EditPageOption) {
  let hasWatch = false
  let hasDeactivated = false

  watch(
    () => props.id,
    () => {
      if (hasDeactivated) {
        return
      }
      hasWatch = true
      updateData(props, options)
    }
  )
  onActivated(() => {
    hasDeactivated = false
    if (!hasWatch) {
      updateData(props, options)
    }
  })
  onDeactivated(() => {
    hasDeactivated = true
    if (options.reset) {
      options.reset()
    }
    hasWatch = false
  })
}
