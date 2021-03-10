import { providers } from 'ethers';
import config from '@/config';
import ContractUtil from './ContractUtil';

const Tokens = {
  USDC: config.address.tokenIn,
  INSUR: config.address.tokenOut,
};

class EthersManager {
  constructor() {
    this.provider = new providers.InfuraProvider(config.chainId, config.infuraId);
    this.contracts = ContractUtil.createContracts(this.provider);
  }

  getSpotPrice() {
    return this.contracts.BPool.getSpotPrice(config.address.tokenIn, config.address.tokenOut);
  }

  getBalance(tokenSymbol) {
    return this.contracts.BPool.getBalance(Tokens[tokenSymbol]);
  }
}

export default new EthersManager();
