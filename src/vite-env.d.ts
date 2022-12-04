/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_RPC_PROVIDER: string
  readonly VITE_APP_WSS_PROVIDER: string
  readonly VITE_APP_CONTRACT_ADDRESS: string
  readonly VITE_APP_NETWORK: string
  readonly VITE_APP_MINT_LEN: number
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
