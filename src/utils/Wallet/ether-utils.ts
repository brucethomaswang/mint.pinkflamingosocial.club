import Web3 from 'web3'
import { formatUnits, parseUnits } from 'ethers/lib/utils'
import { BigNumber } from 'ethers'

export const defaultEthereumConfig = {
  testing: false,
  autoGasMultiplier: 1.5,
  defaultConfirmations: 1,
  defaultGas: '6000000',
  defaultGasPrice: '1000000000000',
  ethereumNodeTimeout: 10000,
}

export function web3ProviderFrom(endpoint: string): any {
  const config = {
    testing: false,
    autoGasMultiplier: 1.5,
    defaultConfirmations: 1,
    defaultGas: '6000000',
    defaultGasPrice: '1000000000000',
    ethereumNodeTimeout: 10000,
  }

  const ethConfig = Object.assign(defaultEthereumConfig, config || {})

  const providerClass = endpoint.includes('wss')
    ? Web3.providers.WebsocketProvider
    : Web3.providers.HttpProvider

  return new providerClass(endpoint, {
    timeout: ethConfig.ethereumNodeTimeout,
  })
}

export function balanceToDecimal(s: string): string {
  return formatUnits(s)
}

export function decimalToBalance(d: string | number, decimals = 18): BigNumber {
  return parseUnits(String(d), decimals)
}
