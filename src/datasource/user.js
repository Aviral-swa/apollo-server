import { RESTDataSource } from 'apollo-datasource-rest';
import { configuration } from '../config';

class UserApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${configuration.service_url}/user`;
  }

  willSendRequest(request) {
    request.headers.set('Authorization', this.context.token);
  }

  getMe() {
    return this.get('/me');
  }

  loginUser(payload) {
    return this.post('/login', payload);
  }
}

export default UserApi;
