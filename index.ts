import { FastifyInstance, FastifyServerOptions } from "fastify";
import App from "./src/app";

const options: FastifyServerOptions = {
	logger: true
}

// Application
const app: FastifyInstance = App(options)

app.listen({ port: parseInt(process.env.PORT || '3000'), host: process.env.HOST }, (err, address) => {
	if (err) {
		app.log.error(err);
		process.exit(1);
	}
	app.log.info(`Server listening at ${address}`);
});