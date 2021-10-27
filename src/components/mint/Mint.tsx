import React from 'react'
import MintButton from '../mintButton/MintButton'
import MintProgress from '../mintProgress/MintProgress'
import styles from './Mint.module.scss'
import ClubSign from '../../assets/pfsc_sign.svg'

const Mint = () => {
  return (
    <div className={styles.wrapper}>
      {/* <div className={styles.title}>
                Pink Flamingo Social Club
            </div> */}
      <div>
        <img src={ClubSign} alt="Pink Flamingo Social Club Logo" className={styles.clubSign} />
      </div>
      <div className={styles.description}>
        The promised lands are burning, the great migration is underway. These new lands offer
        hope, prosperity and intoxicating indulgence for the traveling flamingo. On the volcanic
        banks of the Great Pink Lake the genesis 777 Flamingos have built a grandiose club to
        house the elusive, the elite, the sinful and the sinister.
      </div>
      <MintProgress />
      <MintButton />
    </div>
  )
}

export default Mint
