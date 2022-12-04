import { ReactNode, ReactElement, useEffect, useState, useContext, createContext } from 'react'
import { useWallet } from 'use-wallet'

import { Wallet } from 'utils/Wallet'
import config from 'config'

interface Web3ProviderValue {
  wallet: Wallet
}

const Web3Context = createContext({} as Web3ProviderValue)

function Web3Provider({ children }: { children: ReactNode }): ReactElement {
  const { ethereum, account } = useWallet()
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

  return <Web3Context.Provider value={{ wallet } as Web3ProviderValue}>{children}</Web3Context.Provider>
}

const useWeb3 = (): Web3ProviderValue => useContext(Web3Context)
export { Web3Provider, useWeb3, Web3Context }
export default Web3Provider
