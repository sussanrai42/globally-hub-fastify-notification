import { NotificationChannel, NotificationPayload } from "../../types/notifications/notification.types";

export class PushNotificationChannel implements NotificationChannel {
    async send(payload: NotificationPayload) {
        console.log('Push notification send to:', payload.to);
        console.log('With message:', payload.message);
    }
}
