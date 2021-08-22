import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  to: '',
  amount: 0,
  message: '',
  isMax: false,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {}

export const mutations: MutationTree<RootState> = {
  setTo(state, to) {
    state.to = to
  },
  setAmount(state, amount) {
    state.amount = amount
  },
  setMessage(state, message) {
    state.message = message
  },
  setIsMax(state, isMax) {
    state.isMax = isMax
  },
}

export const actions: ActionTree<RootState, RootState> = {}
