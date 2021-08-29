import { ethers, BigNumber } from 'ethers'
import { GetterTree, ActionTree, MutationTree } from 'vuex'
import MetaMask from './wallet/metamask'

import contracts from './vars/contracts'

const factoryAbi = [
  'function createProxy() external returns (address proxy)',
  'function getProxyOf(address user) external view returns (address proxy)',
]

const proxyAbi = [
  'function createLP() external payable',
  'function destroyLP(uint amount) external',
  'function stake(uint amount, uint time, bool isClaimLocked) external returns (uint multiplier, uint unlock)',
  'function unstake(uint amount) external',
]
const pairAbi = ['function balanceOf(address) view returns (uint)']

const lockerAbi = [
  'function getVaultsOf(address user) view external returns(tuple(uint amount, uint unlock, uint multiplier, bool claimLocked)[] vaults)',
  'function unstake(uint amount) external',
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
  vaults: {
    user: {
      amount: string
      unlock: string
      multiplier: string
      claimLocked: boolean
    }[]
    proxy: {
      amount: string
      unlock: string
      multiplier: string
      claimLocked: boolean
    }[]
  }
  proxyAddress: string
}

const storageProxyAddress = window.localStorage.getItem('proxyAddress')
const storageTools = JSON.parse(
  window.localStorage.getItem('savedTools') || '[]'
)
const lpBalance = window.localStorage.getItem('lpBalance') || '0x00'

