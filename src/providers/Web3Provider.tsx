import { ReactNode, ReactElement, useEffect, useState, useContext, createContext } from 'react'
import { useMetaMask } from 'metamask-react'

import { Wallet } from 'utils/Wallet'
import config from 'config'

interface IWeb3ProviderValue {
  wallet: Wallet
}

const Web3Context = createContext({} as IWeb3ProviderValue)

function Web3Provider({ children }: { children: ReactNode }): ReactElement {
  const { account, ethereum } = useMetaMask()
  const [wallet, setWallet] = useState<Wallet>()

  useEffect(() => {
    if (!wallet) {
      const wallet = new Wallet(config)
      if (account) {
        wallet.unlockWallet(ethereum, account)
      }
      setWallet(wallet)
    } else if (account) {
      wallet.unlockWallet(ethereum, account)
    }
  }, [account, ethereum, wallet])

  return <Web3Context.Provider value={{ wallet } as IWeb3ProviderValue}>{children}</Web3Context.Provider>
}

const useWeb3 = (): IWeb3ProviderValue => useContext(Web3Context)
export { Web3Provider, useWeb3, Web3Context }
export default Web3Provider
