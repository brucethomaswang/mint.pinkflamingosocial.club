import { useMemo, useRef, useEffect } from 'react'

import { PinkFlamingoSocialClub } from 'services/index'
import { listener } from 'services/PinkFlamingoSocialClub'
import useLocalStorage from 'hooks/useLocalStorage'
import { MINT_LEN } from 'config'
import { BigNumber } from 'ethers'
import { useDebouncedQuery } from './useDebouncedQuery'

export type ITotalSupply = {
  isConcluded: boolean
  totalSupply: number
  availableSupply: number
  isLoading: boolean
}

export default function useTotalSupply() {
  const [totalSupply, setTotalSupply] = useLocalStorage<number>('totalSupply', 0)

  const { refetch, isLoading } = useDebouncedQuery<BigNumber>(
    {
      queryKey: ['totalSupply'],
      queryFn: async (): Promise<BigNumber> => await PinkFlamingoSocialClub.totalSupply(),
      onSuccess: (data) => setTotalSupply(data.toNumber())
    },
    500
  )

  useEffect(() => {
    listener.on('Mint', refetch)
    return () => {
      listener.off('Mint', refetch)
    }
  }, [])

  const isConcluded = totalSupply >= MINT_LEN

  // TODO: availableSupply what about migrators?
  const availableSupply = Math.abs(MINT_LEN - totalSupply)

  return useMemo(
    () => ({ isConcluded, totalSupply, availableSupply, isLoading }),
    [isConcluded, totalSupply, availableSupply, isLoading]
  )
}
