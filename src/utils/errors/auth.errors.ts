import { CustomErrorParams } from "../customError";

export const AuthInvalidEmail: CustomErrorParams = {
    message: "Unauthorized",
    code: "AUTH001",
    statusCode: 401,
};

export const AuthInvalidToken: CustomErrorParams = {
    message: "Unauthorized",
    code: "AUTH002",
    statusCode: 401,
};
export const AuthMissingHeaders: CustomErrorParams = {
    message: "Unauthorized",
    code: "AUTH003",
    statusCode: 401,
};

export default {
    AuthInvalidEmail,
    AuthInvalidToken,
    AuthMissingHeaders,
};