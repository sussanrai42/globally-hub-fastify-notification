export interface NotificationChannel {
	send(payload: NotificationPayload): Promise<void>;
}

export interface NotificationPayload {
	to: string;
	title: string;
	message: string;
	payload?: any;
}

export type ChannelType = 'sms' | 'email' | 'push';