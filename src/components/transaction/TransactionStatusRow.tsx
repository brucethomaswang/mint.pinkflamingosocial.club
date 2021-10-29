import React, { ReactElement, useState } from 'react'
import styles from './Status.module.scss'
import { TransactionReceipt, TransactionResponse } from '../../providers/TransactionProvider'
import {
  CloseModalButton,
  FloatingNotification,
  Message,
  Pending,
  Success,
  Error,
} from './TransactionStatusStyles'
import appConfig from '../../utils/appConfig'

interface TransactionStatusRowProps {
  txResponse: TransactionResponse
  txReceipt?: TransactionReceipt
}

const TransactionStatusRow = ({ txResponse, txReceipt }: TransactionStatusRowProps) => {
  let element: ReactElement = <Error>Errir</Error>
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const txText = `TX: ${txResponse.hash.substr(0, 10)}...`

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }
  if (!isOpen) return null

  const sleep = async (ms: number) => {
    await new Promise((resolve) => setTimeout(resolve, ms))
    setIsOpen(false)
  }

  if (txReceipt) {
    if (txReceipt.receipt) {
      element = <Success>{txText}: SUCCESS</Success>
      sleep(500)
    }
    if (txReceipt.error) {
      element = <Error>{txText}: ERROR</Error>
    }
  } else {
    element = <Pending>{txText}: PENDING</Pending>
  }

  return (
    <FloatingNotification>
      <Message>
        <a
          href={`${appConfig.etherscanUrl}${txResponse.hash}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          {element}
        </a>
      </Message>
      <CloseModalButton onClick={handleToggle}>X</CloseModalButton>
    </FloatingNotification>
  )
}

export default TransactionStatusRow
