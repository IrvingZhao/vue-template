import { nextTick, App } from 'vue'
import { createRouter, Router, RouteRecordRaw, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'

const methodMap = {
  hash: createWebHashHistory,
  history: createWebHistory,
  memory: createMemoryHistory
}

/**
 * 路由配置信息
 * */
export interface RouteOption {
  /**
   * 路由配置
   * */
  routes: RouteRecordRaw[]
  /**
   * 根路径
   * */
  base: string
  /**
   * 是否自动滚动，默认false
   * */
  autoScroll?: boolean
  /**
   * 路由类型，默认hash
   * */
  mode?: 'history' | 'hash' | 'memory'
}

function scrollBehaviorFunc(to, from, scroll) {
  if (scroll) {
    nextTick().then(() => {
      window.scroll(scroll)
    })
  }
}

function initRouter(option?: RouteOption): Router {
  const realOption = option || {
    routes: [],
    base: '/',
    autoScroll: false,
    mode: 'hash'
  }
  const scrollBehavior = realOption.autoScroll ? scrollBehaviorFunc : undefined
  const history = methodMap[realOption.mode || 'hash'](realOption.base)
  return createRouter({
    routes: realOption.routes,
    history,
    scrollBehavior
  })
}

export default {
  install(app: App, option: RouteOption) {
    const router = initRouter(option)
    app.use(router)
  }
}
