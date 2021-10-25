import React from 'react'
import NavBar from '../navbar/NavBar'
import WalletButton from '../wallet/WalletButton'
import styles from './Home.module.scss'

const Home = () => {
    return(
        <div className={styles.homeWrapper}>
            <NavBar />
        </div>
    )
}

export default Home