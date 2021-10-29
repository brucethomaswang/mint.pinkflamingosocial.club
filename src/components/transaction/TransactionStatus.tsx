import { Fixed } from './TransactionStatusStyles'
import TransactionStatusRow from './TransactionStatusRow'
import { TransactionResponse, useTransaction } from '../../providers/TransactionProvider'
import { InfoMessage, useInfoMessage } from '../../providers/InfoMessageProvider'
import InfoMessageRow from './InfoMessageRow'

const TransactionStatus = () => {
  const { txQueue, receiptQueue } = useTransaction()
  const { messageQueue } = useInfoMessage()

  return (
    <Fixed>
      {txQueue &&
        txQueue.map((txResponse: TransactionResponse) => {
          const receipts = receiptQueue.filter((receipt) => receipt.hash === txResponse.hash)
          const receipt = receipts.length ? receipts[0] : undefined
          return <TransactionStatusRow txResponse={txResponse} txReceipt={receipt} />
        })}
      {messageQueue &&
        messageQueue.map((infoMessage: InfoMessage) => {
          return <InfoMessageRow message={infoMessage.message} />
        })}
    </Fixed>
  )
}

export default TransactionStatus
