import { Notification } from "@prisma/client";
import { NotificationRepositoryInterface } from "../interfaces/notification.interface";
import { NotificationRepository } from "../repositories/notification.repository";
import { ModelNotFoundException } from "../exceptions/modelNotFoundException.exception";

export class NotificationService {
    private readonly notificationRepository: NotificationRepositoryInterface;

    constructor() {
        this.notificationRepository = new NotificationRepository();
    }

    async getAllNotifications(page: number, perPage: number): Promise<Notification[]> {
        return await this.notificationRepository.paginateAll(page, perPage);
    }

    async getNotificationById(id: string): Promise<Notification | null> {
        const notification = await this.notificationRepository.findById(id);

        if (!notification) {
            throw new ModelNotFoundException('Notification not found');
        }

        return notification;
    }

    async getDashboardOverview(): Promise<object> {
        const totalNotifications = await this.notificationRepository.count();
        return { totalNotifications: totalNotifications };
    }
}

const notificationService = new NotificationService();

export { notificationService };