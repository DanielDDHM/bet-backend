import IORedis from 'ioredis';
import 'dotenv/config';

const connectionIORedis = new IORedis({
  path: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
});

export default connectionIORedis;
