import redis from "../libs/redis.libs";

export async function canSendNotification(userId: string, prefix: string, limit: number): Promise<boolean> {
    const key = `rate_limit:user:${userId}}:${prefix}`;
    const ttl = 60; // 1 minute in seconds

    // Increment the counter
    const current = await redis.incr(key);

    // Set TTL only if it's a new key
    if (current === 1) {
        await redis.expire(key, ttl);
    }

    console.log(current, limit);

    return current < limit;
}