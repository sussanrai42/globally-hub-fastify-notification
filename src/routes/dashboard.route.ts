import { FastifyInstance } from "fastify";
import notificationController from "../controllers/notification.controller";

const dashoardRouter = async (app: FastifyInstance) => {
    app.get(
        '/dashboard/overview',
        notificationController.getDashboardOverview
    );
};

export default dashoardRouter