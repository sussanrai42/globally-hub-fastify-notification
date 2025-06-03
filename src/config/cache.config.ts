

type cacheConfig = {
    redis: {
        host: string,
        port: number,
        username: string|undefined,
        password: string|undefined
    }
}

export const cacheConfig: cacheConfig = {
    redis: {
        host: process.env.REDIS_HOST || 'redis',
        port: parseInt(process.env.REDIS_PORT || '6379'),
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD
    }
}