export const notificationConfig: Record<string, { limit: number|null, ttl: number|null }> = {
    sms: {
        limit: process.env.SMS_NOTIFICATION_RATE_LIMIT ? parseInt(process.env.SMS_NOTIFICATION_RATE_LIMIT) : null,
        ttl: process.env.SMS_NOTIFICATION_RATE_LIMIT_TTL ? parseInt(process.env.SMS_NOTIFICATION_RATE_LIMIT_TTL) : null,
    },
    email: {
        limit: process.env.EMAIL_NOTIFICATION_RATE_LIMIT ? parseInt(process.env.EMAIL_NOTIFICATION_RATE_LIMIT) : null,
        ttl: process.env.EMAIL_NOTIFICATION_RATE_LIMIT_TTL ? parseInt(process.env.EMAIL_NOTIFICATION_RATE_LIMIT_TTL) : null,
    },
    push: {
        limit: process.env.PUSH_NOTIFICATION_RATE_LIMIT ? parseInt(process.env.PUSH_NOTIFICATION_RATE_LIMIT) : null,
        ttl: process.env.PUSH_NOTIFICATION_RATE_LIMIT_TTL ? parseInt(process.env.PUSH_NOTIFICATION_RATE_LIMIT_TTL) : null,
    },
} as const;