import { ethers, BigNumber } from 'ethers'
import { GetterTree, ActionTree, MutationTree } from 'vuex'

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
}

export const state = (): State => ({
  lp: {
    user: '0x00',
    realUser: '0x00',
    proxy: '0x00',
    realProxy: '0x00',
  },
  tools: [],
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
}

export const actions: ActionTree<RootState, RootState> = {}
