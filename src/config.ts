export const etherAddress = '0x0000000000000000000000000000000000000000' // TODO: ??
export const contractAddress = import.meta.env.VITE_APP_CONTRACT_ADDRESS || ''
export const defaultProvider = import.meta.env.VITE_APP_RPC_PROVIDER
export const wssProvider = import.meta.env.VITE_APP_WSS_PROVIDER

export const NETWORK = import.meta.env.VITE_APP_NETWORK
export const MINT_LEN = import.meta.env.VITE_APP_MINT_LEN

export type Configuration = {
  name: string
  chainId: number
  etherscanUrl: string
  contractAddress: string
  defaultProvider: string
  wssProvider: string
  config: EthereumConfig
  pollingInterval?: number
  refreshInterval: number
  gasLimitMultiplier: number
}

export type EthereumConfig = {
  testing: boolean
  autoGasMultiplier: number
  defaultConfirmations: number
  defaultGas: string
  defaultGasPrice: string
  ethereumNodeTimeout: number
}

export const defaultEthereumConfig = {
  testing: false,
  autoGasMultiplier: 1.5,
  defaultConfirmations: 1,
  defaultGas: '6000000',
  defaultGasPrice: '1000000000000',
  ethereumNodeTimeout: 10000
}

const configurations: { [env: string]: Configuration } = {
  goreli: {
    name: 'goerli',
    chainId: 5,
    contractAddress,
    defaultProvider,
    wssProvider,
    etherscanUrl: 'https://goerli.etherscan.io/',
    refreshInterval: 10000,
    gasLimitMultiplier: 1.1,
    config: defaultEthereumConfig
  },
  ethereum: {
    name: 'homestead',
    chainId: 1,
    contractAddress,
    defaultProvider,
    wssProvider,
    etherscanUrl: 'https://etherscan.io/',
    refreshInterval: 10000,
    gasLimitMultiplier: 1.1,
    config: defaultEthereumConfig
  }
}

export default configurations[NETWORK]
