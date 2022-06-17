"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const services_1 = require("../services");
const helpers_1 = require("../helpers");
class GamesController {
    async get(req, res) {
        const { params: { id }, query } = req;
        try {
            const game = await new services_1.GameService({ id, ...query }).get();
            return res.status(types_1.StatusCode.OK).send(game);
        }
        catch (error) {
            if (error instanceof helpers_1.AppError)
                res.status(error.statusCode).json(error.message);
            res.status(Number(types_1.StatusCode.INTERNAL_SERVER_ERROR)).json(error);
        }
    }
    async create(req, res) {
        const { body, nick } = req;
        try {
            body.sortDate = new Date(body.sortDate);
            const gameCreated = await new services_1.GameService({ ...body, nick }).create();
            return res.status(types_1.StatusCode.OK)
                .send({ data: gameCreated, message: types_1.DefaultMessages.GAME_CREATED });
        }
        catch (error) {
            if (error instanceof helpers_1.AppError)
                res.status(error.statusCode).json(error.message);
            res.status(Number(types_1.StatusCode.INTERNAL_SERVER_ERROR)).json(error);
        }
    }
    async update(req, res) {
        const { params: { id }, body, nick, role } = req;
        if (typeof body.sortDate) {
            body.sortDate = new Date(body.sortDate);
        }
        const data = { id, nick, ...body, role };
        try {
            const updatedGame = await new services_1.GameService(data).update();
            return res.status(types_1.StatusCode.OK)
                .send({ data: updatedGame, message: types_1.DefaultMessages.GAME_UPDATED });
        }
        catch (error) {
            if (error instanceof helpers_1.AppError)
                res.status(error.statusCode).json(error.message);
            res.status(Number(types_1.StatusCode.INTERNAL_SERVER_ERROR)).json(error);
        }
    }
    async sort(req, res) {
        try {
            const { params: { id }, nick, role } = req;
            const data = { id, nick, role };
            const numberSorted = await new services_1.GameService(data).sort();
            return res.status(types_1.StatusCode.OK)
                .send({ data: numberSorted });
        }
        catch (error) {
            if (error instanceof helpers_1.AppError)
                res.status(error.statusCode).json(error.message);
            res.status(Number(types_1.StatusCode.INTERNAL_SERVER_ERROR)).json(error);
        }
    }
}
exports.default = GamesController;
//# sourceMappingURL=game.controller.js.map