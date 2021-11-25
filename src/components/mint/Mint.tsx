import MintButton from '../mintButton/MintButton'
import MintProgress from '../mintProgress/MintProgress'
import styles from './Mint.module.scss'
import ClubSign from '../../assets/pfsc_sign.svg'
import { useFlamingo } from '../../providers/PinkFlamingoSocialClubProvider'
import { useEffect, useState } from 'react'
import RedeemButton from '../RedeemButton/RedeemButton'

const Mint = () => {
  const { checkIfEligibleForAirdrop } = useFlamingo()
  const [isEligible, setIsEligible] = useState<boolean>(false)

  useEffect(() => {
    const data = async () => {
      const isEligible = await checkIfEligibleForAirdrop()
      if (isEligible !== undefined) {
        setIsEligible(isEligible)
      }
    }

    data()
  }, [checkIfEligibleForAirdrop])

  return (
    <div className={styles.wrapper}>
      <div>
        <img src={ClubSign} alt="Pink Flamingo Social Club Logo" className={styles.clubSign} />
      </div>
      <div className={styles.description}>
        The promised lands are burning, The Great Migration is underway. These new lands offer
        hope, prosperity and intoxicating indulgence for the traveling flamingo. On the volcanic
        banks of the Great Pink Lake a grandiose club is home to the elusive, the elite, the
        sinful and the sinister. Flamingos from many chains will travel far and wide to unlock
        the secrets of the infamous Pink Flamingo Social Club.
      </div>
      <MintProgress />
      {/* <div className={styles.buttons}>
        <MintButton />
        {isEligible && <RedeemButton />}
      </div> */}
      {isEligible ? (
        <RedeemButton />
      ) : (
        <div className={styles.description}>
          Not eligible for redemption. Wait for public mint.
        </div>
      )}
    </div>
  )
}

export default Mint
