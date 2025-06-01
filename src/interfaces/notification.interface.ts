import { Notification, Prisma } from '@prisma/client';

type NotificationCreateInput = Prisma.NotificationCreateInput;
type NotificationUpdateInput = Prisma.NotificationUpdateInput;

export interface NotificationRepositoryInterface {

    paginateAll(page: number, perPage: number): Promise<Notification[]>;

    create(data: NotificationCreateInput): Promise<Notification>;

    findById(id: string): Promise<Notification | null>;

    findAll(): Promise<Notification[]>;

    update(id: string, data: NotificationUpdateInput): Promise<Notification>;

    delete(id: string): Promise<Notification>;

    count(): Promise<number>;
}
