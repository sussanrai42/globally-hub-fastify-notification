import { ChannelType } from "../types/notifications/notification.types";

export const NOTIFICATION_TYPES: Record<string, ChannelType> = {
    SMS_NOTIFICATION: 'sms',
    EMAIL_NOTIFICATION: 'email',
    PUSH_NOTIFICATION: 'push',
} as const;

export const RATE_LIMIT_NOTIFICATION_TYPES: Record<string, number> = {
    sms: parseInt(process.env.SMS_NOTIFICATION_SMS_RATE_LIMIT || "10"),
    email: parseInt(process.env.EMAIL_NOTIFICATION_RATE_LIMIT || "10"),
    push: parseInt(process.env.PUSH_NOTIFICATION_RATE_LIMIT || "10"),
} as const;