import React from 'react'
import WalletButton from '../wallet/WalletButton'
import styles from './Home.module.scss'

const Home = () => {
    return(
        <div className={styles.homeWrapper}>
            <WalletButton />
        </div>
    )
}

export default Home