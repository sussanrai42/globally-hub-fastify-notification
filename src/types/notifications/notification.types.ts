export interface NotificationChannel {
	send(payload: NotificationPayload): Promise<void>;
}

export interface NotificationPayload {
	to: string;
	subject?: string;
	message: string;
	payload?: any;
}

export type ChannelType = 'sms' | 'email' | 'push';