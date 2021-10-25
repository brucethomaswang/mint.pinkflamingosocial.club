import detectEthereumProvider from '@metamask/detect-provider'
import { createContext, ReactElement, ReactNode, useContext, useState } from 'react'
import { useWallet } from 'use-wallet'
import appConfig from '../utils/appConfig'

interface WalletButtonProviderValue {
  isError: boolean
  isLoading: boolean
  isModalOpen: boolean
  connectToChain: () => Promise<void>
  closeModal: () => void
  isDone: boolean
  isWrongChain: boolean
}

const WalletButtonContext = createContext({} as WalletButtonProviderValue)

function WalletButtonProvider({ children }: { children: ReactNode }): ReactElement {
  const { connect } = useWallet()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isDone, setIsDone] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isWrongChain, setIsWrongChain] = useState(false)

  const connectToChain = async () => {
    setIsLoading(true)
    setIsModalOpen(true)
    const correctChainId = appConfig.chainId === 250 ? '0xfa' : `0x${Number(4002).toString(16)}`
    const provider = (await detectEthereumProvider()) as any
    if (!provider) {
      setIsError(true)
      setIsLoading(false)
      setIsDone(true)
      return
    }

    if (provider.chainId !== correctChainId) {
      setIsError(true)
      setIsWrongChain(true)
      setIsLoading(false)
      setIsDone(true)
    }

    await connect('injected')

    setIsLoading(false)
    setIsDone(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setIsError(false)
    setIsDone(false)
    setIsWrongChain(false)
  }

  return (
    <WalletButtonContext.Provider
      value={{
        connectToChain,
        isModalOpen,
        isError,
        isLoading,
        closeModal,
        isDone,
        isWrongChain,
      }}
    >
      {children}
    </WalletButtonContext.Provider>
  )
}
const useWalletButton = (): WalletButtonProviderValue => useContext(WalletButtonContext)
export { WalletButtonProvider, useWalletButton, WalletButtonContext }
export default WalletButtonProvider
