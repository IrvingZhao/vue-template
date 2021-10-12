import { App } from 'vue'
import ActiveHeight, { ActiveHeightParam } from './activeHeight'
import Resize from './resize'

export default {
  install(app: App) {
    app.directive('active-height', ActiveHeight)
    app.directive('resize', Resize)
  }
}

export { ActiveHeightParam }
