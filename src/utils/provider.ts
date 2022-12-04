import Web3 from 'web3'
import { ethers } from 'ethers'

import config from 'config'

function web3ProviderFrom(endpoint: string, timeout: number): any {
  const providerClass = endpoint.includes('wss') ? Web3.providers.WebsocketProvider : Web3.providers.HttpProvider
  return new providerClass(endpoint, {
    timeout
  })
}

export function getDefaultProvider(): ethers.providers.Web3Provider {
  return new ethers.providers.Web3Provider(
    web3ProviderFrom(config.defaultProvider, config.config?.ethereumNodeTimeout),
    config.chainId
  )
}

export function getWSSProvider(): ethers.providers.Web3Provider {
  return new ethers.providers.Web3Provider(
    web3ProviderFrom(config.wssProvider, config.config?.ethereumNodeTimeout),
    config.chainId
  )
}
