import MerkleTree from 'merkletreejs'
import { keccak256 } from 'ethers/lib/utils'

const whitelist = [
  '0x66aB6D9362d4F35596279692F0251Db635165871',
  '0x81317c7B98c4186640dc0EFf71474CF0bd1aAf36',
  '0x0063046686E46Dc6F15918b61AE2B121458534a5',
  '0x21b42413bA931038f35e7A5224FaDb065d297Ba3',
  '0x46C0a5326E643E4f71D3149d50B48216e174Ae84',
  '0x807c47A89F720fe4Ee9b8343c286Fc886f43191b'
]

// TODO: best way to include whitelist array
let leaves
let tree: MerkleTree
let root

try {
  leaves = whitelist.map((addr) => keccak256(addr))
  tree = new MerkleTree(leaves, keccak256, { sortPairs: true })
  root = tree.getHexRoot()
} catch (err) {
  console.error('Error using merkletree')
}

export const functions = {
  isWhitelisted: (address: string) => whitelist.includes(address),
  getHexProof: (address: string) => tree.getHexProof(keccak256(address))
}
