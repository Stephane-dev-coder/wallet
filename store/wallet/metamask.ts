import { ethers } from 'ethers'

interface RequestArguments {
  method: string
  params?: unknown[] | object
}

interface EthereumProvider {
  request: (args: RequestArguments) => Promise<unknown>
}

declare global {
  interface Window {
    ethereum?: EthereumProvider
  }
}

export const getProvider = async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      provider.on('network', (_, oldNetwork: {}) => {
        if (oldNetwork) {
          window.location.reload()
        }
      })
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
  } else {
    return {
      ok: false,
      error: 'window.ethereum not found be sure MetaMask is installed !',
    }
  }
}

export default { getProvider }
