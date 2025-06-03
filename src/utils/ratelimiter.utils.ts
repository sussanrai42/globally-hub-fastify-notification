import { notificationConfig } from "../config/notification.config";
import redis from "../libs/redis.libs";
import { ChannelType } from "../types/notifications/notification.types";
import { logWarn } from "./logger.utils";

export async function canSendNotification(userId: string, channel: ChannelType): Promise<boolean> {
    const key = `rate_limit:user:${userId}}:${channel}`;
    const ttl = notificationConfig[channel].ttl;
    const limit = notificationConfig[channel].limit;

    if (ttl && limit) {
        // Increment the counter
        const current = await redis.incr(key);

        // Set TTL only if it's a new key
        if (current === 1) {
            await redis.expire(key, ttl);
        }

        console.log(current, limit);

        return current < limit;
    }

    logWarn(`Rate limit for ${channel} is not configured`);
    return true;
}