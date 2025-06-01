import { notificationService } from "../service/notification.service";

export const getNotifications = async (request: any, reply: any) => {
    const notifications = await notificationService.getAllNotifications(request.query.page || 1, request.query.perPage || 10);
    reply.send({ result: notifications });
}

export const getSingleNotification = async (request: any, reply: any) => {
    const notification = await notificationService.getNotificationById(request.params.id);
    reply.send({ result: notification });
}

export const getDashboardOverview = async (request: any, reply: any) => {
    const notifications = await notificationService.getDashboardOverview();
    reply.send({ result: notifications });
}

export default {
    getNotifications,
    getSingleNotification,
    getDashboardOverview
};