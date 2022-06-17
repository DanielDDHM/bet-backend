"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
const services_1 = require("../services");
const types_1 = require("../types");
class UsersController {
    async get(req, res) {
        const { params: { id }, role, query: { page, perPage } } = req;
        const data = {
            id,
            role,
            page: Number(page) || 1,
            perPage: Number(perPage) || 10
        };
        try {
            const user = await new services_1.UserService(data).get();
            return res.status(types_1.StatusCode.OK).send({ data: user, message: types_1.DefaultMessages.USER_FIND });
        }
        catch (error) {
            if (error instanceof helpers_1.AppError)
                res.status(error.statusCode).json(error.message);
            res.status(Number(types_1.StatusCode.INTERNAL_SERVER_ERROR)).json(error);
        }
    }
    async create(req, res) {
        const { body } = req;
        try {
            const userCreated = await new services_1.UserService(body).create();
            return res.status(types_1.StatusCode.OK).send({ data: userCreated, message: types_1.DefaultMessages.USER_CREATED });
        }
        catch (error) {
            if (error instanceof helpers_1.AppError)
                res.status(error.statusCode).json(error.message);
            res.status(Number(types_1.StatusCode.INTERNAL_SERVER_ERROR)).json(error);
        }
    }
    async update(req, res) {
        const { params: { id }, body, role } = req;
        const data = { id, ...body, role };
        try {
            if (req.method === types_1.CrudOperations.PUT) {
                const updatedUser = await new services_1.UserService(data).update();
                return res.status(types_1.StatusCode.OK)
                    .send({ data: updatedUser, message: types_1.DefaultMessages.USER_UPDATED });
            }
            if (req.method === types_1.CrudOperations.PATCH) {
                const confirmedUser = await new services_1.UserService({ id }).confirmUser();
                return res.status(types_1.StatusCode.OK)
                    .send({ data: confirmedUser, message: types_1.DefaultMessages.USER_CONFIRMED });
            }
        }
        catch (error) {
            if (error instanceof helpers_1.AppError)
                res.status(error.statusCode).json(error.message);
            res.status(Number(types_1.StatusCode.INTERNAL_SERVER_ERROR)).json(error);
        }
    }
}
exports.default = UsersController;
//# sourceMappingURL=users.controller.js.map