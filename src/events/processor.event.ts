import { EventHandler, ProcessEvent } from "../types/notifications/processor.events.types";
import {sendNotification} from "../notifications/dispatcher.notification";
import { EVENT_TYPES } from "../constants/event.type.constant";
import { canSendNotification } from "../utils/ratelimiter.utils";
import { RateLimitNotificationException } from "../exceptions/rateLimitNotificationException.exception";
import { NOTIFICATION_TYPES } from "../constants/notification.type.constant";

class EventProcessor {
    private handlers: Record<string, EventHandler>
    constructor() {
        this.handlers = {
            'sms': this.handleSmsNotification.bind(this),
            'email': this.handleEmailNotification.bind(this),
            'push': this.handlePushNotification.bind(this)
        }
    }

    async processEvent(event: ProcessEvent) {
        try {
            if (!event || !event.type) {
                throw new Error('Invalid event: missing type');
            }

            const handler = this.handlers[event.type];
            if (!handler) {
                throw new Error(`No handler registered for event type: ${event.type}`);
            }

            console.log(`Processing event: ${event.type}`);
            return await handler(event);
        } catch (error) {
            console.error(`Error processing event ${event.type}:`, error);
            throw error;
        }
    }

    async handleSmsNotification(event: ProcessEvent): Promise<void> {
        console.log('Handle sms notification:', event.data);

        if (event.userId && !await canSendNotification(event.userId, NOTIFICATION_TYPES.SMS_NOTIFICATION)) {
            throw new RateLimitNotificationException('Rate limit exceeded');
        }
        
        await sendNotification({
            to: event.data.to,
            message: event.data.message
        }, EVENT_TYPES.SMS_NOTIFICATION);
    }

    async handleEmailNotification(event: ProcessEvent): Promise<void> {
        console.log('Handle email notification', event.data);

        if (event.userId && !await canSendNotification(event.userId, NOTIFICATION_TYPES.EMAIL_NOTIFICATION)) {
            throw new RateLimitNotificationException('Rate limit exceeded');
        }

        await sendNotification({
            to: event.data.to,
            message: event.data.message
        }, EVENT_TYPES.EMAIL_NOTIFICATION);
    }

    async handlePushNotification(event: ProcessEvent): Promise<void> {
        console.log('Handle push notification', event.data);

        if (event.userId && !await canSendNotification(event.userId, NOTIFICATION_TYPES.PUSH_NOTIFICATION)) {
            throw new RateLimitNotificationException('Rate limit exceeded');
        }

        await sendNotification({
            to: event.data.to,
            message: event.data.message
        }, EVENT_TYPES.PUSH_NOTIFICATION);
    }
}

const processor = new EventProcessor();

export { processor }