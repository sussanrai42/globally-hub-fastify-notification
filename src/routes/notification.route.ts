import { FastifyInstance } from "fastify";
import { getNotificationsSchema } from "./schemas/notification.route.schema";
import notificationController from "../controllers/notification.controller";

const notificationRouter = async (app: FastifyInstance) => {
    app.get(
        "/",
        {
            schema: getNotificationsSchema
        },
        notificationController.getNotifications
    );

    app.get(
        "/:id",
        notificationController.getSingleNotification
    );

    app.get(
        '/dashoard/overview',
        notificationController.getDashboardOverview
    );
};

export default notificationRouter