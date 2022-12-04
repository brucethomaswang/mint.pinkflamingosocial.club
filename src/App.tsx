import { FC } from 'react'
import { UseWalletProvider } from 'use-wallet'

import config from 'config'
import Home from 'pages/home'
import Web3Provider from 'providers/Web3Provider'
import PinkFlamingoSocialClubProvider from 'providers/PinkFlamingoSocialClubProvider'

const App: FC = () => {
  return (
    <UseWalletProvider
      connectors={{
        injected: { chainId: [config.chainId] }
      }}
    >
      <Web3Provider>
        <PinkFlamingoSocialClubProvider>
          <Home />
        </PinkFlamingoSocialClubProvider>
      </Web3Provider>
    </UseWalletProvider>
  )
}

export default App
