import { utils } from 'ethers';

export default class FormatUtil {
  static formatUnits(bigNumber, numDecimals) {
    return utils.formatUnits(bigNumber, numDecimals);
  }

  static commify(bigNumber) {
    return utils.commify(bigNumber);
  }
}
