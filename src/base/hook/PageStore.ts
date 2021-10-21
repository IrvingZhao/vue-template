import { MutationTree } from 'vuex'

export interface PageInfo {
  pageIndex: number
  pageSize: number
  total: number
}

export interface PageState {
  pageInfo: PageInfo
  query: { [key: string]: any }
}

export interface PageMutation<S extends PageState> extends MutationTree<S> {
  pageIndex(state: S, pageIndex: number): void

  pageSize(state: S, pageSize: number): void

  query(state: S, query: { [key: string]: any }): void
}

const pageIndexMutation = (state: PageState, pageIndex: number): void => {
  state.pageInfo.pageIndex = pageIndex
}
const pageSizeMutation = (state: PageState, pageSize: number): void => {
  state.pageInfo.pageSize = pageSize
}
const queryMutation = (state: PageState, query: { [k: string]: any }): void => {
  state.query = query
}

export default function usePageStore(): { state: PageState; mutations: PageMutation<PageState> } {
  return {
    state: {
      pageInfo: { pageIndex: 1, pageSize: 10, total: 0 },
      query: {}
    },
    mutations: {
      pageIndex: pageIndexMutation,
      pageSize: pageSizeMutation,
      query: queryMutation
    }
  }
}
