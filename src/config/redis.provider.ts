import { createClient } from 'redis';
import { Provider } from '@nestjs/common';

export const redisClient= createClient({
    url: `redis://redis:6379`
});

export const RedisProvider: Provider = {
    provide: 'REDIS_CLIENT',
    useValue: redisClient,
};