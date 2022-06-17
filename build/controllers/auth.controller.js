"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
const services_1 = require("../services");
const types_1 = require("../types");
class AuthController {
    async login(req, res) {
        const { body } = req;
        try {
            const userLogin = await new services_1.AuthService({ ...body }).login();
            return res.status(types_1.StatusCode.OK).send(userLogin);
        }
        catch (error) {
            if (error instanceof helpers_1.AppError)
                res.status(error.statusCode).json(error.message);
            res.status(Number(types_1.StatusCode.INTERNAL_SERVER_ERROR)).json(error);
        }
    }
    async logout(req, res) {
        try {
            const token = req.headers['x-access-token'];
            const userLogout = await new services_1.AuthService().logout(token);
            res.status(types_1.StatusCode.OK).send(userLogout);
        }
        catch (error) {
            if (error instanceof helpers_1.AppError)
                res.status(error.statusCode).json(error.message);
            res.status(Number(types_1.StatusCode.INTERNAL_SERVER_ERROR)).json(error);
        }
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map