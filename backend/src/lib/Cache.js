import Redis from 'ioredis';
import redisConfig from '../config/redis';

const cachePrefix = `${redisConfig.prefix}:Cache:`;

class Cache {
  constructor() {
    this.redis = new Redis({
      host: redisConfig.host,
      port: redisConfig.port,
      keyPrefix: cachePrefix,
    });
  }

  set(key, value) {
    const expiration = 60 * 60 * 24; // 24 hours
    return this.redis.set(key, JSON.stringify(value), 'EX', expiration);
  }

  async get(key) {
    const cached = await this.redis.get(key);
    return cached ? JSON.parse(cached) : null;
  }

  remove(key) {
    return this.redis.del(key);
  }

  async removePrefix(prefix) {
    const keys = await this.redis.keys(`${cachePrefix}${prefix}:*`);
    // deletion doesn't consider prefix, that's why we need to replace it
    const keysWithoutPrefix = keys.map(key => key.replace(cachePrefix, ''));
    return this.redis.del(keysWithoutPrefix);
  }
}

export default new Cache();
