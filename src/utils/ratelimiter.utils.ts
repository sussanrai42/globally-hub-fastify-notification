import { parse } from "path";
import { RATE_LIMIT_NOTIFICATION_TYPES } from "../constants/notification.type.constant";
import redis from "../libs/redis.libs";
import { ChannelType } from "../types/notifications/notification.types";

export async function canSendNotification(userId: string, channel: ChannelType): Promise<boolean> {
    const key = `rate_limit:user:${userId}}:${channel}`;
    const ttl = parseInt(process.env.NOTIFICATION_RATE_LIMIT_TTL || "60"); // 1 minute in seconds
    const limit = RATE_LIMIT_NOTIFICATION_TYPES[channel];

    // Increment the counter
    const current = await redis.incr(key);

    // Set TTL only if it's a new key
    if (current === 1) {
        await redis.expire(key, ttl);
    }

    console.log(current, limit);

    return current < limit;
}