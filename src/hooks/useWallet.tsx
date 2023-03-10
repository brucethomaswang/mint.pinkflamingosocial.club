import { useCallback, useEffect, useMemo, useState } from 'react'
import detectEthereumProvider from '@metamask/detect-provider'
import { MetaMaskInpageProvider } from '@metamask/providers'
import { useQuery } from '@tanstack/react-query'
import useLocalStorage from 'hooks/useLocalStorage'
import { useMetaMask } from 'metamask-react'
import { WalletState } from 'components/modal'
import config from 'config'

export type IWallet = {
  status: 'initializing' | 'unavailable' | 'notConnected' | 'connecting' | 'connected'
  connect: () => Promise<string[] | null>
  account: string | null
  provider?: any
  state?: WalletState | null
  isLoading: boolean
}

export default function useWallet() {
  const { connect, account, status } = useMetaMask()
  const [alreadyConnected, setAlreadyConnected] = useLocalStorage<boolean>('alreadyConnected', false)
  const [provider, setProvider] = useState<MetaMaskInpageProvider | null>(null)
  // TODO: refactor connectState
  const [connectState, setConnectState] = useState<WalletState | null>()
  const { data, isLoading } = useQuery<MetaMaskInpageProvider | null>(
    ['provider'],
    async () => await detectEthereumProvider(),
    {
      onSuccess: (data) => setProvider(data),
      refetchOnWindowFocus: false
    }
  )

  const chainHandler = (): void => {
    if (provider) {
      // NOTE: eventually move to an array of valid chains
      if (provider.chainId !== `0x${config.chainId}`) {
        setConnectState(WalletState.WrongChain)
      } else {
        setConnectState(null)
      }
    }
  }

  const connectHandler = async (): Promise<void> => {
    // TODO: test try/catch
    await connect()
    // TODO: maybe key map the different accounts?
    setAlreadyConnected(true)
    setConnectState(null)
  }

  // TODO: account change...
  //   provider.on('accountChanged', () => connect())

  useEffect(() => {
    if (provider) {
      chainHandler()
      provider.on('chainChanged', chainHandler)
    }
    return (): void => {
      if (provider) {
        provider.removeListener('chainChanged', chainHandler)
      }
    }
  }, [provider])

  useCallback(() => {
    if (data) {
      if (alreadyConnected) {
        connectHandler()
      }
    } else {
      setConnectState(WalletState.NoWallet)
    }
  }, [data])

  return useMemo(
    (): IWallet => ({ status, connect, account, provider, state: connectState, isLoading }),
    [status, connect, account, data, connectState, isLoading]
  )
}
