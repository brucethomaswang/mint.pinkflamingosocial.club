import { createContext, ReactElement, ReactNode, useContext, useMemo } from 'react'
import { useMetamask } from 'use-metamask'

import { Minter } from 'services/PinkFlamingoSocialClub'

import useWhitelist from 'hooks/useWhitelist'
import useMintPrice from 'hooks/useMintPrice'
import useMintLimits from 'hooks/useMintLimits'
import useTotalSupply from 'hooks/useTotalSupply'
import useMinter from 'hooks/useMinter'
import usePaused from 'hooks/usePaused'

interface IPinkFlamingoSocialClub {
  minter: Minter | null
  isPaused: boolean
  isConcluded: boolean
  isWhitelisted: boolean
  isWhitelistOnly: boolean
  whitelistProof: string[]
  publicMintLimit: number
  whitelistMintLimit: number
  publicPrice: string
  whitelistPrice: string
  totalSupply: number
  availableSupply: number
}

const PinkFlamingoSocialClubContext = createContext<IPinkFlamingoSocialClub>({} as IPinkFlamingoSocialClub)

function PinkFlamingoSocialClubProvider({ children }: { children: ReactNode }): ReactElement {
  const { metaState } = useMetamask()
  const { isWhitelistOnly, whitelistProof, isWhitelisted } = useWhitelist(metaState.account[0])
  const { minter } = useMinter(metaState.account[0])
  const { publicMintLimit, whitelistMintLimit } = useMintLimits()
  const { publicPrice, whitelistPrice } = useMintPrice()
  const { isPaused } = usePaused()
  const { totalSupply, isConcluded, availableSupply } = useTotalSupply()

  const memodFlamingo = useMemo(
    () => ({
      minter,
      isPaused,
      isConcluded,
      isWhitelisted,
      isWhitelistOnly,
      whitelistProof,
      publicMintLimit,
      whitelistMintLimit,
      publicPrice,
      whitelistPrice,
      totalSupply,
      availableSupply
    }),
    [
      minter,
      isPaused,
      isConcluded,
      isWhitelisted,
      isWhitelistOnly,
      whitelistProof,
      publicMintLimit,
      whitelistMintLimit,
      publicPrice,
      whitelistPrice,
      totalSupply,
      availableSupply
    ]
  )

  return (
    <PinkFlamingoSocialClubContext.Provider value={memodFlamingo}>{children}</PinkFlamingoSocialClubContext.Provider>
  )
}

const useFlamingo = (): IPinkFlamingoSocialClub => useContext(PinkFlamingoSocialClubContext)

export { PinkFlamingoSocialClubProvider, useFlamingo, PinkFlamingoSocialClubContext }
export default PinkFlamingoSocialClubProvider
