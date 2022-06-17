"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalGameController = exports.InternalBetsController = exports.InternalUsersController = void 0;
const helpers_1 = require("../helpers");
const services_1 = require("../services");
const types_1 = require("../types");
class InternalUsersController {
    async activate(req, res) {
        const { params: { id }, role } = req;
        const data = { id, role };
        try {
            const updatedUser = await new services_1.UserService(data).activateUser();
            return res.status(types_1.StatusCode.OK)
                .send({ data: updatedUser, message: types_1.DefaultMessages.USER_ACTIVATED });
        }
        catch (error) {
            if (error instanceof helpers_1.AppError)
                res.status(error.statusCode).json(error.message);
            res.status(Number(types_1.StatusCode.INTERNAL_SERVER_ERROR)).json(error);
        }
    }
    async delete(req, res) {
        const { params: { id }, role } = req;
        try {
            const deletedUser = await new services_1.UserService({ id, role }).delete();
            return res.status(types_1.StatusCode.OK).send(deletedUser);
        }
        catch (error) {
            if (error instanceof helpers_1.AppError)
                res.status(error.statusCode).json(error.message);
            res.status(Number(types_1.StatusCode.INTERNAL_SERVER_ERROR)).json(error);
        }
    }
}
exports.InternalUsersController = InternalUsersController;
class InternalBetsController {
    async delete(req, res) {
        const { params: { id }, role } = req;
        try {
            const betDeleted = await new services_1.BetService({ id, role }).delete();
            return res.status(types_1.StatusCode.OK)
                .send({ data: betDeleted, message: types_1.DefaultMessages.BET_DELETED });
        }
        catch (error) {
            res.status(Number(types_1.StatusCode.INTERNAL_SERVER_ERROR)).json(error);
        }
    }
}
exports.InternalBetsController = InternalBetsController;
class InternalGameController {
    async activate(req, res) {
        const { params: { id }, nick, role } = req;
        const data = { id, nick, role };
        try {
            const updatedGame = await new services_1.GameService(data).activateGame();
            return res.status(types_1.StatusCode.OK)
                .send({ data: updatedGame, message: types_1.DefaultMessages.GAME_ACTIVATED });
        }
        catch (error) {
            if (error instanceof helpers_1.AppError)
                res.status(error.statusCode).json(error.message);
            res.status(Number(types_1.StatusCode.INTERNAL_SERVER_ERROR)).json(error);
        }
    }
    async delete(req, res) {
        const { params: { id }, nick, role } = req;
        try {
            const deletedGame = await new services_1.GameService({ id, nick, role }).delete();
            return res.status(types_1.StatusCode.OK).send(deletedGame);
        }
        catch (error) {
            if (error instanceof helpers_1.AppError)
                res.status(error.statusCode).json(error.message);
            res.status(Number(types_1.StatusCode.INTERNAL_SERVER_ERROR)).json(error);
        }
    }
}
exports.InternalGameController = InternalGameController;
//# sourceMappingURL=internal.controller.js.map