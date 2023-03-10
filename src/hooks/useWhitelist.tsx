import { useQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { PinkFlamingoSocialClub, MerkleTree } from 'services/index'
import { listener } from 'services/PinkFlamingoSocialClub'
import useLocalStorage from './useLocalStorage'

export type IWhitelist = {
  isWhitelistOnly: boolean
  isWhitelisted: boolean
  whitelistProof: string[]
  isLoading: boolean
}

export default function useWhitelist(address?: string | null) {
  const [isWhitelistOnly, setIsWhitelistOnly] = useLocalStorage<boolean>('isWhitelistOnly', true)
  const [whitelistProof, setWhitelistProof] = useState<string[]>([])

  const whitelistHandler = (on: boolean) => {
    console.info(`Whitelist ${on ? 'Only' : 'Disabled'}`)
    setIsWhitelistOnly(on)
  }

  const { isLoading } = useQuery<boolean>({
    queryKey: ['isWhitelistOnly'],
    queryFn: async (): Promise<boolean> => await PinkFlamingoSocialClub.whitelistOnly(),
    onSuccess: (data: boolean) => setIsWhitelistOnly(data)
  })

  useEffect(() => {
    listener.on('Whitelist', whitelistHandler)
    return (): void => {
      listener.off('Whitelist', whitelistHandler)
    }
  }, [])

  useCallback(() => {
    if (address) {
      const proof = MerkleTree.getHexProof(address)
      setWhitelistProof(proof)
    }
  }, [address])

  const isWhitelisted = Boolean(whitelistProof.length > 0)

  return useMemo(
    (): IWhitelist => ({ whitelistProof, isWhitelistOnly, isWhitelisted, isLoading }),
    [whitelistProof, isWhitelistOnly, isWhitelisted, isLoading]
  )
}
