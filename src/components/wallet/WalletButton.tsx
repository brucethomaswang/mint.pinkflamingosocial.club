import { useWallet } from 'use-wallet'
import { useFlamingo } from '../../providers/PinkFlamingoSocialClubProvider'
import { useWalletButton } from '../../providers/WalletButtonProvider'
import styles from './WalletButton.module.scss'
import WalletModal from './WalletModal'

const WalletButton = () => {
  const { account, status } = useWallet()
  const { connectToChain, isModalOpen } = useWalletButton()

  const { mintedAndMax } = useFlamingo()

  const a = mintedAndMax(0)
  console.log(a, 'minted and max')

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
