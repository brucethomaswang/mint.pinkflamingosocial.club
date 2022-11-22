export const nodeUri = import.meta.env.NODE_URI || 'http://localhost:7545'
export const etherAddress = '0x0000000000000000000000000000000000000000' //ETH

const configurations: { [env: string]: Configuration } = {
  development: {
    chainId: 4002,
    contractAddress: '0x365303e68551a5511bbec8dcff9f43603a469517',
    defaultProvider: `https://rpc.testnet.fantom.network/`,
    etherscanUrl: 'https://testnet.ftmscan.com/',
    refreshInterval: 10000,
    gasLimitMultiplier: 1.1
  },
  production: {
    chainId: 43114,
    contractAddress: '0x5775e01002f76ac0f1c3ec516d6c849b23d4a37b',
    defaultProvider: `https://api.avax.network/ext/bc/C/rpc`,
    etherscanUrl: 'https://snowtrace.io/',
    refreshInterval: 10000,
    gasLimitMultiplier: 1.1
  }
}

export default configurations['production']
//export default configurations['development']

export type Configuration = {
  chainId: number
  etherscanUrl: string
  contractAddress: string
  defaultProvider: string
  config?: EthereumConfig
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
