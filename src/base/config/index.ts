import { App } from 'vue'
import I18nConfig from './I18nConfig'
import RouterConfig, { RouteOption } from './RouterConfig'

export interface ConfigOptions {
  router?: RouteOption
}

class Config {
  private readonly options: ConfigOptions

  public constructor(options: ConfigOptions) {
    this.options = options
  }

  public install(app: App) {
    app.use(I18nConfig)
    app.use(RouterConfig, this.options.router)
  }
}

export function createConfig(options: ConfigOptions): Config {
  return new Config(options)
}
