import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import Redis from 'ioredis';
import { RedisCache } from 'apollo-server-cache-redis';
import Schema from './module';
import {
  UserApi, TraineeApi, EmployeeApi, PermissionApi,
} from './datasource';
import constants from './lib/constants';

class Server {
  constructor(config) {
    this.config = config;
    this.app = express();
    this.redis = new Redis();
  }

  bootstrap() {
    this.redis.del(constants.permissionCacheKey);
    this.setupApollo(Schema);
    this.setupRoutes();
    return this;
  }

  setupApollo(schema) {
    const { redis } = this;
    this.server = new ApolloServer({
      ...schema,
      dataSources: () => ({
        userApi: new UserApi(),
        traineeApi: new TraineeApi(),
        employeeApi: new EmployeeApi(),
        permissionApi: new PermissionApi(),
      }),
      context: ({ req }) => {
        if (req) {
          return {
            token: req.headers.authorization,
            redis,
          };
        }
        return { redis };
      },
      cache: new RedisCache({
        port: 6379,
        host: '127.0.0.1',
      }),
    });
    this.httpServer = createServer(this.app);
    this.server.installSubscriptionHandlers(this.httpServer);
  }

  setupRoutes() {
    const { app } = this;
    app.get('/health-check', (req, res) => {
      res.send('I am OK');
    });
    this.server.applyMiddleware({ app });
  }

  run() {
    const { config: { port } } = this;
    this.httpServer.listen(port, (err) => {
      if (err) {
        console.log(err);
      }
      console.log(`app is running on port ${port}`);
    });
  }
}
export default Server;
