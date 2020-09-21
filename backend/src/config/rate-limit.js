import redis from 'redis';
import RateLimit from 'express-rate-limit';
import RateLimitRedis from 'rate-limit-redis';
import redisConfig from './redis';

export default new RateLimit({
  store: new RateLimitRedis({
    client: redis.createClient({
      host: redisConfig.host,
      port: redisConfig.port,
      prefix: `${redisConfig.prefix}:RateLimit:`,
    }),
  }),
  windowMs: 1000 * 60 * 15, // 15 minutes
  max: 100, // max requests
});
