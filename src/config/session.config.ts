import { registerAs } from '@nestjs/config';
import { SessionOptions } from 'express-session';
import RedisStore from 'connect-redis';
import { Logger } from '@nestjs/common';
import { redisClient } from './redis.provider';

redisClient.connect().catch(e => console.log(e));

redisClient.on('error', (err) => {
    Logger.error('Redis error:', err);
});

redisClient.on('connect', () => {
    Logger.verbose('Connected to Redis');
});

redisClient.on('reconnecting', () => {
    Logger.warn('Reconnecting to Redis');
});

redisClient.on('end', () => {
    Logger.warn('Redis connection closed');
});

// Initialize store.
// @ts-ignore
let redisStore = new RedisStore({
    client: redisClient as any
} as SessionOptions)

export default registerAs('session', () => ({
    store: redisStore,
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: true,
        httpOnly: false,
        maxAge: 86400000,
    },
}));
