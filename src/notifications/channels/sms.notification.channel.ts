import { NotificationChannel, NotificationPayload } from "../../types/notifications/notification.types";

export class SmsNotificationChannel implements NotificationChannel {
    async send(payload: NotificationPayload): Promise<void> {
        console.log('Sms notification send to:', payload.to);
        console.log('With message:', payload.message);
    }
}
