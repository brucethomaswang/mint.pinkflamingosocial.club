import { useFlamingo } from '../../providers/PinkFlamingoSocialClubProvider'
import styles from './RedeemButton.module.scss'

const RedeemButton = () => {
  const { redeemFlamingo } = useFlamingo()
  return (
    <button
      className={styles.button}
      onClick={async () => {
        await redeemFlamingo()
      }}
    >
      Redeem
    </button>
  )
}

export default RedeemButton
