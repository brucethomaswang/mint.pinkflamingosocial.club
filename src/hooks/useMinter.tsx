import { useMemo, useRef, useState } from 'react'
import { useEffect } from 'react'

import { PinkFlamingoSocialClub } from 'services/index'
import { Minter } from 'services/PinkFlamingoSocialClub'

export default function useMinter(address: string | null) {
  const called = useRef(false)
  const [minter, setMinter] = useState<Minter | null>(null)

  useEffect(() => {
    if (called.current) {
      return
    }
    async function getMinter() {
      if (address) {
        setMinter(await PinkFlamingoSocialClub.minters(address))
        called.current = true
      }
    }
    getMinter()
  }, [address])

  return useMemo(() => ({ minter }), [minter])
}
