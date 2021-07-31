import { BigNumber } from '@ethersproject/bignumber'
import { GetterTree, ActionTree, MutationTree } from 'vuex'
import MetaMask from './wallet/metamask'

interface State {
  isConnected: boolean
  walletUsed: string | null
  address: string
  balance: null | number
  earned: null | number
  price: {
    value: number
    change: number
  }
  volume: {
    value: number
    change: number
  }
}

export const state = (): State => ({
  isConnected: false,
  walletUsed: window.localStorage.getItem('walletUsed')
    ? window.localStorage.getItem('walletUsed')
    : '',
  address: '',
  balance: null,
  earned: null,
  price: {
    value: 0,
    change: 0,
  },
  volume: {
    value: 0,
    change: 0,
  },
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
  setPrice(state, price) {
    state.price = price
  },
  setVolume(state, volume) {
    state.volume = volume
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
          dispatch('getWalletInfos')
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
            dispatch('getWalletInfos')
          }
        }
        return metamask
      }
    }
  },
  async getWalletInfos({ commit, state }) {
    const provider = await MetaMask.getProvider()
    if (provider.ok === true && provider.provider) {
      commit(
        'setBalance',
        await MetaMask.getTokenBalance(provider.provider, state.address)
      )
    }

    setTimeout(() => {
      commit('setEarned', 200000 * Math.random() - 100000 * Math.random())
    }, Math.floor(Math.random() * 5000))
  },
  getGlobalInfos({ commit }) {
    setTimeout(() => {
      const positive = Math.random() > 0.5 ? 1 : -1
      commit('setPrice', {
        value: 0.01 * Math.random(),
        change: positive * 100 * Math.random(),
      })
    }, Math.floor(Math.random() * 1000))
    setTimeout(() => {
      const positive = Math.random() > 0.5 ? 1 : -1
      commit('setVolume', {
        value: 1_000_000 * Math.random(),
        change: positive * 100 * Math.random(),
      })
    }, Math.floor(Math.random() * 1000))
  },
  async sendTokens(
    { state },
    { to, amount }: { to: string; amount: number | BigNumber }
  ) {
    const provider = await MetaMask.getProvider()
    if (provider.ok === true && provider.provider) {
      await MetaMask.sendTokens(provider.provider, state.address, to, amount)
    }
  },
}
