import { ethers, BigNumber } from 'ethers'
import { GetterTree, ActionTree, MutationTree } from 'vuex'
import MetaMask from './wallet/metamask'

import contracts from './vars/contracts'

const factoryAbi = [
  'function createProxy() external returns (address proxy)',
  'function getProxyOf(address user) external view returns (address proxy)',
]

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
    state.tools.push(payload)
  },
  removeTool(state, id: number) {
    state.tools[id] = state.tools[state.tools.length - 1]
    state.tools.pop()
  },
  setProxy(state, address) {
    state.proxyAddress = address
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
}
