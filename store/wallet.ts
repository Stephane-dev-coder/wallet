import { BigNumber, ethers } from 'ethers'
import { GetterTree, ActionTree, MutationTree } from 'vuex'
import MetaMask from './wallet/metamask'
import ContractAddress from './vars/contracts'

const tokenAbi = [
  'function balanceOf(address account) public view returns (uint256)',
  'function transfer(address recipient, uint256 amount) public returns (bool)',
  'function transferMessage(address recipient, uint256 amount, string memory message) public returns (bool)',
  'function getFeesFor(address account, uint256 amount) view external returns (uint)',
  'event Transfer(address indexed from, address indexed to, uint amount)',
]

interface State {
  isConnected: boolean
  walletUsed: string | null
  address: string
  balance: null | BigNumber
  earned: null | BigNumber
  price: {
    value: number
    change: number
  }
  transactions: Array<{ from: string; to: string; amount: BigNumber }>
  callbacks: {
    transaction: Array<
      (
        from: string,
        to: string,
        amount: BigNumber,
        event: any
      ) => boolean | Promise<boolean>
    >
  }
  gasPrice: BigNumber
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
  transactions: [],
  callbacks: {
    transaction: [],
  },
  gasPrice: ethers.BigNumber.from(2).mul(
    ethers.BigNumber.from(10).pow(ethers.BigNumber.from(9))
  ),
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {}

export const mutations: MutationTree<RootState> = {
  setWallet(state, wallet) {
    state.walletUsed = wallet
    window.localStorage.setItem('walletUsed', wallet)
  },
  setBalance(state, balance: BigNumber) {
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
      state.balance = state.balance.sub(n)
      window.localStorage.setItem('balance', `${state.balance}`)
    }
  },
  setEarned(state, earned) {
    state.earned = earned
  },
  setPrice(state, price) {
    state.price = price
  },
  login(state, address) {
    state.isConnected = true
    state.address = address
  },
  logout(state) {
    state.isConnected = false
    state.address = ''
  },
  addTransaction(state, transaction) {
    state.transactions.push(transaction)
  },
  addCallback(state, callback) {
    switch (callback.type) {
      case 'transaction':
        state.callbacks.transaction.push(callback.fun)
        break
    }
  },
  setCallback(state, callbacks) {
    switch (callbacks.type) {
      case 'transaction':
        state.callbacks.transaction = callbacks.funs
        break
    }
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
  disconnectWallet({ commit }) {
    commit('logout')
    commit('setWallet', '')
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
  async getTokenBalance({ state }): Promise<BigNumber> {
    const provider = await MetaMask.getProvider()

    if (provider.ok && provider.provider) {
      const tokenInstance = new ethers.Contract(
        ContractAddress.token,
        tokenAbi,
        provider.provider
      )

      try {
        return await tokenInstance.balanceOf(state.address)
      } catch (error) {
        return ethers.BigNumber.from(0).sub(ethers.BigNumber.from(1))
      }
    } else {
      return ethers.BigNumber.from(0)
    }
  },
  async getTokenFees(
    { state, dispatch },
    amount: BigNumber
  ): Promise<BigNumber> {
    const provider = await dispatch('getProvider')
    if (provider.ok && provider.provider) {
      const tokenInstance = new ethers.Contract(
        ContractAddress.token,
        tokenAbi,
        provider.provider
      )

      return await tokenInstance.getFeesFor(state.address, amount)
    } else {
      return ethers.BigNumber.from(0)
    }
  },
  async getWalletInfos({ commit, dispatch, state }) {
    const provider = await dispatch('getProvider')
    if (provider.ok === true && provider.provider) {
      const theProvider = provider.provider

      const tokenInstance = new ethers.Contract(
        ContractAddress.token,
        tokenAbi,
        theProvider
      )

      tokenInstance.on('Transfer', (from, to, amount, event) => {
        setTimeout(async () => {
          commit('setBalance', await dispatch('getTokenBalance'))
          const balanceHistory = await this.$axios.$get(
            `https://51.255.50.182/api/user/${state.address}/history/balance`
          )
          const initBalance = ethers.BigNumber.from(balanceHistory[0].balance)
          const finalBalance = ethers.BigNumber.from(
            balanceHistory[balanceHistory.length - 1].balance
          )
          const result = finalBalance.sub(initBalance)

          commit('setEarned', result)
        }, 1000)

        commit('addTransaction', { from, to, amount })
        const callbacks = state.callbacks.transaction.filter(
          async (fun) => await !fun(from, to, amount, event)
        )
        commit('setCallback', { type: 'transaction', funs: callbacks })
      })
      commit('setBalance', await dispatch('getTokenBalance'))
    }

    const balanceHistory = await this.$axios.$get(
      `https://51.255.50.182/api/user/${state.address}/history/balance`
    )
    const initBalance = ethers.BigNumber.from(balanceHistory[0].balance)
    const finalBalance = ethers.BigNumber.from(
      balanceHistory[balanceHistory.length - 1].balance
    )
    const result = finalBalance.sub(initBalance)

    commit('setEarned', result)
  },
  async getGlobalInfos({ commit }) {
    const pair = await this.$axios.$get(
      'https://api2.sushipro.io/?chainID=137&action=get_pair&pair=' +
        ContractAddress.tokenPair
    )
    const priceSTI = pair[0].Token_2_price

    commit('setPrice', {
      value: priceSTI,
      change: 0,
    })
  },
  async getProvider() {
    // Depend du wallet choisi !
    return await MetaMask.getProvider()
  },

  async sendTokens(
    { state, commit, dispatch },
    {
      to,
      amount,
      message,
      callback = () => () => {
        return true
      },
    }: {
      to: string
      amount: BigNumber
      message: string
      callback: (tx: string) => () => boolean | Promise<boolean>
    }
  ) {
    const provider = await dispatch('getProvider')
    if (provider.ok === true && provider.provider) {
      const theProvider = provider.provider
      const tokenInstance = new ethers.Contract(
        ContractAddress.token,
        tokenAbi,
        theProvider
      ).connect(theProvider.getSigner())

      try {
        let result
        if (message === '') {
          result = await tokenInstance.transfer(to, amount, {
            from: state.address,
          })
        } else {
          result = await tokenInstance.transferMessage(to, amount, message, {
            from: state.address,
          })
        }
        commit('addCallback', {
          type: 'transactions',
          fun: callback(result.hash),
        })
        return {
          ok: true,
        }
      } catch (err) {
        if (err?.code === -32603 && err?.message?.includes('nonce')) {
          return {
            ok: false,
            error: {
              code: -32603,
              message: 'Nonce incorrect',
            },
          }
        }
        if (
          err?.code === -32603 &&
          err?.message === "Non-200 status code: '429'"
        ) {
          return {
            ok: false,
            error: {
              code: -32605,
              message: 'Va te faire foutre',
            },
          }
        }

        if (err?.code === 4001) {
          return {
            ok: false,
            error: {
              code: 4001,
              message: "L'utilisateur a rejeter la requette",
            },
          }
        }

        if (
          err?.code === -32603 &&
          err?.data?.message ===
            'VM Exception while processing transaction: revert'
        ) {
          return {
            ok: false,
            error: {
              code: -32604,
              message: 'VM rejection',
            },
          }
        }
        return {
          ok: false,
          error: {
            code: 0,
            message: 'Oops quelque chose est arriver !',
          },
        }
      }
    }
    return {
      ok: false,
      error: {
        code: 0,
        message: 'No provider',
      },
    }
  },
}
