import { createApp } from 'vue'
import app from './app'
import { createConfig, ConfigOptions } from './config'

export default {
  createApp(options: ConfigOptions) {
    const config = createConfig(options)
    const ins = createApp(app)
    ins.use(config)
    return ins
  }
}
