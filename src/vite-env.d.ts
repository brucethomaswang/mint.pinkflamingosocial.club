/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_RPC_PROVIDER: string
  readonly VITE_APP_WSS_PROVIDER: string
  readonly VITE_APP_CONTRACT_ADDRESS: string
  readonly VITE_APP_NETWORK: string
  readonly VITE_APP_MINT_LEN: number
  readonly VITE_APP_FALLBACK_PROVIDER: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

import { Web3Provider } from '@ethersproject/providers'

declare global {
  interface Window {
    ethereum?: Web3Provider
  }
}
