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
  purchase: () => Promise<void>
  price: () => Promise<string>
  mintedAndMax: () => Promise<{
    invocations: number
    maxInvocations: number
  }>
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

  const purchase = useCallback(async () => {
    if (!wallet || !account) return
    const contract = new Contract(appConfig.contractAddress, abi.abi, wallet.signer)

    const value = ethers.utils.parseEther('0.1')

    const options = {
      value,
    }
    const tx = await contract.mintFlamingo(options)
    pushTransaction(tx)
    await tx.wait(1)
    const receipt = await waitForReceipt(tx)
    console.log(receipt)

    /**
     * @dev remove console when done
     */
    console.log(tx)
  }, [account, wallet, pushTransaction, waitForReceipt])

  const mintedAndMax = useCallback(async (collectionID: number) => {
    const contract = new Contract(appConfig.contractAddress, abi.abi, getDefaultProvider())
    const invocations = (await contract.totalSupply()).toNumber() as number
    const maxInvocations = 777

    return { invocations, maxInvocations }
  }, [])

  return (
    <PinkFlamingoSocialClubContext.Provider
      value={{ purchase, price, mintedAndMax } as PinkFlamingoSocialClubProviderValue}
    >
      {children}
    </PinkFlamingoSocialClubContext.Provider>
  )
}

const useFlamingo = (): PinkFlamingoSocialClubProviderValue =>
  useContext(PinkFlamingoSocialClubContext)

export { PinkFlamingoSocialClubProvider, useFlamingo, PinkFlamingoSocialClubContext }
export default PinkFlamingoSocialClubProvider
