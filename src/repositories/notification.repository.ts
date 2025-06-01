import { NotificationRepositoryInterface } from '../interfaces/notification.interface';
import { prisma } from '../prisma/client.prisma';
import { Notification, Prisma } from '@prisma/client';

type NotificationCreateInput = Prisma.NotificationCreateInput;
type NotificationUpdateInput = Prisma.NotificationUpdateInput;

export class NotificationRepository implements NotificationRepositoryInterface {

    async paginateAll(page: number, perPage: number): Promise<Notification[]> {
        return prisma.notification.findMany({
            skip: (page - 1) * perPage,
            take: perPage,
        });
    }

    async create(data: NotificationCreateInput): Promise<Notification> {
        return prisma.notification.create({ data });
    }

    async findById(id: string): Promise<Notification | null> {
        return prisma.notification.findUnique({ where: { id } });
    }

    async findAll(): Promise<Notification[]> {
        return prisma.notification.findMany();
    }

    async update(id: string, data: NotificationUpdateInput): Promise<Notification> {
        return prisma.notification.update({
            where: { id },
            data,
        });
    }

    async delete(id: string): Promise<Notification> {
        return prisma.notification.delete({ where: { id } });
    }

    async count(): Promise<number> {
        return prisma.notification.count();
    }
}
