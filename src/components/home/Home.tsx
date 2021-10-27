import React from 'react'
import Mint from '../mint/Mint'
import NavBar from '../navbar/NavBar'
import styles from './Home.module.scss'

const Home = () => {
    return(
        <div className={styles.homeWrapper}>
            <NavBar />
            <Mint />
        </div>
    )
}

export default Home