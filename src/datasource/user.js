import { RESTDataSource } from 'apollo-datasource-rest';
import { configuration } from '../config';

class UserApi extends RESTDataSource {
  constructor() {
    super();
    this.baseUrl = `${configuration.service_url}/user`;
  }

  getMe() {
    return this.get(`${this.baseUrl}/me`);
  }

  loginUser(payload) {
    return this.post(`${this.baseUrl}/login`, payload);
  }
}

export default UserApi;
