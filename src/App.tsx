import { FC } from 'react'

import { MetaMaskProvider } from 'metamask-react'
import Home from 'pages/home'
import Web3Provider from 'providers/Web3Provider'
import PinkFlamingoSocialClubProvider from 'providers/PinkFlamingoSocialClubProvider'

const App: FC = () => {
  return (
    <MetaMaskProvider>
      <Web3Provider>
        <PinkFlamingoSocialClubProvider>
          <Home />
        </PinkFlamingoSocialClubProvider>
      </Web3Provider>
    </MetaMaskProvider>
  )
}
export default App
