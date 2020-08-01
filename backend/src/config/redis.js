import 'dotenv/config';
import { checkConfig } from '.';

export default {
  host: checkConfig(process.env.REDIS_HOST),
  port: checkConfig(process.env.REDIS_PORT),
};
