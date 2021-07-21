import { GetterTree, ActionTree, MutationTree } from 'vuex'
import MetaMask from './wallet/metamask'

interface State {
  isConnected: boolean
  walletUsed: string | null
  address: string
  balance: null | number
  earned: null | number
}

export const state = (): State => ({
  isConnected: false,
  walletUsed: window.localStorage.getItem('walletUsed')
    ? window.localStorage.getItem('walletUsed')
    : '',
  address: '',
  balance: null,
  earned: null,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {}

export const mutations: MutationTree<RootState> = {
  setWallet(state, wallet) {
    state.walletUsed = wallet
    window.localStorage.setItem('walletUsed', wallet)
  },
  setBalance(state, balance: number) {
    state.balance = balance
    window.localStorage.setItem('balance', `${balance}`)
  },
  incrementBalance(state, n) {
    if (state.balance) {
      state.balance = state.balance + n
      window.localStorage.setItem('balance', `${state.balance}`)
    }
  },
  decrementBalance(state, n) {
    if (state.balance) {
      state.balance = state.balance - n
      window.localStorage.setItem('balance', `${state.balance}`)
    }
  },
  setEarned(state, earned) {
    state.earned = earned
  },
  login(state, address) {
    state.isConnected = true
    state.address = address
  },
  logout(state) {
    state.isConnected = false
    state.address = ''
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async useWallet({ commit, dispatch }, wallet) {
    switch (wallet) {
      case 'metamask': {
        const metamask = await MetaMask.getProvider(true)
        if (metamask.ok && metamask.provider) {
          commit('setWallet', wallet)
          const address = await MetaMask.getWalletAddress(metamask.provider)
          commit('login', address)
          dispatch('getInfos')
        }
        return metamask
      }
    }
  },
  async connectWallet({ commit, state, dispatch }) {
    const wallet = state.walletUsed
    switch (wallet) {
      case 'metamask': {
        const metamask = await MetaMask.getProvider()
        if (metamask.ok && metamask.provider) {
          const isConnected = await MetaMask.isAlreayConnected(
            metamask.provider
          )
          if (isConnected) {
            const address = await MetaMask.getWalletAddress(metamask.provider)
            commit('login', address)
            dispatch('getInfos')
          }
        }
      }
    }
  },
  getInfos({ commit }) {
    setTimeout(() => {
      commit('setBalance', 694200000 * Math.random())
    }, Math.floor(Math.random() * 5000))

    setTimeout(() => {
      commit('setEarned', 100000 * Math.random() - 100000 * Math.random())
    }, Math.floor(Math.random() * 5000))
  },
}
