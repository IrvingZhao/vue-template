import { App } from 'vue'
import createI18n from './I18nConfig'
import createRouter, { RouteOption } from './RouterConfig'

export interface ConfigOptions {
  router?: RouteOption
}

class Config {
  private readonly options: ConfigOptions

  public constructor(options: ConfigOptions) {
    this.options = options
  }

  public install(app: App) {
    const i18n = createI18n()
    const route = createRouter(this.options.router)
    app.use(i18n).use(route)
  }
}

export function createConfig(options: ConfigOptions): Config {
  return new Config(options)
}
