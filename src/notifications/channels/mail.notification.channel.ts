import { NotificationChannel, NotificationPayload } from "../../types/notifications/notification.types";

export class MailNotificationChannel implements NotificationChannel {
    async send(payload: NotificationPayload) {
        console.log('Mail notification sent to:', payload.to);
        console.log('With message:', payload.message);
    }
}
