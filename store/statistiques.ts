import { GetterTree, ActionTree, MutationTree } from 'vuex'

import contracts from './vars/contracts'

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
  async getStats({ commit }) {
    const pair = await this.$axios.$get(
      'https://api2.sushipro.io/?chainID=137&action=get_pair&pair=' +
        contracts.tokenPair
    )
    const priceSTI = pair[0].Token_2_price

    const getVolume = await this.$axios.$get(
      'http://51.255.50.182/api/actual/volume'
    )

    const getTransaction = await this.$axios.$get(
      'http://51.255.50.182/api/actual/transactions'
    )

    const getTransacionsTotal = await this.$axios.$get(
      'http://51.255.50.182/api/actual/transactions',
      {
        params: {
          back: 0,
        },
      }
    )

    const getUsers = await this.$axios.$get(
      'http://51.255.50.182/api/actual/users'
    )

    const getUsersTotal = await this.$axios.$get(
      'http://51.255.50.182/api/actual/users',
      {
        params: {
          back: 0,
        },
      }
    )

    if (priceSTI < 0.00001) {
      commit('setPrice', priceSTI.toFixed(10))
    } else {
      commit('setPrice', priceSTI)
    }

    commit('setVolume', getVolume.volume)
    commit('setTransactions', {
      today: getTransaction.transactions,
      total: getTransacionsTotal.transactions,
    })
    commit('setUsers', {
      today: getUsers.users,
      total: getUsersTotal.users,
    })
  },
}
