import { createStore, Store, ModuleTree } from 'vuex'
import { computed, ComputedRef } from 'vue'

let store: Store<StoreRootState>

export default function create(modules?: ModuleTree<StoreRootState>): Store<StoreRootState> {
  store = createStore<StoreRootState>({
    strict: import.meta.env.VITE_PROFILE === 'development',
    devtools: import.meta.env.VITE_PROFILE === 'development',
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
