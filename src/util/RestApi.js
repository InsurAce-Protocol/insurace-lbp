import axios from 'axios';
import config from '@/config';

export default class RestApi {
  static getPrices() {
    return axios.get(`${config.backendUrl}/prices`);
  }
}
