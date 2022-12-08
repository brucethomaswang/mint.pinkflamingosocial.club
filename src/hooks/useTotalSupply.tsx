import { useMemo, useRef, useEffect } from 'react'
import debounce from 'lodash.debounce'

import { PinkFlamingoSocialClub } from 'services/index'
import { listener } from 'services/PinkFlamingoSocialClub'
import useLocalStorage from 'hooks/useLocalStorage'
import { MINT_LEN } from 'config'

export default function useTotalSupply() {
  const called = useRef(false)
  const [totalSupply, setTotalSupply] = useLocalStorage<number>('totalSupply', 0)

  const totalSupplyHandler = debounce(async () => {
    console.log('called totalSupply')
    const totalSupply = await PinkFlamingoSocialClub.totalSupply()
    setTotalSupply(totalSupply.toNumber())
    called.current = true
  }, 500)

  useEffect(() => {
    if (called.current) return
    totalSupplyHandler()
    listener.on('Mint', totalSupplyHandler)
    return () => {
      listener.off('Mint', totalSupplyHandler)
    }
  }, [])

  const isConcluded = totalSupply >= MINT_LEN

  // TODO: availableSupply what about migrators?
  const availableSupply = Math.abs(MINT_LEN - totalSupply)

  return useMemo(() => ({ isConcluded, totalSupply, availableSupply }), [isConcluded, totalSupply, availableSupply])
}
