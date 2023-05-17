import { FC, Fragment, useState } from 'react'
import { useMetaMask } from 'metamask-react'
import { toast } from 'react-toastify'
import ClipLoader from 'react-spinners/ClipLoader'

import Banner from 'assets/INCUBATOR.png'
import Heading from 'assets/EGGS.png'

import config from 'config'
import styles from './incubate.module.scss'
import useEggs from 'hooks/useEggs'
import { FlamingoIncubator, MooarNFT } from 'services/index'
import { useWeb3 } from 'providers/Web3Provider'

const Mint: FC = () => {
  const { account } = useMetaMask()
  const { hasEggs, eggData } = useEggs(account)
  return (
    <div className={styles.wrapper}>
      <div className={styles.banner}>
        <img src={Banner} alt="Pink Flamingo Social Club" />
      </div>
      <div className={styles.center}>
        <img src={Heading} alt="Hatch you eggs" />
      </div>
      <div className={styles.bottom}>
        <Fragment>
          {account ? (
            <Fragment>
              {eggData.isLoading ? (
                <div>
                  <ClipLoader color="white" size={50} loading /> <br />
                  Counting your eggs
                </div>
              ) : (
                <Fragment>
                  {hasEggs ? <IncubateSubmit /> : <div>You don't have any Eggs!</div>}
                </Fragment>
              )}
            </Fragment>
          ) : (
            <p>Please Connect</p>
          )}
        </Fragment>
      </div>
    </div>
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

interface IIncubateSubmit {}

const IncubateSubmit: FC<IIncubateSubmit> = () => {
  const { account } = useMetaMask()
  const { wallet } = useWeb3()
  const { balance, tokenIds, isApproved, approvalData, eggData } = useEggs(account)

  const approve = async () => {
    const transaction = await toast.promise(MooarNFT.setApprovalForAll(wallet.signer), {
      pending: 'Approving...',
      success: 'Approved!',
      error: {
        render({ data }) {
          return <ErrorToast data={data as IProviderRpcError} />
        }
      }
    })

    await toast.promise(transaction.wait, {
      pending: 'Waiting...',
      success: 'Incubator Approved',
      error: 'Transaction Reverted'
    })

    await approvalData.refetch()
  }

  const incubate = async () => {
    if (tokenIds) {
      const transaction = await toast.promise(FlamingoIncubator.incubate(tokenIds, wallet.signer), {
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

      await toast.promise(transaction.wait, {
        pending: 'Waiting...',
        success: 'Incubation Complete 🧪',
        error: 'Transaction Reverted'
      })

      await eggData.refetch()
    }
  }

  return (
    <Fragment>
      <div className={styles.submit}>
        <div className={styles.incubate}>
          <div className={styles.number}>{balance}</div>
        </div>
        <button className={styles.button} onClick={() => (isApproved ? incubate() : approve())}>
          {isApproved ? 'Incubate' : 'Approve'}
        </button>
      </div>
    </Fragment>
  )
}

export default Mint
