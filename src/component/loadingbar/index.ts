import newInstance, { LoadingBarProps, LoadingBarInstance, LoadingBarStatus } from './component'

export interface LoadingBarOptions extends LoadingBarProps {
  /**
   * 加载条 关闭时的延迟时间
   * */
  duration?: number
}

export interface LoadingBarOperator {
  start(): void

  update(percent: number): void

  finish(): void

  error(): void

  config(options: LoadingBarOptions): void

  destroy(): void
}

class LoadingBarOperatorImpl implements LoadingBarOperator {
  private readonly options: LoadingBarOptions

  private instance?: LoadingBarInstance

  private timer?: number

  constructor() {
    this.options = {
      color: 'primary',
      failedColor: 'error',
      duration: 800,
      height: 2
    }
    this.createInstance()
  }

  private createInstance(): LoadingBarInstance {
    this.instance = newInstance(this.options)
    return this.instance
  }

  private updateInstance(newStatus: LoadingBarStatus) {
    this.instance?.update(newStatus)
  }

  private hide() {
    setTimeout(() => {
      this.updateInstance({
        show: false,
        percent: 0
      })
    }, this.options.duration)
  }

  private clearTimer() {
    window.clearInterval(this.timer)
    this.timer = undefined
  }

  config(options: LoadingBarOptions): void {
    if (options.color) {
      this.options.color = options.color
    }
    if (options.failedColor) {
      this.options.failedColor = options.failedColor
    }
    if (options.successColor) {
      this.options.successColor = options.successColor
    }
    if (options.duration || options.duration === 0) {
      this.options.duration = options.duration
    }
    if (options.height) {
      this.options.height = options.height
    }
  }

  destroy(): void {
    this.instance?.destroy()
    this.instance = undefined
  }

  update(percent: number): void {
    this.updateInstance({
      percent,
      status: 'start',
      show: true
    })
  }

  start(): void {
    if (this.timer) {
      return
    }
    let percent = 0
    this.updateInstance({
      percent,
      status: 'start',
      show: true
    })
    this.timer = window.setInterval(() => {
      percent += Math.floor(Math.random() * 3 + 1)
      if (percent > 95) {
        this.clearTimer()
        percent = 95
      }
      this.update(percent)
    }, 200)
  }

  error(): void {
    this.clearTimer()
    this.updateInstance({
      percent: 100,
      status: 'error',
      show: true
    })
    this.hide()
  }

  finish(): void {
    this.clearTimer()
    this.updateInstance({
      percent: 100,
      status: 'success',
      show: true
    })
    this.hide()
  }
}

const loadingBarOperator: LoadingBarOperator = new LoadingBarOperatorImpl()

const useLoadingBar = () => {
  return loadingBarOperator
}

export default loadingBarOperator

export { useLoadingBar }
