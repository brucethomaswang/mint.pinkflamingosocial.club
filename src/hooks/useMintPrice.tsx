import { useMemo, useEffect, useRef } from 'react'

import { PinkFlamingoSocialClub } from 'services/index'
import useLocalStorage from './useLocalStorage'

export default function useMintPrice() {
  const called = useRef(false)
  const [whitelistPrice, setWhitelistPrice] = useLocalStorage<string>('whitelistPrice', '0.08')
  const [publicPrice, setPublicPrice] = useLocalStorage<string>('publicPrice', '0.1')

  useEffect(() => {
    if (called.current) {
      return
    }
    async function getPrices() {
      setWhitelistPrice(await PinkFlamingoSocialClub.publicPriceInEth())
      setPublicPrice(await PinkFlamingoSocialClub.whitelistPriceInEth())
      called.current = true
    }
    getPrices()
  }, [setWhitelistPrice, setPublicPrice])

  return useMemo(() => ({ whitelistPrice, publicPrice }), [whitelistPrice, publicPrice])
}
