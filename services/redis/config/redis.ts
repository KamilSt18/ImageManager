import { createClient } from 'redis';

const redisClient = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT)
    }
});

redisClient.on('ready', () => {
    console.log(`Connected to redis: ${process.env.REDIS_HOST}`);
});


redisClient.on('error', error => {
    console.log(error);
    process.exit(1)
});

module.exports = redisClient