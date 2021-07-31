import { BigNumber, ethers } from 'ethers'
import address from '../vars/contracts'
interface RequestArguments {
  method: string
  params?: unknown[] | object
}

interface EthereumProvider {
  request: (args: RequestArguments) => Promise<unknown>
  on: (event: string, callback: () => void) => void
  isConnected: () => boolean
}

declare global {
  interface Window {
    ethereum?: EthereumProvider
  }
}

export const getWalletAddress = async (
  provider: ethers.providers.Web3Provider
) => {
  listen()
  const accounts = await provider.listAccounts()
  return accounts[0]
}

export const getTokenBalance = async (
  provider: ethers.providers.Web3Provider,
  account: string
): Promise<BigNumber> => {
  const tokenAddress = address.token
  const balanceAbi = [
    'function balanceOf(address account) public view override returns (uint256)',
  ]
  const tokenInstance = new ethers.Contract(tokenAddress, balanceAbi, provider)

  return await tokenInstance.balanceOf(account)
}

export const sendTokens = async (
  provider: ethers.providers.Web3Provider,
  from: string,
  to: string,
  amount: BigNumber
): Promise<{
  ok: boolean
  error?: {
    code: number
    message: string
  }
}> => {
  const tokenAddress = address.token
  const balanceAbi = [
    'function transfer(address recipient, uint256 amount) public returns (bool)',
  ]
  const tokenInstance = new ethers.Contract(
    tokenAddress,
    balanceAbi,
    provider
  ).connect(provider.getSigner())

  try {
    await tokenInstance.transfer(to, amount, { from })
    return {
      ok: true,
    }
  } catch (err) {
    if (err.code === -32603 && err.message.includes('nonce')) {
      return {
        ok: false,
        error: {
          code: -32603,
          message: 'Nonce incorrect',
        },
      }
    }
    if (err.code === 4001) {
      return {
        ok: false,
        error: {
          code: 4001,
          message: "L'utilisateur a rejeter la requette",
        },
      }
    }

    if (
      err.code === -32603 &&
      err.data.message === 'VM Exception while processing transaction: revert'
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

const listen = () => {
  if (window.ethereum) {
    window.ethereum.on('chainChanged', () => {
      window.location.reload()
    })
    window.ethereum.on('accountsChanged', () => {
      window.location.reload()
    })
  }
}

const checkValidity = async (
  provider: ethers.providers.Web3Provider
): Promise<{
  ok: boolean
  provider?: ethers.providers.Web3Provider | undefined
  error?: { code: number; message: string } | undefined
}> => {
  if (window.ethereum) {
    const chainId = await window.ethereum.request({ method: 'eth_chainId' })
    if (chainId !== '0x539') {
      listen()
      return {
        ok: false,
        error: {
          code: 2, // A changer !! Besoins d'une logique d'erreur pas juste des nombre wesh
          message: "Vous n'etes pas sur le bon reaseaux",
        },
      }
    }
    if (!window.ethereum.isConnected()) {
      listen()
      return {
        ok: false,
        error: {
          code: 3, // A changer !! Besoins d'une logique d'erreur pas juste des nombre wesh
          message: "Vous n'etes pas connecter au reseaux !",
        },
      }
    }
    return {
      ok: true,
      provider,
    }
  }
  return {
    ok: false,
    error: {
      code: 1, // A changer !! Besoins d'une logique d'erreur pas juste des nombre wesh
      message: 'window.ethereum pas trouver veuiller installer MetaMask !',
    },
  }
}

export const getProvider = async (
  init: boolean = false
): Promise<{
  ok: boolean
  provider?: ethers.providers.Web3Provider | undefined
  error?: { code: number; message: string } | undefined
}> => {
  if (window.ethereum && init) {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      return await checkValidity(provider)
    } catch (e) {
      if (e.code === 4001) {
        return {
          ok: false,
          error: {
            code: 4001,
            message: 'Vous avez refuser la connexion !',
          },
        }
      } else {
        return {
          ok: false,
          error: {
            code: 0,
            message: "Quelque chose c'est mal passer",
          },
        }
      }
    }
  } else if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    return await checkValidity(provider)
  } else {
    return {
      ok: false,
      error: {
        code: 1, // A changer !! Besoins d'une logique d'erreur pas juste des nombre wesh
        message: 'window.ethereum pas trouver veuiller installer MetaMask !',
      },
    }
  }
}

export default {
  getProvider,
  getWalletAddress,
  isAlreayConnected,
  getTokenBalance,
  sendTokens,
}
