import { useMemo, useRef, useEffect } from 'react'

import { PinkFlamingoSocialClub } from 'services/index'
import { listener } from 'services/PinkFlamingoSocialClub'
import useLocalStorage from 'hooks/useLocalStorage'
import { MINT_LEN } from 'config'

export default function useTotalSupply() {
  const called = useRef(false)
  const [totalSupply, setTotalSupply] = useLocalStorage<number>('totalSupply', 0)

  useEffect(() => {
    if (called.current) {
      return
    }
    async function getTotalSupply() {
      const totalSupply = await PinkFlamingoSocialClub.totalSupply()
      setTotalSupply(totalSupply.toNumber())
      called.current = true
    }
    listener.on('Mint', () => {
      // TODO: maybe throttle
      getTotalSupply()
    })
    getTotalSupply()
  }, [setTotalSupply])

  const isConcluded = totalSupply >= MINT_LEN
  const availableSupply = totalSupply - MINT_LEN

  return useMemo(() => ({ isConcluded, totalSupply, availableSupply }), [isConcluded, totalSupply, availableSupply])
}
