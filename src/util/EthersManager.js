import { providers } from 'ethers';
import config from '@/config';
import ContractUtil from './ContractUtil';

class EthersManager {
  constructor() {
    this.provider = new providers.InfuraProvider(config.chainId, config.infuraId);
    this.contracts = ContractUtil.createContracts(this.provider);
  }

  getSpotPrice() {
    return this.contracts.BPool.getSpotPrice(config.address.tokenIn, config.address.tokenOut);
  }

  getTokenInBalance() {
    return this.contracts.BPool.getBalance(config.address.tokenIn);
  }

  getTokenOutBalance() {
    return this.contracts.BPool.getBalance(config.address.tokenOut);
  }
}

export default new EthersManager();
