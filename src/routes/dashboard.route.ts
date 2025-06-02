import { FastifyInstance } from "fastify";
import notificationController from "../controllers/notification.controller";
import { protectedRoutes } from "../middlewares/protectedRoutes.middleware";

const dashoardRouter = async (app: FastifyInstance) => {
    app.get(
        '/dashboard/overview',
        {
            preHandler: protectedRoutes('notification.dashboard.overview')
        },
        notificationController.getDashboardOverview
    );
};

export default dashoardRouter