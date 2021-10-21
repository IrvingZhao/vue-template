import { createApp } from 'vue'
import app from './app'
import { createConfig, ConfigOptions, mapState } from './config'
import directive from './directives'

export default {
  createApp(options: ConfigOptions) {
    const config = createConfig(options)
    const ins = createApp(app)
    ins.use(config).use(directive)
    return ins
  }
}

export { mapState }
export * from './hook'
