import { useMemo, useEffect, useRef } from 'react'

import { PinkFlamingoSocialClub } from 'services/index'
import useLocalStorage from 'hooks/useLocalStorage'

export default function useMinter() {
  const called = useRef(false)
  const [publicMintLimit, setPublicMintLimit] = useLocalStorage<number>('publicMintLimit', 5)
  const [whitelistMintLimit, setWhitelistMintLimit] = useLocalStorage<number>('whitelistMintLimit', 3)

  useEffect(() => {
    if (called.current) return
    ;(async () => {
      setWhitelistMintLimit(await PinkFlamingoSocialClub.whitelistMintLimit())
      setPublicMintLimit(await PinkFlamingoSocialClub.publicMintLimit())
      called.current = true
    })()
  }, [])

  return useMemo(() => ({ publicMintLimit, whitelistMintLimit }), [publicMintLimit, whitelistMintLimit])
}
