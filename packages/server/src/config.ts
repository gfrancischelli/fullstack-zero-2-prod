export const redisConfig = {
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  auth_pass: process.env.REDIS_PASSWORD
};
