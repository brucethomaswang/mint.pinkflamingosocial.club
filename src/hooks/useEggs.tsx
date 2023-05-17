import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { MooarNFT } from 'services/index'

async function fetchEggsData(address: string) {
  const balance = (await MooarNFT.balanceOf(address)).toNumber()

  const tokenIdsPromises = Array.from({ length: balance }, (_, i) =>
    MooarNFT.tokenOfOwnerByIndex(address, i).then((tokenId) => tokenId.toNumber())
  )

  const tokenIds = await Promise.all(tokenIdsPromises)

  return { balance, tokenIds }
}

export default function useEggs(address: string | null) {
  const eggData = useQuery(['eggs', address], () => fetchEggsData(address!), {
    enabled: !!address,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity
  })

  const approvalData = useQuery(
    ['approval', address],
    async () => await MooarNFT.isApproved(address),
    {
      enabled: !!address,
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity
    }
  )

  const hasEggs = eggData.data && Boolean(eggData.data.balance)
  const isApproved = approvalData.data

  return useMemo(
    () => ({
      hasEggs,
      isApproved,
      balance: eggData.data && eggData?.data.balance,
      tokenIds: eggData.data && eggData?.data.tokenIds,
      eggData,
      approvalData
    }),
    [eggData, approvalData]
  )
}
