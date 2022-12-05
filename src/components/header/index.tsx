import { FC, Fragment, useEffect, useState } from 'react'
import { useMetaMask } from 'metamask-react'

import styles from './header.module.scss'
import config from 'config'
import detectEthereumProvider from '@metamask/detect-provider'
import Flamingo from 'assets/badge.svg'
import useLocalStorage from 'hooks/useLocalStorage'
import WalletModal, { WalletState } from 'components/modal'

const Header: FC = () => {
  return (
    <div className={styles.navbar}>
      <a href="https://www.pinkflamingosocial.club/">
        <img src={Flamingo} alt="PFSC" className={styles.logo} />
      </a>
      <Connect />
    </div>
  )
}

const Connect = () => {
  const { connect, account, status } = useMetaMask()
  const [alreadyConnected, setAlreadyConnected] = useLocalStorage<boolean>('alreadyConnected', false)
  const [chainId, setChainId] = useState<string | null>()
  const [provider, setProvider] = useState<any>()
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false)
  const [dialogState, setDialogState] = useState<WalletState>()

  useEffect(() => {
    async function detectProvider() {
      setProvider(await detectEthereumProvider())
    }
    detectProvider()
  }, [])

  const connected = async () => {
    setDialogOpen(true)
    setDialogState(WalletState.Loading)
    if (provider) {
      if (provider.chainId !== `0x${config.chainId}`) {
        setDialogState(WalletState.WrongChain)
      } else {
        await connect()
        setAlreadyConnected(true)
        setDialogOpen(false)
      }
    } else {
      setDialogState(WalletState.NoWallet)
    }
  }

  if (provider) {
    provider.on('chainChanged', () => setChainId(provider.chainId))
  }

  useEffect(() => {
    if (provider && alreadyConnected) {
      connected()
    }
  }, [alreadyConnected, provider, chainId])

  return (
    <Fragment>
      {account ? (
        <button className={styles.connected}>{status}</button>
      ) : (
        <button onClick={async () => await connected()}>Connect</button>
      )}
      {isDialogOpen && <WalletModal dialog={dialogState} />}
    </Fragment>
  )
}

export default Header
