import { RESTDataSource } from 'apollo-datasource-rest';
import { configuration } from '../config';

class UserApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${configuration.service_url}/trainee`;
  }

  willSendRequest(request) {
    request.headers.set('Authorization', this.context.token);
  }

  getAll() {
    return this.get('');
  }

  create(payload) {
    return this.post('', payload);
  }

  update(payload) {
    return this.put('', payload);
  }

  deleteTrainee(id) {
    return this.delete(`/${id}`);
  }
}

export default UserApi;
