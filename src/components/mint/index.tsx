import { FC, Fragment, useState } from 'react'
import { useMetaMask } from 'metamask-react'
import { toast } from 'react-toastify'
import ClipLoader from 'react-spinners/ClipLoader'

import Banner from 'assets/LETTER.png'
import config, { MINT_LEN } from 'config'
import { PinkFlamingoSocialClub } from 'services/index'
import { useFlamingo } from 'providers/PinkFlamingoSocialClubProvider'
import { useWeb3 } from 'providers/Web3Provider'
import styles from './mint.module.scss'

const Mint: FC = () => {
  const { account } = useMetaMask()
  const { whitelist, isPaused, isConcluded, publicMintLimit } = useFlamingo()
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
                  {whitelist.isLoading ? (
                    <ClipLoader color="white" size={50} loading />
                  ) : (
                    <Fragment>
                      {whitelist.isWhitelistOnly ? (
                        <WhitelistMint />
                      ) : (
                        <MintSubmit route="public" max={publicMintLimit} />
                      )}
                    </Fragment>
                  )}
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
  const { whitelist, minter, whitelistMintLimit } = useFlamingo()
  const whitelistMintRemaning = minter ? whitelistMintLimit - minter.whitelistMints : whitelistMintLimit
  return (
    <Fragment>
      {whitelist.isWhitelisted && whitelistMintRemaning >= 1 ? (
        <Fragment>
          <MintSubmit route="whitelist" max={whitelistMintRemaning} />
        </Fragment>
      ) : (
        <div className={styles.notice}>
          {!whitelist.isWhitelisted ? <p>Not eligible for Whitelist</p> : <p>You reached the Whitelist limit</p>}
        </div>
      )}
    </Fragment>
  )
}

const MintProgress: FC = () => {
  const { totalSupply, publicPriceEth, whitelist, whitelistPriceEth } = useFlamingo()
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
        {!whitelist.isLoading && (
          <Fragment>
            {whitelist.isWhitelistOnly ? <p>Whitelist {whitelistPriceEth} ETH</p> : <p>Public {publicPriceEth} ETH</p>}
          </Fragment>
        )}
      </div>
    </Fragment>
  )
}

interface IProviderRpcSuccess {
  hash: string
}

const SuccessToast: FC<{ data: IProviderRpcSuccess }> = ({ data }: { data: any }) => {
  return (
    <span>
      Submitted:&nbsp;
      <a className={styles.toast} target="_blank" href={`${config.etherscanUrl}tx/${data.hash}`}>
        {data.hash.replace(/(.{10})..+/, '$1…')}
      </a>
    </span>
  )
}

interface IProviderRpcError extends Error {
  message: string
  code: number
  data?: unknown
}

const ErrorToast: FC<{ data: IProviderRpcError }> = ({ data }: { data: IProviderRpcError }) => {
  return <span>Failed:&nbsp;{data.code}</span>
}

interface IMintSubmit {
  route: 'whitelist' | 'public'
  max?: number
}

const MintSubmit: FC<IMintSubmit> = ({ route, max }) => {
  //NOTE: if availableSupply == zero, disable
  const { wallet } = useWeb3()
  const { availableSupply, whitelist, publicPriceWei, whitelistPriceWei } = useFlamingo()
  const [quantity, setQuanity] = useState<number>(1)
  const [error, setError] = useState<boolean>(false)

  const mintedOut = availableSupply === 0
  const retrievingPrice = publicPriceWei.toString() == '0'

  const mint = async (quantity: number) => {
    const submission =
      route === 'whitelist'
        ? PinkFlamingoSocialClub.whitelistMint(whitelist.whitelistProof, quantity, whitelistPriceWei, wallet.signer)
        : PinkFlamingoSocialClub.publicMint(quantity, publicPriceWei, wallet.signer)

    const transaction = await toast.promise(submission, {
      pending: 'Submitting...',
      success: {
        render({ data }) {
          return <SuccessToast data={data as IProviderRpcSuccess} />
        },
        autoClose: 30000
      },
      error: {
        render({ data }) {
          return <ErrorToast data={data as IProviderRpcError} />
        }
      }
    })

    toast.promise(transaction.wait, {
      pending: 'Waiting...',
      success: 'Flamingo Minted 👌',
      error: 'Transaction Reverted'
    })
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
          disabled={mintedOut || retrievingPrice}
          className={styles.button}
          onClick={() => {
            mint(quantity)
            if (quantity > 1) {
              setQuanity(1)
            }
          }}
        >
          {mintedOut ? 'Finished' : 'Mint'}
        </button>
      </div>
      <div className={styles.error}>
        {error && <p>No more than {quantity}!</p>}
        &nbsp;
      </div>
    </Fragment>
  )
}

export default Mint
