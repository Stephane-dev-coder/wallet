import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  isDark: true,
  darkPreference: 'system',
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {}

export const mutations: MutationTree<RootState> = {
  setDark(state) {
    state.isDark = true
    state.darkPreference = 'dark'
  },
  setLight(state) {
    state.isDark = false
    state.darkPreference = 'light'
  },
}

export const actions: ActionTree<RootState, RootState> = {
  toggleDark({ commit, state }) {
    if (state.isDark) {
      commit('setLight')
    } else {
      commit('setDark')
    }
  },
}
