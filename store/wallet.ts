import { GetterTree, ActionTree, MutationTree } from 'vuex'
import MetaMask from './wallet/metamask'

export const state = () => ({
  isConnected: false,
  walletUsed: '',
  address: '',
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {}

export const mutations: MutationTree<RootState> = {
  setWallet(state, wallet) {
    state.walletUsed = wallet
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
        if (metamask.ok) {
          commit('setWallet', wallet)
          if (metamask.provider) {
            const address = await MetaMask.getWalletAddress(metamask.provider)
            commit('login', address)
          }
          return metamask.provider
        } else {
          return metamask.error
        }
      }
    }
  },
}
