import styles from './WalletButton.module.scss'
import ClipLoader from 'react-spinners/ClipLoader'
import appConfig from '../../utils/appConfig'
import { useWalletButton } from '../../providers/WalletButtonProvider'

const WalletModal = () => {
  const { isError, isLoading, closeModal, isDone, isWrongChain } = useWalletButton()

  const Success = () => {
    return <div className={styles.textNotification}>Successfully Connected Wallet!</div>
  }

  const WrongChain = () => {
    return (
      <>
        <div className={styles.header}>
          <div className={styles.textNotification}>Wrong Network</div>
          <hr />
        </div>
        <div className={styles.textNotification}>
          Please check that you are connected to the{' '}
          {appConfig.chainId === 250 ? 'Fantom Main Net' : 'Fantom Test Net'} Network.
        </div>
      </>
    )
  }

  const NoWallet = () => {
    return (
      <>
        <div className={styles.header}>
          <h3>Get Wallet</h3>

          <hr />
        </div>

        <h5 className={styles.text}>
          Your wallet is your key to the crypto world. It allows you to interact with
          decentralized applications, from your browser. Please set one up using metamask.
        </h5>

        <a
          className={styles.link}
          href="https://metamask.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className={styles.getMetaMaskButton}>Get A Metamask Wallet</button>
        </a>
      </>
    )
  }

  const Loading = () => {
    return (
      <>
        <div className={styles.textNotification}>One second we are checking your wallet</div>
        <ClipLoader color={'black'} loading={true} size={75} />
      </>
    )
  }

  const Done = () => {
    return (
      <button onClick={() => closeModal()} className={styles.dismissButton}>
        Close
      </button>
    )
  }

  return (
    <div className={styles.modalWrapper}>
      <div>
        <div style={{ overflowY: 'auto' }}>
          {isLoading && <Loading />}
          {isDone && !isError && <Success />}
          {isError && isWrongChain && <WrongChain />}
          {isError && !isWrongChain && <NoWallet />}
          {isDone && <Done />}
        </div>
      </div>
    </div>
  )
}

export default WalletModal
