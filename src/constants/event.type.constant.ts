import { ChannelType } from "../types/notifications/notification.types";

export const EVENT_TYPES: Record<string, ChannelType> = {
    SMS_NOTIFICATION: 'sms',
    EMAIL_NOTIFICATION: 'email',
    PUSH_NOTIFICATION: 'push',
} as const;

export const NOTIFICATION_TYPES: Record<string, ChannelType> = {
    SMS_NOTIFICATION: 'sms',
    EMAIL_NOTIFICATION: 'email',
    PUSH_NOTIFICATION: 'push',
} as const;