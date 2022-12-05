import { providers, Signer } from 'ethers'

import { Configuration } from 'config'

export class Wallet {
  account?: string
  provider: providers.BaseProvider
  signer?: Signer
  config: Configuration

  constructor(config: Configuration) {
    let network: providers.Networkish
    if (config.name !== 'homestead') {
      network = {
        chainId: config.chainId,
        name: config.name
      }
    } else {
      network = providers.getNetwork('homestead')
    }
    this.config = config
    this.provider = new providers.JsonRpcProvider(config.defaultProvider, network)
  }

  unlockWallet(provider: any, account: string) {
    const newProvider = new providers.Web3Provider(provider, this.config.chainId)
    this.signer = newProvider.getSigner(0)
    this.account = account
  }
}
