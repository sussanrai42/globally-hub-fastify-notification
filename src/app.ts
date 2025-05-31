import fastify, { FastifyServerOptions } from "fastify";

declare module "fastify" {
	interface FastifyRequest {
		UserId?: string;
	}
}

const App = (options: FastifyServerOptions) => {
	const app = fastify(options)

	app.get('/', async (request, reply) => {
        return { hello: 'world' };
    });

	return app
}

export default App;