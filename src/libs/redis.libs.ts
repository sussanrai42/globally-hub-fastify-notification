import Redis from 'ioredis';
import { cacheConfig } from '../config/cache.config';

const redis = new Redis({
  host: cacheConfig.redis.host,
  port: cacheConfig.redis.port,
  username: cacheConfig.redis.username,
  password: cacheConfig.redis.password
});

export default redis;