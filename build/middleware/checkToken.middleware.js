"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const types_1 = require("../types");
const helpers_1 = require("../helpers");
class AuthUserMiddleware {
    async verifyToken(req, res, next) {
        try {
            const token = String(req.headers['x-access-token']);
            if (!token)
                throw new helpers_1.AppError(types_1.DefaultMessages.MISSING_TOKEN, types_1.StatusCode.UNAUTHORIZED);
            const verify = jsonwebtoken_1.default.verify(token, String(process.env.AUTH_SECRET));
            if (verify) {
                req.nick = verify?.data?.nick;
                return next();
            }
        }
        catch (error) {
            res.status(error.statusCode).send(error);
        }
    }
}
exports.default = AuthUserMiddleware;
//# sourceMappingURL=checkToken.middleware.js.map