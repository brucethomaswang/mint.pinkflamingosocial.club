import { useWallet } from 'use-wallet'
import { useWalletButton } from '../../providers/WalletButtonProvider'
import styles from './WalletButton.module.scss'
import WalletModal from './WalletModal'

const WalletButton = () => {
  const { account, status, chainId, balance } = useWallet()
  const { connectToChain, isModalOpen } = useWalletButton()

  console.log(account, chainId, balance)
  return (
    <>
      {account ? (
        <button className={styles.buttonConnected}>{status}</button>
      ) : (
        <button
          className={styles.button}
          onClick={async () => {
            await connectToChain()
          }}
        >
          Unlock wallet
        </button>
      )}

      {isModalOpen && <WalletModal />}
    </>
  )
}

export default WalletButton
