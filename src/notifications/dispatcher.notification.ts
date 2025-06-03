import { ChannelType, NotificationChannel, NotificationPayload } from "../types/notifications/notification.types";
import { MailNotificationChannel } from "./channels/mail.notification.channel";
import { PushNotificationChannel } from "./channels/push.notification.channel";
import { SmsNotificationChannel } from "./channels/sms.notification.channel";

const createChannel = (channelName: ChannelType): NotificationChannel => {
    switch (channelName) {
        case 'email': return new MailNotificationChannel();
        case 'sms': return new SmsNotificationChannel();
        case 'push': return new PushNotificationChannel();
    }
}

const sendNotification = async (payload: NotificationPayload, channelName: ChannelType) => {
    await createChannel(channelName).send(payload);
}

export { sendNotification }