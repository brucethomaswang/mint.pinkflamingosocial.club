import { BigNumber, Contract } from 'ethers'
import { formatEther } from 'ethers/lib/utils'

import config from 'config'
import PFSC from 'abi/PinkFlamingoSocialClub.json'
import { getWSSProvider, getDefaultProvider } from 'utils/provider'

export const contract = new Contract(config.contractAddress, PFSC, getDefaultProvider())
export const listener = new Contract(config.contractAddress, PFSC, getWSSProvider())

export type Minter = {
  publicMints: number
  whitelistMints: number
}

export const functions = {
  publicPriceInEth: async (): Promise<string> => formatEther(await contract.publicPriceInWei()),
  whitelistPriceInEth: async (): Promise<string> => formatEther(await contract.whitelistPriceInWei()),
  publicMintLimit: async (): Promise<number> => await contract.publicMintLimit(),
  whitelistMintLimit: async (): Promise<number> => await contract.whitelistMintLimit(),
  whitelistOnly: async (): Promise<boolean> => await contract.whitelistOnly(),
  totalSupply: async (): Promise<BigNumber> => await contract.totalSupply(),
  paused: async (): Promise<boolean> => await contract.paused(),
  minters: async (address: string): Promise<Minter> => await contract.minters(address),
  publicMint: async (quantity: number, signer: any) => {
    const contract = new Contract(config.contractAddress, PFSC, signer)
    return contract.publicMint(quantity, { value: String((await contract.publicPriceInWei()) * quantity) })
  },
  whitelistMint: async (proof: string[], quantity: number, signer: any) => {
    const contract = new Contract(config.contractAddress, PFSC, signer)
    return contract.whitelistMint(proof, quantity, { value: String((await contract.whitelistPriceInWei()) * quantity) })
  }
}
