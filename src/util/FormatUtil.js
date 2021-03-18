import { utils } from 'ethers';

export default class FormatUtil {
  static parseUnits(bigNumberish, numDecimals) {
    return utils.parseUnits(bigNumberish.toString(), numDecimals);
  }

  static formatUnits(bigNumber, numDecimals) {
    return utils.formatUnits(bigNumber, numDecimals);
  }

  static commify(bigNumber) {
    return utils.commify(bigNumber);
  }

  static formatCommify(bigNumber, tokenDecimals, numDecimals) {
    return utils.commify(Number(utils.formatUnits(bigNumber, tokenDecimals)).toFixed(numDecimals));
  }
}
