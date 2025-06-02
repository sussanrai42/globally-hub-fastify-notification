import { FastifyReply, FastifyRequest } from "fastify";
import { verifyToken } from "./auth.middleware";

export const protectedRoutes = (permission: string | null = null) => async (request: FastifyRequest, reply: FastifyReply, next: any) => {
	await verifyToken(request, permission);
};

export default { protectedRoutes };