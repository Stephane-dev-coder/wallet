import { BigNumber, ethers } from 'ethers'
import address from '../vars/contracts'
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
  if (window.ethereum) {
    window.ethereum.on('chainChanged', () => {
      window.location.reload()
    })
    window.ethereum.on('accountsChanged', () => {
      window.location.reload()
    })
  }
  const accounts = await provider.listAccounts()
  return accounts[0]
}

export const getTokenBalance = async (
  provider: ethers.providers.Web3Provider,
  account: string
): Promise<number> => {
  const tokenAddress = address.token
  const balanceAbi = [
    'function balanceOf(address account) public view override returns (uint256)',
  ]
  const tokenInstance = new ethers.Contract(tokenAddress, balanceAbi, provider)

  let balance: BigNumber = await tokenInstance.balanceOf(account)
  balance = balance.div(
    ethers.BigNumber.from(10).pow(ethers.BigNumber.from(10))
  )
  const balanceNumber = balance.toNumber() / 10 ** 8
  return balanceNumber
}

export const sendTokens = async (
  provider: ethers.providers.Web3Provider,
  from: string,
  to: string,
  amount: number | BigNumber
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
    return {
      ok: false,
      error: {
        code: 0,
        message: err,
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

export const getProvider = async (init: boolean = false) => {
  if (window.ethereum && init) {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      return {
        ok: true,
        provider,
      }
    } catch (e) {
      if (e.code === 4001) {
        return {
          ok: false,
          error: 'Vous devez connecter un de vos comptes',
        }
      } else {
        return {
          ok: false,
          error: "Quelque chose c'est mal passer",
        }
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

export default {
  getProvider,
  getWalletAddress,
  isAlreayConnected,
  getTokenBalance,
  sendTokens,
}
