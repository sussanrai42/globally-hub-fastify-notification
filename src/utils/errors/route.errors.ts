import { CustomErrorParams } from "../customError";

export const ProtectedRoutesMissing: CustomErrorParams = {
    message: "Proted routes missing",
    code: "PRT001",
    statusCode: 500,
};

export default {
    ProtectedRoutesMissing
}