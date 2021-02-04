import { config } from 'dotenv';

config();
const configuration = {
  port: process.env.PORT,
  node_env: process.env.NODE_ENV,
  service_url: process.env.SERVICE_URL,
};
Object.freeze(configuration);
export default configuration;
