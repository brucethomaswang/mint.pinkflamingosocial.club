import { BigNumber } from 'ethers'
import { formatEther } from 'ethers/lib/utils'
import { useMemo, useEffect, useRef, useState } from 'react'

import { PinkFlamingoSocialClub } from 'services/index'
import useLocalStorage from './useLocalStorage'

export default function useMintPrice() {
  const called = useRef(false)
  const [whitelistPriceEth, setWhitelistPriceEth] = useLocalStorage<string>('whitelistPrice', '0.08')
  const [publicPriceEth, setPublicPriceEth] = useLocalStorage<string>('publicPrice', '0.1')
  const [whitelistPriceWei, setWhitelistPriceWei] = useState<BigNumber>(BigNumber.from(0))
  const [publicPriceWei, setPublicPriceWei] = useState<BigNumber>(BigNumber.from(0))

  useEffect(() => {
    if (called.current) return
    ;(async () => {
      console.log('called useMintPrice')
      const whitelistWei = await PinkFlamingoSocialClub.whitelistPriceInWei()
      const publicWei = await PinkFlamingoSocialClub.publicPriceInWei()
      setPublicPriceWei(publicWei)
      setWhitelistPriceWei(whitelistPriceWei)
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
