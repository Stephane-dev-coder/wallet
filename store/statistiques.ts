import { GetterTree, ActionTree, MutationTree } from 'vuex'

// import hosts from './vars/api'

export const state = () => ({
  price: '0',
  volume: '0',
  transactions: {
    total: 10,
    today: 823479,
  },
  users: {
    total: 10,
    today: 823479,
  },
  fees: {
    total: 10,
    today: 823479,
  },
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {}

export const mutations: MutationTree<RootState> = {
  setPrice(state, price) {
    state.price = price
  },
  setVolume(state, volume) {
    state.volume = volume
  },
  setTransactions(state, transactions) {
    state.transactions = transactions
  },
  setUsers(state, users) {
    state.users = users
  },
  setFees(state, fees) {
    state.fees = fees
  },
}

export const actions: ActionTree<RootState, RootState> = {
  getStats({ commit }) {
    // const stats = await this.$axios.$get(`${hosts.node}/global/stats`)

    commit('setPrice', 1)
    commit('setVolume', 1)
    commit('setTransactions', 1)
    commit('setUsers', 1)
    commit('setFees', 1)
  },
}
