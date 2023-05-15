import { BigNumber, Contract } from 'ethers'

import config from 'config'
import MOOAR from 'abi/MooarNFT.json'
import { getDefaultProvider } from 'utils/provider'

export const contract = new Contract(config.eggAddress, MOOAR, getDefaultProvider())

export const functions = {
  balanceOf: async (address: String | null): Promise<BigNumber> =>
    await contract.balanceOf(address),
  tokenOfOwnerByIndex: async (address: String | null, index: number): Promise<BigNumber> => {
    const response = await contract.tokenOfOwnerByIndex(address, BigNumber.from(index))
    return response
  },
  isApproved: async (address: String | null): Promise<boolean> => {
    return await contract.isApprovedForAll(address, config.incubatorAddress)
  },
  setApprovalForAll: async (signer: any): Promise<any> => {
    const contract = new Contract(config.incubatorAddress, MOOAR, signer)
    return await contract.setApprovalForAll(config.incubatorAddress, true)
  }
}
