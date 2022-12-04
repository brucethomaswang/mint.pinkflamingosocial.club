import { FC, Fragment, useState } from 'react'
import { useWallet } from 'use-wallet'

import Banner from 'assets/LETTER.png'
import { MINT_LEN } from 'config'
import { PinkFlamingoSocialClub } from 'services'
import { useFlamingo } from 'providers/PinkFlamingoSocialClubProvider'
import { useWeb3 } from 'providers/Web3Provider'
import styles from './mint.module.scss'

const Mint: FC = () => {
  const { account } = useWallet()
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
        {isPaused || isConcluded ? (
          <p className={styles.perspective}>Minting is {isConcluded ? 'Finished' : 'Paused'}</p>
        ) : (
          <Fragment>
            {account ? (
              <Fragment>{isWhitelistOnly ? <WhitelistMint /> : <PublicMintButton />}</Fragment>
            ) : (
              <p className={styles.perspective}>Please connect</p>
            )}
          </Fragment>
        )}
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
        <p>Not eligible for whitelist. Wait for public mint.</p>
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
  return <MintSubmit mint={mint} max={minter ? minter.whitelistMints - whitelistMintLimit : whitelistMintLimit} />
}

const MintProgress: FC = () => {
  // TODO: maybe notifcation on completion
  const { totalSupply } = useFlamingo()
  return (
    <Fragment>
      <div className={styles.progress}>
        <div>{totalSupply}</div>
        <div>
          <span>/</span>
        </div>
        <div>{MINT_LEN}</div>
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

  const increment = () => {
    if (max && quantity + 1 <= Math.min(...[availableSupply, max])) {
      setQuanity(quantity + 1)
    } else {
      // TODO: error message
      console.log('unable to mint more than requested!')
    }
  }

  const decrement = () => {
    if (quantity - 1 >= 1) {
      setQuanity(quantity - 1)
    }
  }

  return (
    <Fragment>
      <div className={styles.mint}>
        <div className={styles.quantity}>
          <button onClick={() => increment()}>+</button>
          <button onClick={() => decrement()}>-</button>
        </div>
        <div className={styles.number}>{quantity}</div>
        <button className={styles.button} onClick={() => mint(quantity)}>
          Mint
        </button>
      </div>
    </Fragment>
  )
}

export default Mint
