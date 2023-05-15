import { FC } from 'react'
import { MetaMaskProvider } from 'metamask-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'

import Home from 'pages/home'
import Web3Provider from 'providers/Web3Provider'
import PinkFlamingoSocialClubProvider from 'providers/PinkFlamingoSocialClubProvider'

const queryClient = new QueryClient()

const App: FC = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <MetaMaskProvider>
          <Web3Provider>
            <PinkFlamingoSocialClubProvider>
              <Home />
            </PinkFlamingoSocialClubProvider>
          </Web3Provider>
        </MetaMaskProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}
export default App
