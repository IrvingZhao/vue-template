import { badgeProps } from 'element-plus'
import { generateTypeProp } from '../theme'
import './theme.scss'

const mockBadgeProps = badgeProps as any
mockBadgeProps.type = generateTypeProp(['primary', 'success', 'warning', 'info', 'danger'], 'danger')

// TODO badgeProps 原有内容 ts 检查问题
