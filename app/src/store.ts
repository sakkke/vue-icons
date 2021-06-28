import { createStore, useStore as baseUseStore, Store } from "vuex"
import { InjectionKey } from "vue"

export interface State {
  search: string

  customize: {
    size: number
    color: string
  }
}

export const key: InjectionKey<Store<State>> = Symbol()

export const useStore = (): Store<State> => {
  return baseUseStore(key)
}

export const store = createStore<State>({
  state: () => ({
    search: "",
    customize: {
      size: 24,
      strokeWidth: 2,
      color: "currentColor"
    }
  }),
  mutations: {
    setSearch: (state, value: string) => {
      state.search = value
    },
    setCustomizeSize: (state, value: number) => {
      state.customize.size = value
    },
    setCustomizeColor: (state, value: string) => {
      state.customize.color = value
    }
  }
})
