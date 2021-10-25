import React from 'react'
import Logo from '../logo/Logo'
import WalletButton from '../wallet/WalletButton'
import styles from './NavBar.module.scss'

const NavBar = () => {
    return(
        <div className={styles.wrapper}>
            <Logo />
            <WalletButton />
        </div>
    )
}

export default NavBar