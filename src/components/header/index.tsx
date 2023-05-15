import { FC, Fragment } from 'react'

import styles from './header.module.scss'

import Flamingo from 'assets/badge.svg'
import WalletModal from 'components/modal'
import useWallet from 'hooks/useWallet'
import { NavLink } from 'react-router-dom'

const Header: FC = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.nav}>
        <a href="https://www.pinkflamingosocial.club/">
          <img src={Flamingo} alt="PFSC" className={styles.logo} />
        </a>
        <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to={'/'}>
          Mint
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to={'/incubate'}>
          Incubator
        </NavLink>
        <a href="https://www.mooar.com/collection?contract=0x3aAf863C084ECD5dD413C432ED8022F532850D82">
          Eggs
        </a>
      </div>
      <Connect />
    </div>
  )
}

const Connect = () => {
  const { status, account, connect, state, isLoading } = useWallet()
  return (
    <Fragment>
      {account ? (
        <button className={styles.connected}>{isLoading ? 'loading' : status}</button>
      ) : (
        <button onClick={async () => await connect()}>Connect</button>
      )}
      {state !== null && <WalletModal dialog={state} />}
    </Fragment>
  )
}

export default Header
