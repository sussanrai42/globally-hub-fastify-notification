import { FastifyInstance, FastifyServerOptions } from "fastify";
import App from "./src/app";
import { consumeMessage } from "./src/service/consumer";

const options: FastifyServerOptions = {
	logger: true
}

// Application
const app: FastifyInstance = App(options)

app.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
	if (err) {
		app.log.error(err);
		process.exit(1);
	}
	app.log.info(`Server listening at ${address}`);
});

consumeMessage();