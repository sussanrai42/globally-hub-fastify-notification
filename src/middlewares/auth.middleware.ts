import { FastifyRequest } from "fastify";
import customError from "../utils/customError";
import serviceConfig from "../config/service.config";
import authErrors from "../utils/errors/auth.errors";
import axios from "../utils/axios";

export const validateHeadersAuth = (req: FastifyRequest): string => {
    const header: string | undefined = req.headers.authorization;
    if (!header) {
        customError(authErrors.AuthMissingHeaders);
    }
    const accessToken: string = header!.split(" ")[1];
    if (!accessToken) {
        customError(authErrors.AuthMissingHeaders);
    }
    return accessToken;
};

export const verifyToken = async (
    request: FastifyRequest,
    permission: string|null
): Promise<boolean> => {
    try {
        const token = validateHeadersAuth(request);

        const response = await axios.post(
            serviceConfig.introspectApiUrl,
            { token, permission },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        request.user = response.data.data;
        request.UserId = request.user?.id;
        return true;
    } catch (err) {
        customError(authErrors.AuthInvalidToken);
        return false;
    }
};

export default { verifyToken };