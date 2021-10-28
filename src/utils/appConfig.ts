export const nodeUri = process.env.NODE_URI || 'http://localhost:7545'
export const etherAddress = '0x0000000000000000000000000000000000000000' //ETH

const configurations: { [env: string]: Configuration } = {
  development: {
    chainId: 4002,
    contractAddress: '0x365303E68551A5511Bbec8dcfF9F43603a469517',
    defaultProvider: `https://rpc.testnet.fantom.network/`,
    etherscanUrl: 'https://testnet.ftmscan.com/',
    refreshInterval: 10000,
    gasLimitMultiplier: 1.1,
  },
  production: {
    chainId: 250,
    contractAddress: '0xd761dB316b5b9C9C51F7f80127497Bc618e2B422',
    defaultProvider: `https://rpc.ftm.tools`,
    etherscanUrl: 'https://ftmscan.com',
    refreshInterval: 10000,
    gasLimitMultiplier: 1.1,
  },
}

//export default configurations['production']
export default configurations['development']

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
  ethereumNodeTimeout: 10000,
}
