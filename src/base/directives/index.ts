import { App } from 'vue'
import ActiveHeight from './activeHeight'
import Resize from './resize'

export default {
  install(app: App) {
    app.directive('active-height', ActiveHeight)
    app.directive('resize', Resize)
  }
}

export * from './activeHeight'
