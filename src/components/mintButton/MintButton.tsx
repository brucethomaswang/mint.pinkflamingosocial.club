import React from 'react'
import { useWallet } from 'use-wallet'
import { useFlamingo } from '../../providers/PinkFlamingoSocialClubProvider'
import styles from './MintButton.module.scss'


interface MintProps {
    collectionID: number
  }
  

const MintButton = ({collectionID}: MintProps) => {
    const { purchase } = useFlamingo()
    const { account } = useWallet()

    if(!account) {
        return(
            <button className={styles.button}>
                Connect Wallet
            </button>
        )
    }

    return(
        <button
            className={styles.button}
            onClick={() => purchase(collectionID)}
        >
            Mint
        </button>
    )
}

export default MintButton