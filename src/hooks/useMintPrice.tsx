import { BigNumber } from 'ethers'
import { formatEther } from 'ethers/lib/utils'
import { useMemo, useEffect, useRef, useState } from 'react'

import { PinkFlamingoSocialClub } from 'services/index'
import useLocalStorage from './useLocalStorage'

const zero = BigNumber.from(0)

export default function useMintPrice() {
  const called = useRef(false)
  const [whitelistPriceEth, setWhitelistPriceEth] = useLocalStorage<string>('whitelistPrice', '0.08')
  const [publicPriceEth, setPublicPriceEth] = useLocalStorage<string>('publicPrice', '0.1')
  const [whitelistPriceWei, setWhitelistPriceWei] = useState<BigNumber>(zero)
  const [publicPriceWei, setPublicPriceWei] = useState<BigNumber>(zero)

  useEffect(() => {
    if (called.current) return
    ;(async () => {
      const whitelistWei = await PinkFlamingoSocialClub.whitelistPriceInWei()
      const publicWei = await PinkFlamingoSocialClub.publicPriceInWei()
      setPublicPriceWei(publicWei)
      setWhitelistPriceWei(whitelistWei)
      setPublicPriceEth(formatEther(publicWei))
      setWhitelistPriceEth(formatEther(whitelistWei))
      called.current = true
    })()
  }, [])

  return useMemo(
    () => ({ whitelistPriceEth, publicPriceEth, whitelistPriceWei, publicPriceWei }),
    [whitelistPriceEth, publicPriceEth, whitelistPriceWei, publicPriceWei]
  )
}
