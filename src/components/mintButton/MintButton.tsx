import { useWallet } from 'use-wallet'
import { useFlamingo } from '../../providers/PinkFlamingoSocialClubProvider'
import styles from './MintButton.module.scss'

const MintButton = () => {
  const { purchase } = useFlamingo()
  const { account } = useWallet()

  if (!account) {
    return <></>
  }

  return (
    <button className={styles.button} onClick={() => purchase()}>
      Mint
    </button>
  )
}

export default MintButton
