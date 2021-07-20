import { GetterTree, ActionTree, MutationTree } from 'vuex'
import MetaMask from './wallet/metamask'

export const state = () => ({
  isConnected: false,
  walletUsed: window.localStorage.getItem('walletUsed')
    ? window.localStorage.getItem('walletUsed')
    : '',
  address: '',
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {}

export const mutations: MutationTree<RootState> = {
  setWallet(state, wallet) {
    state.walletUsed = wallet
    window.localStorage.setItem('walletUsed', wallet)
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
  async useWallet({ commit }, wallet) {
    switch (wallet) {
      case 'metamask': {
        const metamask = await MetaMask.getProvider(true)
        if (metamask.ok && metamask.provider) {
          commit('setWallet', wallet)
          const address = await MetaMask.getWalletAddress(metamask.provider)
          commit('login', address)
        }
        return metamask
      }
    }
  },
  async connectWallet({ commit, state }) {
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
          }
        }
      }
    }
  },
}
