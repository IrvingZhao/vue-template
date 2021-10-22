import { ButtonConfig } from '../button'

interface ButtonConfigData {
  [key: string]: ButtonConfig
}

const pageButtonConfig: ButtonConfigData = {
  submit: {
    type: 'primary',
    minWidth: '100px'
  },
  submitAndContinue: {
    type: 'orange',
    minWidth: '132px'
  },
  normalContinue: {
    type: 'orange',
    minWidth: '100px'
  },
  default: { minWidth: '100px' }
}
const tableButtonConfig: ButtonConfigData = {
  delete: {
    type: 'danger',
    size: 'tiny',
    plain: true
  },
  default: { size: 'tiny' }
}
const toolbarButtonConfig: ButtonConfigData = {
  default: {
    type: 'primary',
    size: 'medium',
    round: true
  }
}
const dialogButtonConfig: ButtonConfigData = {
  confirm: {
    type: 'primary',
    size: 'small',
    minWidth: '80px',
    round: true
  },
  default: {
    size: 'small',
    minWidth: '80px',
    round: true
  }
}
const messageBoxButtonConfig: ButtonConfigData = {
  confirm: {
    type: 'danger',
    size: 'mini',
    minWidth: '77px'
  },
  default: {
    size: 'mini',
    minWidth: '77px'
  }
}

export { pageButtonConfig, tableButtonConfig, toolbarButtonConfig, dialogButtonConfig, messageBoxButtonConfig }
