import { FC, Fragment } from 'react'

import styles from './header.module.scss'

import Flamingo from 'assets/badge.svg'
import WalletModal from 'components/modal'
import useWallet from 'hooks/useWallet'

const Header: FC = () => {
  return (
    <div className={styles.navbar}>
      <a href="https://www.pinkflamingosocial.club/">
        <img src={Flamingo} alt="PFSC" className={styles.logo} />
      </a>
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
