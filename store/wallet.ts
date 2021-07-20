import { GetterTree, ActionTree, MutationTree } from 'vuex'
import MetaMask from './wallet/metamask'

export const state = () => ({
  isConnected: false,
  walletUsed: '',
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {}

export const mutations: MutationTree<RootState> = {
  setWallet(state, wallet) {
    state.walletUsed = wallet
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async useWallet({ commit }, wallet) {
    switch (wallet) {
      case 'metamask': {
        const metamask = await MetaMask.getProvider()
        if (metamask.ok) {
          commit('setWallet', wallet)
          return metamask.provider
        } else {
          return metamask.error
        }
      }
    }
  },
}
