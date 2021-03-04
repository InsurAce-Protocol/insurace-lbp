import { providers } from 'ethers';
import config from '@/config';
import ContractUtil from './ContractUtil';

class EthersManager {
  constructor() {
    this.provider = new providers.InfuraProvider(config.chainId, config.infuraId);
    this.contracts = ContractUtil.createContracts(this.provider);
  }

  getSpotPrice() {
    return this.contracts.BPool.getSpotPrice();
  }
}

export default new EthersManager();
