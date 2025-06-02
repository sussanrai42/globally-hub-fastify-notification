import fastify, { FastifyRequest, FastifyServerOptions } from "fastify";
import routes from "./routes/api.route";
import { publishMessage } from "./service/producer";
import notificationRouter from "./routes/notification.route";
import dashoardRouter from "./routes/dashboard.route";

declare module "fastify" {
	interface FastifyRequest {
		UserId?: string;
        user?: {
            id: string,
            email: string,
            name: string,
            contact_number: string
        },
	}
}

const App = (options: FastifyServerOptions) => {
	const app = fastify(options)

    app.register(require('@fastify/express'));
	app.get('/', async (request, reply) => {
        return { hello: 'world' };
    });

    routes.forEach((route, index)=>{
        app.route(route)
    })

    app.get('/send', async () => {
        const message = 'Hello from /send route';
        await publishMessage('test-queue', message);

        return { status: 'sent', message };
    });

    app.register(notificationRouter, {prefix: 'api/v1/notifications'});
    app.register(dashoardRouter, {prefix: 'api/v1'});

	return app
}

export default App;