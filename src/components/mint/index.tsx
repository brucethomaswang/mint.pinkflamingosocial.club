import { FC, Fragment, useState } from 'react'
import { useMetaMask } from 'metamask-react'

import Banner from 'assets/LETTER.png'
import { MINT_LEN } from 'config'
import { PinkFlamingoSocialClub } from 'services/index'
import { useFlamingo } from 'providers/PinkFlamingoSocialClubProvider'
import { useWeb3 } from 'providers/Web3Provider'
import styles from './mint.module.scss'

const Mint: FC = () => {
  const { account } = useMetaMask()
  const { isWhitelistOnly, isPaused, isConcluded } = useFlamingo()
  return (
    <div className={styles.wrapper}>
      <div className={styles.banner}>
        <img src={Banner} alt="Pink Flamingo Social Club" />
      </div>
      <div className={styles.center}>
        <MintProgress />
      </div>
      <div className={styles.bottom}>
        <div className={isPaused || isConcluded ? styles.notice : ''}>
          {isPaused || isConcluded ? (
            <p>Minting is {isConcluded ? 'Finished' : 'Paused'}</p>
          ) : (
            <Fragment>
              {account ? (
                <Fragment>{isWhitelistOnly ? <WhitelistMint /> : <PublicMintButton />}</Fragment>
              ) : (
                <p>Please Connect</p>
              )}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  )
}

const WhitelistMint: FC = () => {
  const { isWhitelisted } = useFlamingo()
  return (
    <Fragment>
      {isWhitelisted ? (
        <Fragment>
          <WhitelistMintButton />
        </Fragment>
      ) : (
        <Fragment>
          <p>Not eligible for Whitelist</p>
        </Fragment>
      )}
    </Fragment>
  )
}

const PublicMintButton: FC = () => {
  const { wallet } = useWeb3()
  const { publicMintLimit } = useFlamingo()

  const mint = async (quantity: number) => {
    try {
      // TODO: modal and toast for txn success/failure
      const tx = await PinkFlamingoSocialClub.publicMint(quantity, wallet.signer)
      console.log(tx)
      await tx.wait()
      console.log(tx)
    } catch (err) {
      const e = err as Error
      console.log(e.message)
    }
  }
  return <MintSubmit mint={mint} max={publicMintLimit} />
}

const WhitelistMintButton: FC = () => {
  const { wallet } = useWeb3()
  const { minter, whitelistMintLimit, whitelistProof } = useFlamingo()
  const mint = async (quantity: number) => {
    try {
      // TODO: modal and toast for txn success/failure
      const tx = await PinkFlamingoSocialClub.whitelistMint(whitelistProof, quantity, wallet.signer)
      console.log(tx)
      await tx.wait()
      console.log(tx)
    } catch (err) {
      const e = err as Error
      console.log(e.message)
    }
  }
  return <MintSubmit mint={mint} max={minter ? whitelistMintLimit - minter.whitelistMints : whitelistMintLimit} />
}

const MintProgress: FC = () => {
  // TODO: maybe notifcation on completion
  const { totalSupply, publicPrice, isWhitelistOnly, whitelistPrice } = useFlamingo()
  return (
    <Fragment>
      <div className={styles.progress}>
        <div>{totalSupply}</div>
        <div>
          <span>/</span>
        </div>
        <div>{MINT_LEN}</div>
      </div>
      <div className={styles.price}>
        {isWhitelistOnly ? <p>Whitelist {whitelistPrice} ETH</p> : <p>Public {publicPrice} ETH</p>}
      </div>
    </Fragment>
  )
}

interface IMintSubmit {
  mint: (quantity: number) => Promise<void>
  max?: number
}

const MintSubmit: FC<IMintSubmit> = ({ mint, max }) => {
  //TODO: if availableSupply == zero, disable
  const { availableSupply } = useFlamingo()
  const [quantity, setQuanity] = useState<number>(1)
  const [error, setError] = useState<boolean>(false)

  const increment = () => {
    setError(false)
    if (max && quantity + 1 <= Math.min(...[availableSupply, max])) {
      setQuanity(quantity + 1)
    } else {
      setError(true)
    }
  }

  const decrement = () => {
    setError(false)
    if (quantity - 1 >= 1) {
      setQuanity(quantity - 1)
    }
  }

  return (
    <Fragment>
      <div className={styles.submit}>
        <div className={styles.mint}>
          <div className={styles.quantity}>
            <button onClick={() => increment()}>+</button>
            <button onClick={() => decrement()}>-</button>
          </div>
          <div className={styles.number}>{quantity}</div>
        </div>
        <button className={styles.button} onClick={() => mint(quantity)}>
          Mint
        </button>
      </div>
      <div className={styles.error}>{error && <p>Can't mint more than {quantity}!</p>}&nbsp;</div>
    </Fragment>
  )
}

export default Mint
