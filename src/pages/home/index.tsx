import { FC } from 'react'
import Mint from 'components/mint'
import Header from 'components/header'

import styles from './home.module.scss'

const Home: FC = () => (
  <div className={styles.home}>
    <Header />
    <Mint />
  </div>
)

export default Home
