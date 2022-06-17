"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const services_1 = require("../services");
const helpers_1 = require("../helpers");
class BetsController {
    async get(req, res) {
        const { query: { usersId, gameId, page, perPage }, role } = req;
        const data = {
            usersId,
            gameId,
            page: page ? Number(page) : 1,
            perPage: perPage ? Number(perPage) : 10,
        };
        try {
            const bet = await new services_1.BetService({ ...data, role }).get();
            return res.status(types_1.StatusCode.OK)
                .send({ data: bet, message: types_1.DefaultMessages.BET_FIND });
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
            const betCreated = await new services_1.BetService({ ...body, nick }).create();
            return res.status(types_1.StatusCode.OK)
                .send({ data: betCreated, message: types_1.DefaultMessages.BET_CREATED });
        }
        catch (error) {
            if (error instanceof helpers_1.AppError)
                res.status(error.statusCode).json(error.message);
            res.status(Number(types_1.StatusCode.INTERNAL_SERVER_ERROR)).json(error);
        }
    }
}
exports.default = BetsController;
//# sourceMappingURL=bets.controller.js.map