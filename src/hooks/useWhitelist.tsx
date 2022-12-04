import { useEffect, useMemo, useState } from 'react'

import { PinkFlamingoSocialClub, MerkleTree } from 'services'
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
      setWhitelistProof(MerkleTree.getHexProof(address))
    }
    // TODO: whitelist event
    // listener.on('Whitelist', (on: boolean) => {
    //   setIsWhitelistOnly(on)
    // })
    getWhitelistState()
    if (address && MerkleTree.isWhitelisted(address)) {
      setIsWhitelisted(true)
      getWhitelistProof(address)
    }
  }, [address, setWhitelistProof, setIsWhitelistOnly])

  return useMemo(
    () => ({ whitelistProof, isWhitelistOnly, isWhitelisted }),
    [whitelistProof, isWhitelistOnly, isWhitelisted]
  )
}
