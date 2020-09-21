import ExpressBrute from 'express-brute';
import RedisStore from 'express-brute-redis';
import redisConfig from './redis';

const store = new RedisStore({
  host: redisConfig.host,
  port: redisConfig.port,
  prefix: `${redisConfig.prefix}:BruteForce:`,
});

export default new ExpressBrute(store);
