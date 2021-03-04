import { Contract } from 'ethers';
import config from '@/config';

const BPoolAbi = [
  'function getSpotPrice(address tokenIn, address tokenOut) external view returns (uint spotPrice)',
  'function getBalance(address token) external view returns (uint)',
];

export default class ContractUtil {
  static createContracts(signerOrProvider) {
    return {
      BPool: new Contract(config.address.BPool, BPoolAbi, signerOrProvider),
    };
  }
}
