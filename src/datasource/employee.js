import { RESTDataSource } from 'apollo-datasource-rest';
import { configuration } from '../config';

class EmployeeApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${configuration.service_url}/employee`;
  }

  willSendRequest(request) {
    request.headers.set('Authorization', this.context.token);
  }

  getAll(payload) {
    return this.get('', payload);
  }

  create(payload) {
    return this.post('', payload);
  }
}

export default EmployeeApi;
