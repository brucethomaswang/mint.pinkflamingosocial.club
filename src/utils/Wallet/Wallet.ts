import { Configuration } from '../appConfig'
import appConfig from '../appConfig'
import { ethers } from 'ethers'
export class Wallet {
  myAccount: string | undefined
  provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider
  signer?: ethers.Signer
  config: Configuration

  constructor(cfg: Configuration) {
    const network: ethers.providers.Networkish = {
      chainId: appConfig.chainId,
      name: 'fantom',
    }
    const provider = new ethers.providers.JsonRpcProvider(appConfig.defaultProvider, network)
    this.config = cfg
    this.provider = provider
  }

  /**
   * @param provider From an unlocked wallet. (e.g. Metamask)
   * @param account An address of unlocked wallet account.
   */
  unlockWallet(provider: any, account: string) {
    const newProvider = new ethers.providers.Web3Provider(provider, this.config.chainId)
    this.signer = newProvider.getSigner(0)
    this.myAccount = account
    console.log(`🔓 Wallet is unlocked. Welcome, ${account}!`)
  }
}
