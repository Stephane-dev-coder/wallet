import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  isDark: true,
  darkPreference: window.localStorage.getItem('darkPreference')
    ? window.localStorage.getItem('darkPreference')
    : 'system',
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {}

export const mutations: MutationTree<RootState> = {
  setDark(state) {
    state.isDark = true
  },
  setLight(state) {
    state.isDark = false
  },
  setDarkPreference(state, value) {
    state.darkPreference = value
    window.localStorage.setItem('darkPreference', value)
  },
}

export const actions: ActionTree<RootState, RootState> = {
  toggleDark({ commit, state }) {
    if (state.isDark) {
      commit('setLight')
      commit('setDarkPreference', 'light')
    } else {
      commit('setDark')
      commit('setDarkPreference', 'dark')
    }
  },
}
