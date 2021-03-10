const ChainId = {
  MAINNET: 1,
  ROPSTEN: 3,
  RINKEBY: 4,
  GÖRLI: 5,
  KOVAN: 42,
};

export default {
  backendUrl: 'https://data.insurace.io/lbp',
  infuraId: '928677c8717f43f8ba74c4c22da1dde7',
  chainId: ChainId.MAINNET,
  address: {
    tokenIn: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    tokenOut: '0x20945cA1df56D237fD40036d47E866C7DcCD2114',
    BPool: '0x9403d141047422Fbf43724FcB985b1e96196c84f',
  },
}
