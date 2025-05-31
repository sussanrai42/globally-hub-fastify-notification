import { ChannelType, NotificationChannel, NotificationPayload } from "../types/notifications/notification.types";
import { MailNotificationChannel } from "./channels/mail.notification.channel";
import { PushNotificationChannel } from "./channels/push.notification.channel";
import { SmsNotificationChannel } from "./channels/sms.notification.channel";

const channel: Record<ChannelType, NotificationChannel> = {
    sms: new SmsNotificationChannel(),
    email: new MailNotificationChannel(),
    push: new PushNotificationChannel()
};

const sendNotification = async (payload: NotificationPayload, channelName: ChannelType) => {
    await channel[channelName].send(payload);
}

export { sendNotification }