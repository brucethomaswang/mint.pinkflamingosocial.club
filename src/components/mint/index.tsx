import { FC, Fragment, useState } from 'react'
import { useMetaMask } from 'metamask-react'
import { toast } from 'react-toastify'

import Banner from 'assets/LETTER.png'
import config, { MINT_LEN } from 'config'
import { PinkFlamingoSocialClub } from 'services/index'
import { useFlamingo } from 'providers/PinkFlamingoSocialClubProvider'
import { useWeb3 } from 'providers/Web3Provider'
import styles from './mint.module.scss'

const Mint: FC = () => {
  const { account } = useMetaMask()
  const { isWhitelistOnly, isPaused, isConcluded, publicMintLimit } = useFlamingo()
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
                <Fragment>
                  {isWhitelistOnly ? <WhitelistMint /> : <MintSubmit route="public" max={publicMintLimit} />}
                </Fragment>
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
  const { isWhitelisted, minter, whitelistMintLimit } = useFlamingo()
  const whitelistMintRemaning = minter ? whitelistMintLimit - minter.whitelistMints : whitelistMintLimit
  return (
    <Fragment>
      {isWhitelisted && whitelistMintRemaning >= 1 ? (
        <Fragment>
          <MintSubmit route="whitelist" max={whitelistMintRemaning} />
        </Fragment>
      ) : (
        <div className={styles.notice}>
          {!isWhitelisted ? <p>Not eligible for Whitelist</p> : <p>You reached the Whitelist limit</p>}
        </div>
      )}
    </Fragment>
  )
}

const MintProgress: FC = () => {
  const { totalSupply, publicPriceEth, isWhitelistOnly, whitelistPriceEth } = useFlamingo()
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
        {isWhitelistOnly ? <p>Whitelist {whitelistPriceEth} ETH</p> : <p>Public {publicPriceEth} ETH</p>}
      </div>
    </Fragment>
  )
}

interface IMintSubmit {
  route: 'whitelist' | 'public'
  max?: number
}

const MintSubmit: FC<IMintSubmit> = ({ route, max }) => {
  //NOTE: if availableSupply == zero, disable
  const { wallet } = useWeb3()
  const { availableSupply, whitelistProof, publicPriceWei, whitelistPriceWei } = useFlamingo()
  const [quantity, setQuanity] = useState<number>(1)
  const [error, setError] = useState<boolean>(false)

  const mint = async (quantity: number) => {
    let tx
    const id = toast.loading('Submitting... ', {
      position: toast.POSITION.BOTTOM_RIGHT,
      theme: 'dark'
    })
    try {
      if (route === 'whitelist') {
        tx = await PinkFlamingoSocialClub.whitelistMint(whitelistProof, quantity, whitelistPriceWei, wallet.signer)
      } else {
        tx = await PinkFlamingoSocialClub.publicMint(quantity, publicPriceWei, wallet.signer)
      }
      toast.update(id, { render: 'Submitted', isLoading: false, autoClose: 100 })
      toast.success(
        <span>
          Submitted:&nbsp;
          <a className={styles.toast} target="_blank" href={`${config.etherscanUrl}tx/${tx.hash}`}>
            {tx.hash.replace(/(.{10})..+/, '$1…')}
          </a>
        </span>,
        {
          autoClose: false,
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: 'dark'
        }
      )
      await tx.wait()
    } catch (err) {
      console.log(err)
    }
  }

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
        <button
          className={styles.button}
          onClick={() => {
            mint(quantity)
            setQuanity(1)
          }}
        >
          Mint
        </button>
      </div>
      <div className={styles.error}>{error && <p>Can't mint more than {quantity}!</p>}&nbsp;</div>
    </Fragment>
  )
}

export default Mint
