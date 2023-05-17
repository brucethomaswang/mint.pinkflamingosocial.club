import { BigNumber, Contract, utils } from 'ethers'

import config from 'config'
import INCUBATOR from 'abi/FlamingoIncubator.json'
import { getDefaultProvider } from 'utils/provider'

export const contract = new Contract(config.incubatorAddress, INCUBATOR, getDefaultProvider())

export const functions = {
  fee: async () => await contract.fee(),
  incubate: async (tokens: number[], signer: any) => {
    const fee = BigNumber.from('5500000000000000')
    const contract = new Contract(config.incubatorAddress, INCUBATOR, signer)
    const feeInWei = fee.mul(tokens.length)
    return contract.incubate(tokens, {
      value: feeInWei
    })
  }
}
