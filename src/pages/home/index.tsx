import { FC } from 'react'
import Mint from 'components/Mint'
import Header from 'components/Header'

import styles from './home.module.scss'

const Home: FC = () => (
  <div className={styles.home}>
    <Header />
    <Mint />
  </div>
)

export default Home
