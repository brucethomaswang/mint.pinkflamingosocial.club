import React, {
  createContext,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useWallet } from 'use-wallet'

export interface TransactionResponse {
  hash: string
  from: string
  chainId: number
  nonce: number
  wait: () => Promise<any>
}

export interface TransactionReceipt {
  hash: string
  receipt?: any
  error?: string
}

interface TransactionProviderValue {
  txQueue: TransactionResponse[]
  receiptQueue: TransactionReceipt[]
  pushTransaction: (txResponse: TransactionResponse) => TransactionResponse
  waitForReceipt: (txQueueItem: TransactionResponse) => Promise<TransactionReceipt>
}

const TransactionContext = createContext({} as TransactionProviderValue)

function TransactionProvider({ children }: { children: ReactNode }): ReactElement {
  const { account } = useWallet()
  const [txQueue, setTxQueue] = useState<TransactionResponse[]>([])
  const [receiptQueue, setReceiptQueue] = useState<TransactionReceipt[]>([])

  const waitForReceipt = useCallback(async (txQueueItem: TransactionResponse) => {
    const txReceipt: TransactionReceipt = {
      hash: txQueueItem.hash,
    }
    try {
      const receipt = await txQueueItem.wait()
      console.log('receipt', receipt)
      txReceipt.receipt = receipt
    } catch (e) {
      console.error('error', e)
      //@ts-ignore
      txReceipt.error = e.message
    }
    receiptQueue.push(txReceipt)
    setReceiptQueue([...receiptQueue])
    return txReceipt
  }, [receiptQueue])

  const pushTransaction = useCallback(
    (txResponse: TransactionResponse) => {
      if (txResponse) {
        console.log('pushing Transaction')
        txQueue.push(txResponse)
        setTxQueue([...txQueue])
      }
      return txResponse
    },
    [txQueue, setTxQueue],
  )

  useEffect(() => {
    console.log('update')
    if (!txQueue.length) return
    const queueIndex = txQueue.length - 1
    waitForReceipt(txQueue[queueIndex])
  }, [account, txQueue, setTxQueue, waitForReceipt])

  return (
    <TransactionContext.Provider
      value={
        {
          txQueue,
          receiptQueue,
          pushTransaction,
          waitForReceipt,
        } as TransactionProviderValue
      }
    >
      {children}
    </TransactionContext.Provider>
  )
}

const useTransaction = (): TransactionProviderValue => useContext(TransactionContext)

export { TransactionProvider, useTransaction, TransactionContext }
export default TransactionProvider
