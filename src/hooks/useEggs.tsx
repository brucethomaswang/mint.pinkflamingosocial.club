import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { MooarNFT } from 'services/index'

async function fetchEggsData(address: string) {
  const balance = (await MooarNFT.balanceOf(address)).toNumber()
  const isApproved = await MooarNFT.isApproved(address)

  const tokenIdsPromises = Array.from({ length: balance }, (_, i) =>
    MooarNFT.tokenOfOwnerByIndex(address, i).then((tokenId) => tokenId.toNumber())
  )

  const tokenIds = await Promise.all(tokenIdsPromises)

  return { balance, tokenIds, isApproved }
}

export default function useEggs(address: string | null) {
  const { data, isError, isLoading } = useQuery(['eggs', address], () => fetchEggsData(address!), {
    enabled: !!address,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity
  })

  return useMemo(
    () => ({
      hasEggs: Boolean(data?.balance),
      balance: data?.balance,
      tokenIds: data?.tokenIds,
      isApproved: data?.isApproved,
      isError,
      isLoading
    }),
    [data, isError, isLoading]
  )
}
