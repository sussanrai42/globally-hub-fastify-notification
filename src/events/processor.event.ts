import { EventHandler, ProcessEvent } from "../types/notifications/processor.events.types";
import {sendNotification} from "../notifications/dispatcher.notification";
import { EVENT_TYPES } from "../constants/event.type.constant";
import {NotificationRepository} from "../repositories/notification.repository"
import {NotificationRepositoryInterface} from "../interfaces/notification.interface"
import { Notification } from '@prisma/client';
import { canSendNotification } from "../utils/ratelimiter.utils";
import { RateLimitNotificationException } from "../exceptions/rateLimitNotificationException.exception";
import { NOTIFICATION_TYPES } from "../constants/notification.type.constant";

class EventProcessor {
    private handlers: Record<string, EventHandler>
    private notificationRepository: NotificationRepositoryInterface;
    constructor() {
        this.notificationRepository = new NotificationRepository();
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
        this.createNotification(event);
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
        this.createNotification(event);
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
        this.createNotification(event);
    }

    async createNotification(event: ProcessEvent): Promise<Notification>
    {
        return await this.notificationRepository.create({
            type: event.type,
            recipient: event.data.to,
            message: event.data.message,
            payload: event.data
        });
    }
}

const processor = new EventProcessor();

export { processor }