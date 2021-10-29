import React from 'react'
import flamingbo from '../../assets/Flamingo_Badge_PINK.svg'
import styles from './Logo.module.scss'

const Logo = () => {
    return(
        <div>
            <img src={flamingbo} alt="flamingbo" className={styles.logo}/>
        </div>
    )
}

export default Logo