export const state = (): State => ({
  lp: {
    user: '0x00',
    realUser: '0x00',
    proxy: lpBalance,
    realProxy: '0x00',
  },
  tools: storageTools,
  vaults: {
    user: [],
    proxy: [],
  },
  proxyAddress: storageProxyAddress || '',
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
  getVaults(state) {
    const superState = [
      ...state.vaults.proxy.map((vault) => {
        return {
          type: 'proxy',
          ...vault,
        }
      }),
      ...state.vaults.user.map((vault) => {
        return {
          type: 'user',
          ...vault,
        }
      }),
    ]
    return superState.sort((vaultA, vaultB) => {
      const a = ethers.BigNumber.from(vaultA.amount)
      const b = ethers.BigNumber.from(vaultB.amount)
      if (a.gt(b)) {
        return -1
      } else if (b.gt(a)) {
        return 1
      } else {
        return 0
      }
    })
  },
  getVault: (_, getters) => (id: number) => {
    return getters.getVaults[id]
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
    window.localStorage.setItem('lpBalance', newProxy)
    window.localStorage.setItem('savedTools', JSON.stringify(state.tools))
  },
  removeTool(state, id: number) {
    const amount = state.tools[id].amount
    const newProxy = ethers.BigNumber.from(state.lp.proxy).add(
      ethers.BigNumber.from(amount)
    )._hex
    state.tools[id] = state.tools[state.tools.length - 1]
    state.tools.pop()
    window.localStorage.setItem('lpBalance', newProxy)
    window.localStorage.setItem('savedTools', JSON.stringify(state.tools))
  },
  setToolTime(state, payload) {
    state.tools[payload.id].time = payload.time
    window.localStorage.setItem('savedTools', JSON.stringify(state.tools))
  },
  setToolClaim(state, payload) {
    state.tools[payload.id].claimLocked = payload.status
    window.localStorage.setItem('savedTools', JSON.stringify(state.tools))
  },
  setProxy(state, address) {
    if (address !== state.proxyAddress) {
      state.proxyAddress = address
      window.localStorage.setItem('proxyAddress', address)
    }
  },
  setProxyBalance(state, balance) {
    state.lp.realProxy = balance

    let total = ethers.BigNumber.from(0)

    for (let i = 0; i < state.tools.length; i++) {
      const tool = state.tools[i]
      total = total.add(ethers.BigNumber.from(tool.amount))
    }
    total = total.add(state.lp.proxy)
    if (total > balance) {
      state.tools = []
      window.localStorage.setItem('savedTools', JSON.stringify(state.tools))
    }
  },
  createProxyBalance(state, balance) {
    state.lp.realProxy = balance
    state.lp.proxy = balance
  },
  setVaults(state, payload) {
    if (payload.type === 'user') {
      state.vaults.user = payload.vaults
    } else {
      state.vaults.proxy = payload.vaults
    }
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async createProxy() {
    const provider = await MetaMask.getProvider()

    if (provider?.ok && provider.provider) {
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

    if (provider?.ok && provider.provider) {
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

    if (provider?.ok && provider.provider && state.proxyAddress !== '') {
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
  async destroyLp({ state }, toolId) {
    const provider = await MetaMask.getProvider()

    if (provider?.ok && provider.provider && state.proxyAddress !== '') {
      const superProvider = provider.provider

      const proxy = new ethers.Contract(
        state.proxyAddress,
        proxyAbi,
        superProvider
      ).connect(superProvider.getSigner())

      const amount = state.tools[toolId].amount

      try {
        await proxy.destroyLP(ethers.BigNumber.from(amount))
      } catch (error) {
        return -1
      }
    } else {
      return -1
    }
  },
  async getLpBalance({ commit, state }) {
    const provider = await MetaMask.getProvider()

    if (provider?.ok && provider.provider && state.proxyAddress !== '') {
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
  async getPowerBalance({ state }) {
    const provider = await MetaMask.getProvider()

    if (provider?.ok && provider.provider && state.proxyAddress !== '') {
      const superProvider = provider.provider

      const locker = new ethers.Contract(
        contracts.locker,
        pairAbi,
        superProvider
      )

      try {
        return await locker.balanceOf(state.proxyAddress)
      } catch (error) {
        return -1
      }
    } else {
      return -1
    }
  },
  async stakeTool({ state }, id) {
    const provider = await MetaMask.getProvider()

    if (provider?.ok && provider.provider && state.proxyAddress !== '') {
      const superProvider = provider.provider

      const proxy = new ethers.Contract(
        state.proxyAddress,
        proxyAbi,
        superProvider
      ).connect(superProvider.getSigner())

      try {
        const tool = state.tools[id]
        await proxy.stake(
          ethers.BigNumber.from(tool.amount),
          ethers.BigNumber.from(tool.time),
          tool.claimLocked
        )
      } catch (error) {
        return -1
      }
    } else {
      return -1
    }
  },
  async createVaults({ state, commit }, address) {
    const provider = await MetaMask.getProvider()

    if (provider?.ok && provider.provider && state.proxyAddress !== '') {
      const superProvider = provider.provider

      const locker = new ethers.Contract(
        contracts.locker,
        lockerAbi,
        superProvider
      ).connect(superProvider.getSigner())

      try {
        const vaultsUser = await locker.getVaultsOf(address)
        if (vaultsUser.length > 0) {
          commit('setVaults', {
            type: 'user',
            vaults: vaultsUser.map(
              (vault: {
                amount: BigNumber
                unlock: BigNumber
                multiplier: BigNumber
                claimLocked: boolean
              }) => {
                return {
                  amount: vault.amount._hex,
                  unlock: vault.unlock._hex,
                  multiplier: vault.multiplier._hex,
                  claimLocked: vault.claimLocked,
                }
              }
            ),
          })
        }
        const vaultsProxy = await locker.getVaultsOf(state.proxyAddress)
        if (vaultsProxy.length > 0) {
          commit('setVaults', {
            type: 'proxy',
            vaults: vaultsProxy.map(
              (vault: {
                amount: BigNumber
                unlock: BigNumber
                multiplier: BigNumber
                claimLocked: boolean
              }) => {
                return {
                  amount: vault.amount._hex,
                  unlock: vault.unlock._hex,
                  multiplier: vault.multiplier._hex,
                  claimLocked: vault.claimLocked,
                }
              }
            ),
          })
        }
      } catch (error) {
        return -1
      }
    } else {
      return -1
    }
  },
  async lockerUnstake({ state, getters }, id) {
    const provider = await MetaMask.getProvider()

    if (provider?.ok && provider.provider && state.proxyAddress !== '') {
      const superProvider = provider.provider

      const vault: { amount: string; type: string } = getters.getVault(id)
      if (vault.type === 'user') {
        const locker = new ethers.Contract(
          contracts.locker,
          lockerAbi,
          superProvider
        ).connect(superProvider.getSigner())

        try {
          return await locker.unstake(ethers.BigNumber.from(vault.amount))
        } catch (error) {
          if (
            error.data.message ===
            "execution reverted: LPLocker: You can't withdraw more than you have unlocked !"
          ) {
            return -2
          }
          return -1
        }
      } else {
        const proxy = new ethers.Contract(
          state.proxyAddress,
          proxyAbi,
          superProvider
        ).connect(superProvider.getSigner())

        try {
          return await proxy.unstake(ethers.BigNumber.from(vault.amount))
        } catch (error) {
          if (
            error.data.message ===
            "execution reverted: LPLocker: You can't withdraw more than you have unlocked !"
          ) {
            return -2
          }
          return -1
        }
      }
    } else {
      return -1
    }
  },
}
