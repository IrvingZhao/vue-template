import { Transition, KeepAlive, onUnmounted, RenderFunction } from 'vue'
import { Module, useStore } from 'vuex'

export interface StorePageItem<S, R> {
  key: string
  storeModule: Module<S, R>
  init?: string
  reset?: string
}

export interface StorePageOption<S, R extends StoreRootState> {
  pageStore: StorePageItem<S, R>[] | StorePageItem<S, R>
}

let CREATED_KEY: { [key: string]: boolean } = {}

export default function useStorePage<S, R extends StoreRootState>(option: StorePageOption<S, R>): RenderFunction {
  const store = useStore()
  let storeConfig
  const { pageStore } = option
  if (pageStore) {
    if (pageStore instanceof Array) {
      storeConfig = pageStore
    } else {
      storeConfig = [pageStore]
    }
    storeConfig.forEach((item) => {
      CREATED_KEY[item.key] = true
      if (!store.state[item.key]) {
        store.registerModule(item.key, item.storeModule)
      }
      if (item.init) {
        store.dispatch(item.init).catch(() => undefined)
      }
    })
  }
  onUnmounted(() => {
    storeConfig.forEach((item) => {
      if (CREATED_KEY[item.key]) {
        return
      }
      if (item.reset) {
        store.dispatch(item.reset).catch(() => undefined)
      }
      store.unregisterModule(item.key)
      CREATED_KEY = {}
    })
  })

  return () => {
    const routerSlot = ({ Component }) => {
      return (
        <Transition>
          <KeepAlive>{Component}</KeepAlive>
        </Transition>
      )
    }
    return <router-view v-slots={{ default: routerSlot }} />
  }
}
