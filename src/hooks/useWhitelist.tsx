import { useEffect, useMemo, useState } from 'react'

import { PinkFlamingoSocialClub, MerkleTree } from 'services/index'
import { listener } from 'services/PinkFlamingoSocialClub'

export default function useWhitelist(address?: string | null) {
  const [isWhitelistOnly, setIsWhitelistOnly] = useState<boolean>(true)
  const [isWhitelisted, setIsWhitelisted] = useState<boolean>(false)
  const [whitelistProof, setWhitelistProof] = useState<string[]>([])

  useEffect(() => {
    async function getWhitelistState() {
      setIsWhitelistOnly(await PinkFlamingoSocialClub.whitelistOnly())
    }
    async function getWhitelistProof(address: string) {
      const proof = MerkleTree.getHexProof(address)
      setWhitelistProof(proof)
      setIsWhitelisted(proof.length > 0)
    }
    listener.on('Whitelist', (on: boolean) => {
      console.info(`Whitelist ${on ? 'Only' : 'Disabled'}`)
      setIsWhitelistOnly(on)
    })
    getWhitelistState()
    if (address) {
      getWhitelistProof(address)
    }
  }, [address, setWhitelistProof, setIsWhitelistOnly])

  return useMemo(
    () => ({ whitelistProof, isWhitelistOnly, isWhitelisted }),
    [whitelistProof, isWhitelistOnly, isWhitelisted]
  )
}
