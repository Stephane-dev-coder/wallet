import { ethers, BigNumber } from 'ethers'
import { GetterTree, ActionTree, MutationTree } from 'vuex'
import MetaMask from './wallet/metamask'

import contracts from './vars/contracts'

const factoryAbi = [
  'function createProxy() external returns (address proxy)',
  'function getProxyOf(address user) external view returns (address proxy)',
]

const proxyAbi = ['function createLP() external payable']
const pairAbi = ['function balanceOf(address) view returns (uint)']

const fees = (value: BigNumber, fixedTo = 6) => {
  const puissance = 18 - fixedTo < 0 ? 18 : 18 - fixedTo
  let price = value
    .div(ethers.BigNumber.from(10).pow(ethers.BigNumber.from(puissance)))
    .toString()
  if (price.length < fixedTo || price.length === fixedTo) {
    const diff = fixedTo - price.length
    for (let i = 0; i < diff; i++) {
      price = `0${price}`
    }
    return `0.${price}`
  } else {
    const diff = price.length - fixedTo
    return `${price.substring(0, diff)}.${price.substring(diff)}`
  }
}

interface State {
  lp: {
    user: string
    realUser: string
    proxy: string
    realProxy: string
  }
  tools: { amount: string; time: string; claimLocked: boolean }[]
  proxyAddress: string
}

export const state = (): State => ({
  lp: {
    user: '0x00',
    realUser: '0x00',
    proxy: '0x00',
    realProxy: '0x00',
  },
  tools: [],
  proxyAddress: '',
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  getTools(state) {
    const superState = [...state.tools]
    return superState.sort((toolA, toolB) => {
      const a = ethers.BigNumber.from(toolA.amount)
      const b = ethers.BigNumber.from(toolB.amount)
      if (a.gt(b)) {
        return -1
      } else if (b.gt(a)) {
        return 1
      } else {
        return 0
      }
    })
  },
  getTool: (state) => (id: number) => {
    return state.tools[id]
  },
  getRelativeLp(state) {
    return parseFloat(
      fees(
        ethers.BigNumber.from(state.lp.proxy).add(
          ethers.BigNumber.from(state.lp.user)
        )
      )
    )
  },
}

export const mutations: MutationTree<RootState> = {
  addTool(state, payload) {
    const newProxy = ethers.BigNumber.from(state.lp.proxy).sub(
      ethers.BigNumber.from(payload.amount)
    )._hex
    state.lp.proxy = newProxy
    state.tools.push(payload)
  },
  removeTool(state, id: number) {
    state.tools[id] = state.tools[state.tools.length - 1]
    state.tools.pop()
  },
  setToolTime(state, payload) {
    state.tools[payload.id].time = payload.time
  },
  setToolClaim(state, payload) {
    state.tools[payload.id].claimLocked = payload.status
  },
  setProxy(state, address) {
    state.proxyAddress = address
  },
  setProxyBalance(state, balance) {
    state.lp.realProxy = balance
  },
  createProxyBalance(state, balance) {
    state.lp.realProxy = balance
    state.lp.proxy = balance
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async createProxy() {
    const provider = await MetaMask.getProvider()

    if (provider.ok && provider.provider) {
      const superProvider = provider.provider

      const factory = new ethers.Contract(
        contracts.factory,
        factoryAbi,
        superProvider
      ).connect(superProvider.getSigner())

      try {
        return await factory.createProxy()
      } catch (error) {
        return -1
      }
    } else {
      return -1
    }
  },
  async getProxy({ commit }, address) {
    const provider = await MetaMask.getProvider()

    if (provider.ok && provider.provider) {
      const superProvider = provider.provider

      const factory = new ethers.Contract(
        contracts.factory,
        factoryAbi,
        superProvider
      )

      try {
        const proxy = await factory.getProxyOf(address)
        commit('setProxy', proxy)
        return proxy
      } catch (error) {
        return -1
      }
    } else {
      return -1
    }
  },

  async createLp({ state }, amount) {
    const provider = await MetaMask.getProvider()

    if (provider.ok && provider.provider && state.proxyAddress !== '') {
      const superProvider = provider.provider

      const proxy = new ethers.Contract(
        state.proxyAddress,
        proxyAbi,
        superProvider
      ).connect(superProvider.getSigner())

      try {
        await proxy.createLP({ value: ethers.utils.parseEther(`${amount}`) })
      } catch (error) {
        return -1
      }
    } else {
      return -1
    }
  },
  async getLpBalance({ commit, state }) {
    const provider = await MetaMask.getProvider()

    if (provider.ok && provider.provider && state.proxyAddress !== '') {
      const superProvider = provider.provider

      const proxy = new ethers.Contract(
        contracts.tokenPair,
        pairAbi,
        superProvider
      )

      try {
        const balance = await proxy.balanceOf(state.proxyAddress)
        if (state.tools.length === 0) {
          commit('createProxyBalance', balance._hex)
        }
        commit('setProxyBalance', balance._hex)
        return balance
      } catch (error) {
        return -1
      }
    } else {
      return -1
    }
  },
}
