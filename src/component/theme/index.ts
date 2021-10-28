import { buildProp, BuildPropReturn } from 'element-plus/es/utils/props'
import './components.scss'

export function generateTypeProp(defaultValue: string = ''): BuildPropReturn<ComponentColor, ComponentColor, false, any, any> {
  const mockTypes = [undefined, '', 'default', 'primary', 'success', 'warning', 'info', 'danger', 'text', 'cyan', 'orange']
  return buildProp(
    {
      type: String,
      values: mockTypes,
      default: defaultValue
    },
    'type'
  ) as BuildPropReturn<ComponentColor, ComponentColor, false, ComponentColor, ComponentColor>
}

export function generateSizeProp(): BuildPropReturn<ComponentSize, ComponentSize, false, any, any> {
  const mockSize = ['', 'large', 'medium', 'small', 'mini', 'tiny']
  return buildProp(
    {
      type: String,
      values: mockSize,
      default: ''
    },
    'size'
  ) as BuildPropReturn<ComponentSize, ComponentSize, false, any, any>
}
