import { buildProp } from 'element-plus/es/utils/props'

export function generateTypeProp(types: string[], defaultValue: string = '') {
  const mockTypes = [...types, 'orange', 'cyan']
  return buildProp(
    {
      type: String,
      values: mockTypes,
      default: defaultValue
    },
    'type'
  )
}

export function generateSizeProp(oldSize: string[]) {
  const mockSize = [...oldSize, 'tiny']
  return buildProp(
    {
      type: String,
      values: mockSize,
      default: ''
    },
    'size'
  )
}
