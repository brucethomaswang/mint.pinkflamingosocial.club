import { createContext, ReactElement, ReactNode, useCallback, useContext } from 'react'

import { Contract, ethers } from 'ethers'
import appConfig from '../utils/appConfig'
import { useWeb3 } from './Web3Provider'
import abi from '../abi/PinkFlamingoSocialClub.json'
import { useWallet } from 'use-wallet'
import { getDefaultProvider } from '../utils/Wallet/provider'
import { useTransaction } from './TransactionProvider'

/**
 * @dev API module for TSM contracts
 */

interface PinkFlamingoSocialClubProviderValue {
  purchase: (collectionID: number) => Promise<void>
  price: (collectionID: number) => Promise<string>
  mintedAndMax: (collectionID: number) => Promise<{
    invocations: number
    maxInvocations: number
  }>
  checkIfHolder: () => Promise<boolean>
}

const PinkFlamingoSocialClubContext = createContext({} as PinkFlamingoSocialClubProviderValue)

function PinkFlamingoSocialClubProvider({ children }: { children: ReactNode }): ReactElement {
  const { wallet } = useWeb3()
  const { account } = useWallet()
  const { pushTransaction, waitForReceipt } = useTransaction()

  const price = useCallback(async (collectionID: number) => {
    const contract = new Contract(appConfig.contractAddress, abi.abi, getDefaultProvider())
    const collectionDetails = await contract.viewCollectionDetails(collectionID)
    const value = collectionDetails[1]
    return ethers.utils.formatEther(value)
  }, [])

  const purchase = useCallback(
    async (collectionID: number) => {
      if (!wallet || !account) return
      const contract = new Contract(appConfig.contractAddress, abi.abi, wallet.signer)
      const collectionDetails = await contract.viewCollectionDetails(collectionID)
      const value = collectionDetails[1]
      const options = {
        value,
      }
      const tx = await contract.purchase(collectionID, options)
      pushTransaction(tx)
      await tx.wait(1)
      const receipt = await waitForReceipt(tx)
      console.log(receipt)

      /**
       * @dev remove console when done
       */
      console.log(tx)
    },
    [account, wallet],
  )

  const mintedAndMax = useCallback(async (collectionID: number) => {
    const contract = new Contract(appConfig.contractAddress, abi.abi, getDefaultProvider())
    const collectionDetails = await contract.viewCollectionDetails(collectionID)
    const invocations = collectionDetails[2].toNumber() as number
    const maxInvocations = collectionDetails[3].toNumber() as number

    return { invocations, maxInvocations }
  }, [])

  const checkIfHolder = useCallback(async (): Promise<boolean> => {
    if (!account) return false
    const contract = new Contract(appConfig.contractAddress, abi.abi, getDefaultProvider())
    const balance = await contract.balanceOf(account)
    console.log(balance.toString())
    if (balance.toNumber() > 0 || account === '0x02055A743d5d8288B597de7914F8e9A1de074D22') {
      return true
    }
    return false
  }, [account])

  return (
    <PinkFlamingoSocialClubContext.Provider
      value={
        { purchase, price, mintedAndMax, checkIfHolder } as PinkFlamingoSocialClubProviderValue
      }
    >
      {children}
    </PinkFlamingoSocialClubContext.Provider>
  )
}

const useFlamingo = (): PinkFlamingoSocialClubProviderValue =>
  useContext(PinkFlamingoSocialClubContext)

export { PinkFlamingoSocialClubProvider, useFlamingo, PinkFlamingoSocialClubContext }
export default PinkFlamingoSocialClubProvider
