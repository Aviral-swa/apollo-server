import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import Schema from './module';

class Server {
  constructor(config) {
    this.config = config;
    this.app = express();
  }

  bootstrap() {
    this.setupApollo(Schema);
    this.setupRoutes();
    return this;
  }

  setupApollo(schema) {
    this.server = new ApolloServer(schema);
  }

  setupRoutes() {
    const { app } = this;
    app.get('/health-check', (req, res) => {
      res.send('I am OK');
    });
    this.server.applyMiddleware({ app });
  }

  run() {
    const { app, config: { port } } = this;
    app.listen(port, (err) => {
      if (err) {
        console.log(err);
      }
      console.log(`app is running on port ${port}`);
    });
  }
}
export default Server;
