import { FC } from 'react'
// import { UseWalletProvider } from 'use-wallet'

import config from 'config'
import { MetaMaskProvider } from 'metamask-react'
import Home from 'pages/home'
// import Web3Provider from 'providers/Web3Provider'
import PinkFlamingoSocialClubProvider from 'providers/PinkFlamingoSocialClubProvider'

const App: FC = () => {
  return (
    <MetaMaskProvider>
      <PinkFlamingoSocialClubProvider>
        <Home />
      </PinkFlamingoSocialClubProvider>
    </MetaMaskProvider>
  )
}
export default App
