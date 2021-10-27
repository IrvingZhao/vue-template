import { buildProp } from 'element-plus/es/utils/props'

export function addType(types: string[]) {
  types.push('orange', 'cyan')
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
