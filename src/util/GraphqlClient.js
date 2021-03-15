import { request } from 'graphql-request';
import config from '@/config';

class GraphqlClient {
  query(query) {
    return request(config.graphqlUrl, query);
  }
}

export default new GraphqlClient();
