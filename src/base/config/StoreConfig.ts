import { createStore, Store, ModuleTree } from 'vuex'
import { computed, ComputedRef } from 'vue'

let store: Store<StoreRootState>

interface StoreMethodParam {
  namespace: string
  method: string
}

declare type ActionMethod = (preload: any) => Promise<any>
declare type MutationMethod = (preload: any) => void

function dispatch(this: StoreMethodParam, preload): Promise<any> {
  return store.dispatch(`${this.namespace}/${this.method}`, preload)
}

function mutation(this: StoreMethodParam, preload: any): void {
  store.commit(`${this.namespace}/${this.method}`, preload)
}

export default function create(modules?: ModuleTree<StoreRootState>): Store<StoreRootState> {
  store = createStore<StoreRootState>({
    strict: import.meta.env.ENV_PROFILE === 'development',
    devtools: import.meta.env.ENV_PROFILE === 'development',
    modules
  })

  return store
}

export function mapState<Key extends string>(namespace: string, map: Key[]): { [key in Key]: ComputedRef } {
  const result: { [key in Key]: ComputedRef } = {} as { [key in Key]: ComputedRef }
  return map.reduce((item, cur) => {
    item[cur] = computed(() => store.state[namespace][cur])
    return item
  }, result)
}

export function mapMutation<Key extends string>(namespace: string, map: Key[]): { [key in Key]: MutationMethod } {
  const result = {} as { [key in Key]: MutationMethod }
  return map.reduce((item, method) => {
    item[method] = mutation.bind({ namespace, method })
    return item
  }, result)
}

export function mapAction<Key extends string>(namespace: string, map: Key[]): { [key in Key]: ActionMethod } {
  const result: { [key in Key]: ActionMethod } = {} as { [key in Key]: ActionMethod }
  return map.reduce((item, method) => {
    item[method] = dispatch.bind({ namespace, method })
    return item
  }, result)
}
