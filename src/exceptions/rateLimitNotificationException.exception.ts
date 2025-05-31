export class RateLimitNotificationException extends Error {
    statusCode: number;
    constructor(message: string) {
        super(message);
        this.name = 'RateLimitNotificationException';
        this.statusCode = 421;
    }
}