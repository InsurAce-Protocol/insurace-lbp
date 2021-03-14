const ChainId = {
  MAINNET: 1,
  ROPSTEN: 3,
  RINKEBY: 4,
  GÖRLI: 5,
  KOVAN: 42,
};

export default {
  backendUrl: 'https://data.insurace.io/lbp',
  infuraId: '3b7ec1647d9349b0be269090f7e77dd8',
  chainId: ChainId.MAINNET,
  address: {
    tokenIn: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    tokenOut: '0x544c42fbb96b39b21df61cf322b5edc285ee7429',
    BPool: '0x9574e1b5B3e208EdC2315319cA858CE03c1f6A00',
  },
  azure: {
    insights: {
      connectionString: 'InstrumentationKey=f091e9a5-1771-4124-9045-803ada9b042d;IngestionEndpoint=https://westus2-1.in.applicationinsights.azure.com/',
    },
  },
}
