import { FastifyInstance } from "fastify";
import { getNotificationsSchema } from "./schemas/notification.route.schema";
import notificationController from "../controllers/notification.controller";
import { protectedRoutes } from "../middlewares/protectedRoutes.middleware";

const notificationRouter = async (app: FastifyInstance) => {
    app.get(
        "/",
        {
            schema: getNotificationsSchema,
            preHandler: protectedRoutes('notifications.index')
        },
        notificationController.getNotifications
    );

    app.get(
        "/:id",
        {
            preHandler: protectedRoutes('notifications.show')
        },
        notificationController.getSingleNotification,
    );

    // routes want to protect
    // const Routes: object = {
    //     "/api/v1/notifications": true,
    //     "/api/v1/notifications/:id": true,
    // };

    // // function add hook onRequest -> protectedRoutes(appInstance, Routes you want to protect)
    // protectedRoutes(app, Routes);
};

export default notificationRouter