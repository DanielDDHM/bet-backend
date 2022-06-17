"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const helpers_1 = require("../helpers");
const validations_1 = require("../validations");
const config_1 = require("../config");
class BetsService {
    constructor(params) {
        this.params = params;
    }
    async get(params = this.params) {
        const { usersId, gameId, page, perPage, role } = validations_1.getBetsValidation.parse(params);
        try {
            if (usersId || gameId) {
                const [bets, total] = await config_1.prisma.$transaction([
                    config_1.prisma.bets.findMany({
                        where: {
                            usersId,
                            gameId
                        },
                        skip: (Number(page) - 1) * Number(perPage) || 0,
                        take: Number(perPage) || 10,
                    }),
                    config_1.prisma.bets.count({
                        where: {
                            usersId,
                            gameId
                        }
                    }),
                ]);
                return { bets, Total: total, page: page, perPage: perPage };
            }
            else if (role === types_1.UserTypes.ADMIN) {
                const [bets, total] = await config_1.prisma.$transaction([
                    config_1.prisma.bets.findMany({
                        skip: (Number(page) - 1) * Number(perPage) || 0,
                        take: Number(perPage) || 10,
                    }),
                    config_1.prisma.bets.count()
                ]);
                return { bets, Total: total, page: page, perPage: perPage };
            }
        }
        catch (error) {
            if (error instanceof helpers_1.AppError)
                throw new helpers_1.AppError(String(error.message), error.statusCode);
            throw new helpers_1.AppError(String(error.message), types_1.StatusCode.INTERNAL_SERVER_ERROR);
        }
    }
    async create(params = this.params) {
        try {
            const { usersId, gameId, bet, value, nick } = validations_1.betsCreateValidation.parse(params);
            const [user, game] = await config_1.prisma.$transaction([
                config_1.prisma.users.findUnique({
                    where: { nick }
                }),
                config_1.prisma.game.findUnique({
                    where: { id: gameId }
                })
            ]);
            if (user && game) {
                if (user.id !== usersId)
                    throw new helpers_1.AppError(types_1.DefaultMessages.NOT_PERMITED, types_1.StatusCode.BAD_REQUEST);
                const betCreated = await config_1.prisma.bets.create({
                    data: {
                        usersId,
                        bet,
                        value,
                        gameId
                    }
                });
                return betCreated;
            }
        }
        catch (error) {
            if (error instanceof helpers_1.AppError)
                throw new helpers_1.AppError(String(error.message), error.statusCode);
            throw new helpers_1.AppError(String(error.message), types_1.StatusCode.INTERNAL_SERVER_ERROR);
        }
    }
    async delete(params = this.params) {
        try {
            const { id, role } = validations_1.betsDeleteValidation.parse(params);
            if (role !== types_1.UserTypes.ADMIN) {
                throw new helpers_1.AppError(types_1.DefaultMessages.NOT_PERMITED, types_1.StatusCode.BAD_REQUEST);
            }
            const bet = await config_1.prisma.bets.findUnique({
                where: { id }
            });
            if (!bet)
                throw new helpers_1.AppError(types_1.DefaultMessages.BET_NOT_EXISTS, types_1.StatusCode.NOT_FOUND);
            await config_1.prisma.bets.delete({
                where: { id }
            });
            return { message: `BET ${id} HAS DELETED` };
        }
        catch (error) {
            if (error instanceof helpers_1.AppError)
                throw new helpers_1.AppError(String(error.message), error.statusCode);
            throw new helpers_1.AppError(String(error.message), types_1.StatusCode.INTERNAL_SERVER_ERROR);
        }
    }
}
exports.default = BetsService;
//# sourceMappingURL=bets.service.js.map