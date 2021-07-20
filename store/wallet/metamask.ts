import { ethers } from 'ethers'

interface RequestArguments {
  method: string
  params?: unknown[] | object
}

interface EthereumProvider {
  request: (args: RequestArguments) => Promise<unknown>
  on: (event: string, callback: () => void) => void
}

declare global {
  interface Window {
    ethereum?: EthereumProvider
  }
}

export const getWalletAddress = async (
  provider: ethers.providers.Web3Provider
) => {
  const accounts = await provider.listAccounts()
  return accounts[0]
}

export const isAlreayConnected = async (
  provider: ethers.providers.Web3Provider
) => {
  const accounts = await provider.listAccounts()
  if (accounts.length > 0) {
    return true
  } else {
    return false
  }
}

export const getProvider = async (init: boolean = false) => {
  if (window.ethereum && init) {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' })
      window.ethereum.on('chainChanged', () => {
        window.location.reload()
      })
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      return {
        ok: true,
        provider,
      }
    } catch (e) {
      return {
        ok: false,
        error: 'window.ethereum not found be sure MetaMask is installed !',
      }
    }
  } else if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    return {
      ok: true,
      provider,
    }
  } else {
    return {
      ok: false,
      error: 'window.ethereum not found be sure MetaMask is installed !',
    }
  }
}

export default { getProvider, getWalletAddress, isAlreayConnected }
