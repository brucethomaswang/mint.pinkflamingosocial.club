import React, { useEffect, useState } from 'react'
import { useFlamingo } from '../../providers/PinkFlamingoSocialClubProvider'
import styles from './MintProgress.module.scss'

const MintProgress = () => {
  const { mintedAndMax } = useFlamingo()

  const [minted, setMinted] = useState<number>(0)

  useEffect(() => {
    const getData = async () => {
      const { invocations } = await mintedAndMax()
      setMinted(invocations)
    }
    getData()
  }, [mintedAndMax])

  return (
    <div>
      <div className={styles.grid}>
        <div className={styles.firstItem}>{minted}</div>
        <div>777</div>
      </div>
    </div>
  )
}

export default MintProgress
