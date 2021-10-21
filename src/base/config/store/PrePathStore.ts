import { Store, Module } from 'vuex'
import { Router } from 'vue-router'

export interface PrePathState {
  prePath?: string
}

const prePathModule: Module<PrePathState, StoreRootState> = {
  namespaced: true,
  state: { prePath: '' },
  mutations: {
    prePath(state, prePath: string) {
      if (state.prePath === undefined) {
        state.prePath = ''
      } else {
        state.prePath = prePath
      }
    }
  }
}

export default function registerPrePathStore(store: Store<StoreRootState>, router: Router) {
  store.registerModule('prePath', prePathModule)
  router.afterEach((to, from) => {
    if (from.meta.savePrePath === undefined || from.meta.savePrePath) {
      store.commit('prePath/prePath', from.fullPath)
    }
  })
}
