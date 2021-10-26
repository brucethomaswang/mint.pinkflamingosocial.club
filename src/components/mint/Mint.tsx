import React from 'react'
import MintButton from '../mintButton/MintButton'
import styles from './Mint.module.scss'


const Mint = () => {
    return(
        <div className={styles.wrapper}>
            <div className={styles.title}>
                Pink Flamingo Social Club
            </div>
            <MintButton />
        </div>
    )
}

export default Mint