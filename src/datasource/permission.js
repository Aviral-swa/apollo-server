import { RESTDataSource } from 'apollo-datasource-rest';
import { configuration } from '../config';

class PermissionApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${configuration.service_url}/permission`;
  }

  willSendRequest(request) {
    request.headers.set('Authorization', this.context.token);
  }

  getAll(payload) {
    return this.get('', payload);
  }

  update(payload) {
    return this.put('', payload);
  }
}

export default PermissionApi;
