import React from 'react'
import { UseWalletProvider } from 'use-wallet'
import InfoMessageProvider from './providers/InfoMessageProvider'
import PinkFlamingoSocialClubProvider from './providers/PinkFlamingoSocialClubProvider'
import TransactionProvider from './providers/TransactionProvider'
import WalletButtonProvider from './providers/WalletButtonProvider'
import config from './utils/appConfig'
import Web3Provider from './providers/Web3Provider'
import WalletButton from './components/wallet/WalletButton'
import Home from './components/home/Home'

function App() {
  return (
    <Providers>
      <Home />
    </Providers>
  )
}

const Providers: React.FC = ({ children }) => {
  return (
    <UseWalletProvider chainId={config.chainId}>
      <Web3Provider>
        <TransactionProvider>
          <InfoMessageProvider>
            <PinkFlamingoSocialClubProvider>
              <WalletButtonProvider>{children}</WalletButtonProvider>
            </PinkFlamingoSocialClubProvider>
          </InfoMessageProvider>
        </TransactionProvider>
      </Web3Provider>
    </UseWalletProvider>
  )
}

export default App
