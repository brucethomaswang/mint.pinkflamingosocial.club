import { FC, Fragment, useEffect, useState } from 'react'
import { useMetaMask } from 'metamask-react'
import ClipLoader from 'react-spinners/ClipLoader'
import { ethers, providers } from 'ethers'
import Web3 from 'web3'

import styles from './header.module.scss'
import config from 'config'
import detectEthereumProvider from '@metamask/detect-provider'
import Flamingo from 'assets/badge.svg'
import useLocalStorage from 'hooks/useLocalStorage'

enum WalletState {
  WrongChain,
  NoWallet,
  Loading
}

const Header: FC = () => {
  return (
    <div className={styles.navbar}>
      <Fragment>
        <img src={Flamingo} alt="PFSC" className={styles.logo} />
      </Fragment>
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
        <button className={styles.buttonConnected}>{status}</button>
      ) : (
        <button className={styles.button} onClick={async () => await connected()}>
          Connect
        </button>
      )}
      {isDialogOpen && <WalletModal dialog={dialogState} />}
    </Fragment>
  )
}

const WrongChain = () => (
  <div className={styles.modal}>
    <div className={styles.header}>
      <div className={styles.textNotification}>Wrong Network</div>
      <hr />
    </div>
    <div className={styles.textNotification}>
      Please check that you are connected to the {!config.chainId ? 'Ethereum Mainnet' : 'Goerli Testnet'} Network.
    </div>
  </div>
)

const NoWallet = () => (
  <div className={styles.modal}>
    <div className={styles.header}>
      <h3>Get Wallet</h3>
      <hr />
    </div>

    <h5 className={styles.text}>
      Your wallet is your key to the crypto world. It allows you to interact with decentralized applications, from your
      browser. Please set one up using metamask.
    </h5>

    <a className={styles.link} href="https://metamask.io/" target="_blank" rel="noopener noreferrer">
      <button className={styles.getMetaMaskButton}>Get A Metamask Wallet</button>
    </a>
  </div>
)

const Loading = () => (
  <div className={styles.modal}>
    <div className={styles.textNotification}>One second we are checking your wallet</div>
    <ClipLoader color="white" size={75} loading />
  </div>
)

const WalletModal = ({ dialog }: { dialog?: WalletState }) => {
  switch (dialog) {
    case WalletState.NoWallet:
      return <NoWallet />
    case WalletState.WrongChain:
      return <WrongChain />
    default:
      return <Loading />
  }
}

export default Header
