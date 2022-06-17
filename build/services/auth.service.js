"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const types_1 = require("../types");
const helpers_1 = require("../helpers");
const validations_1 = require("../validations");
class Auth {
    constructor(payload, headers) {
        this.payload = payload;
        this.headers = headers;
        this.AUTH_SECRET = process.env.AUTH_SECRET;
    }
    async login(payload = this.payload) {
        const { email, nick, password } = validations_1.LoginValidation.parse(payload);
        try {
            const user = await config_1.prisma.users.findFirst({
                where: {
                    OR: [
                        { email },
                        { nick }
                    ]
                }
            });
            if (!user)
                throw new helpers_1.AppError(types_1.DefaultMessages.USER_NOT_EXISTS, types_1.StatusCode.NOT_FOUND);
            const passMatch = await new helpers_1.PasswordCrypt(String(password), user.password).compare();
            if (!passMatch || user.email != email) {
                throw new helpers_1.AppError(types_1.DefaultMessages.WRONG_DATA, types_1.StatusCode.BAD_REQUEST);
            }
            const data = {
                data: { nick, message: types_1.DefaultMessages.CURIOSITY },
            };
            const token = jsonwebtoken_1.default.sign(data, String(this.AUTH_SECRET), { expiresIn: '1h' });
            return { auth: true, token };
        }
        catch (error) {
            if (error instanceof helpers_1.AppError)
                throw new helpers_1.AppError(String(error.message), error.statusCode);
            throw new helpers_1.AppError(types_1.DefaultMessages.INTERNAL_SERVER_ERROR, types_1.StatusCode.INTERNAL_SERVER_ERROR);
        }
    }
    async logout(token) {
        try {
            return { auth: false, token: null };
        }
        catch (error) {
            throw new helpers_1.AppError(types_1.DefaultMessages.INTERNAL_SERVER_ERROR, types_1.StatusCode.INTERNAL_SERVER_ERROR);
        }
    }
}
exports.default = Auth;
//# sourceMappingURL=auth.service.js.map