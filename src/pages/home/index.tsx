import { FC } from 'react'
import { Routes, Route, Outlet, Link } from 'react-router-dom'

import Mint from 'components/mint'
import Incubate from 'components/incubate'
import Header from 'components/header'

import styles from './home.module.scss'

const Home: FC = () => (
  <div className={styles.home}>
    <Header />
    <Routes>
      <Route path="/">
        <Route index element={<Mint />} />
        <Route path="incubate" element={<Incubate />} />
      </Route>
    </Routes>
  </div>
)

export default Home
