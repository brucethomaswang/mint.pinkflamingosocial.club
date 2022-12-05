import MerkleTree from 'merkletreejs'
import { keccak256 } from 'ethers/lib/utils'
import WHITELIST from 'whitelist/addresses.json'

const leaves = WHITELIST.map((addr) => keccak256(addr))

export const tree = new MerkleTree(leaves, keccak256, { sortPairs: true })
export const root = tree.getHexRoot()

export const functions = {
  isWhitelisted: (address: string) => WHITELIST.includes(address),
  getHexProof: (address: string) => tree.getHexProof(keccak256(address))
}
