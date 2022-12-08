import { useCallback, useEffect, useMemo, useState, useRef } from 'react'

import { PinkFlamingoSocialClub, MerkleTree } from 'services/index'
import { listener } from 'services/PinkFlamingoSocialClub'

export default function useWhitelist(address?: string | null) {
  const called = useRef(false)
  const [isWhitelistOnly, setIsWhitelistOnly] = useState<boolean>(true)
  const [isWhitelisted, setIsWhitelisted] = useState<boolean>(false)
  const [whitelistProof, setWhitelistProof] = useState<string[]>([])

  const whitelistHandler = (on: boolean) => {
    console.info(`Whitelist ${on ? 'Only' : 'Disabled'}`)
    setIsWhitelistOnly(on)
  }

  useEffect(() => {
    if (called.current) return
    ;(async () => {
      setIsWhitelistOnly(await PinkFlamingoSocialClub.whitelistOnly())
      called.current = true
    })()
  }, [address])

  // TODO: maybe merge these ^
  useCallback(() => {
    if (address) {
      const proof = MerkleTree.getHexProof(address)
      setWhitelistProof(proof)
      setIsWhitelisted(proof.length > 0)
    }
  }, [address])

  useEffect(() => {
    listener.on('Whitelist', whitelistHandler)
    return () => {
      listener.off('Whitelist', whitelistHandler)
    }
  }, [])

  return useMemo(
    () => ({ whitelistProof, isWhitelistOnly, isWhitelisted }),
    [whitelistProof, isWhitelistOnly, isWhitelisted]
  )
}
