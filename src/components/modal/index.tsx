import ClipLoader from 'react-spinners/ClipLoader'
import styles from './modal.module.scss'
import config from 'config'

export enum WalletState {
  WrongChain,
  NoWallet,
  Loading
}

const WrongChain = () => (
  <div className={styles.modal}>
    <h1>Wrong Network</h1>
    <hr />
    <br />
    <p>Please check that you are connected to the {!config.chainId ? 'Ethereum Mainnet' : 'Goerli Testnet'} Network.</p>
  </div>
)

const NoWallet = () => (
  <div className={styles.modal}>
    <h1>Get Wallet</h1>
    <hr />
    <br />
    <p>You require Metamask to participate.</p>

    <a className={styles.link} href="https://metamask.io/" target="_blank" rel="noopener noreferrer">
      <button className={styles.getMetaMaskButton}>Get A Metamask</button>
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

export default WalletModal
