import { createContext, ReactElement, ReactNode, useContext, useMemo } from 'react'
import { useMetaMask } from 'metamask-react'

import { Minter } from 'services/PinkFlamingoSocialClub'

import useWhitelist from 'hooks/useWhitelist'
import useMintPrice from 'hooks/useMintPrice'
import useMintLimits from 'hooks/useMintLimits'
import useTotalSupply from 'hooks/useTotalSupply'
import useMinter from 'hooks/useMinter'
import usePaused from 'hooks/usePaused'
import { BigNumber } from 'ethers'

interface IPinkFlamingoSocialClub {
  minter: Minter | null
  isPaused: boolean
  isConcluded: boolean
  isWhitelisted: boolean
  isWhitelistOnly: boolean
  whitelistProof: string[]
  publicMintLimit: number
  whitelistMintLimit: number
  publicPriceWei: BigNumber
  whitelistPriceWei: BigNumber
  publicPriceEth: string
  whitelistPriceEth: string
  totalSupply: number
  availableSupply: number
}

const PinkFlamingoSocialClubContext = createContext<IPinkFlamingoSocialClub>({} as IPinkFlamingoSocialClub)

function PinkFlamingoSocialClubProvider({ children }: { children: ReactNode }): ReactElement {
  const { account } = useMetaMask()
  const { isWhitelistOnly, whitelistProof, isWhitelisted } = useWhitelist(account)
  const { minter } = useMinter(account)
  const { publicMintLimit, whitelistMintLimit } = useMintLimits()
  const { publicPriceWei, whitelistPriceWei, publicPriceEth, whitelistPriceEth } = useMintPrice()
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
      publicPriceWei,
      whitelistPriceWei,
      publicPriceEth,
      whitelistPriceEth,
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
      publicPriceWei,
      whitelistPriceWei,
      publicPriceEth,
      whitelistPriceEth,
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
