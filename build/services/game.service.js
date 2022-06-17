"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const validations_1 = require("../validations");
const config_1 = require("../config");
const helpers_1 = require("../helpers");
const generators_1 = __importDefault(require("../helpers/generators"));
class GamesService {
    constructor(params) {
        this.params = params;
    }
    async get(params = this.params) {
        try {
            const { id, page, perPage } = validations_1.getGamesValidation.parse(params);
            if (id) {
                const game = await config_1.prisma.game.findFirst({
                    where: { id }
                });
                return game;
            }
            const [total, games] = await config_1.prisma.$transaction([
                config_1.prisma.game.count(),
                config_1.prisma.game.findMany({
                    skip: (Number(page) - 1) * Number(perPage) || 0,
                    take: Number(perPage) || 10,
                })
            ]);
            return { games, total: total };
        }
        catch (error) {
            if (error instanceof helpers_1.AppError)
                throw new helpers_1.AppError(String(error.message), error.statusCode);
            throw new helpers_1.AppError(String(error.message), types_1.StatusCode.INTERNAL_SERVER_ERROR);
        }
    }
    async create(params = this.params) {
        try {
            const { name, ownerId, prize, sortDate, numbers, nick } = validations_1.createGamesValidation.parse(params);
            const user = await config_1.prisma.users.findUnique({
                where: { nick }
            });
            if (!user)
                throw new helpers_1.AppError(types_1.DefaultMessages.USER_NOT_EXISTS, types_1.StatusCode.NOT_FOUND);
            if (user.id !== ownerId) {
                throw new helpers_1.AppError(types_1.DefaultMessages.NOT_PERMITED, types_1.StatusCode.BAD_REQUEST);
            }
            const gameCreated = await config_1.prisma.game.create({
                data: {
                    name,
                    ownerId,
                    prize,
                    sortDate,
                    numbers
                }
            });
            return gameCreated;
        }
        catch (error) {
            if (error instanceof helpers_1.AppError)
                throw new helpers_1.AppError(String(error.message), error.statusCode);
            throw new helpers_1.AppError(String(error.message), types_1.StatusCode.INTERNAL_SERVER_ERROR);
        }
    }
    async update(params = this.params) {
        try {
            const { id, prize, sortDate, winner, prizePhoto, role, nick } = validations_1.updateGamesValidation.parse(params);
            const [user, game] = await config_1.prisma.$transaction([
                config_1.prisma.users.findUnique({
                    where: { nick }
                }),
                config_1.prisma.game.findUnique({
                    where: { id }
                })
            ]);
            if (!game)
                throw new helpers_1.AppError(types_1.DefaultMessages.GAME_NOT_EXISTS, types_1.StatusCode.NOT_FOUND);
            if (user?.id !== game.ownerId || role !== types_1.UserTypes.ADMIN) {
                throw new helpers_1.AppError(types_1.DefaultMessages.NOT_PERMITED, types_1.StatusCode.BAD_REQUEST);
            }
            const gameUpdate = await config_1.prisma.game.update({
                where: {
                    id
                },
                data: {
                    prize,
                    sortDate,
                    winner,
                    prizePhoto
                }
            });
            return gameUpdate;
        }
        catch (error) {
            if (error instanceof helpers_1.AppError)
                throw new helpers_1.AppError(String(error.message), error.statusCode);
            throw new helpers_1.AppError(String(error.message), types_1.StatusCode.INTERNAL_SERVER_ERROR);
        }
    }
    async activateGame(params = this.params) {
        try {
            const { id, nick, role } = validations_1.activateGameValidation.parse(params);
            const [game, user] = await config_1.prisma.$transaction([
                config_1.prisma.game.findUnique({
                    where: { id },
                }),
                config_1.prisma.users.findUnique({
                    where: { nick },
                })
            ]);
            let activate;
            switch (game?.isActive) {
                case false:
                    activate = true;
                    break;
                case true:
                    activate = false;
                    break;
            }
            if (game?.ownerId !== user?.id || role !== types_1.UserTypes.ADMIN) {
                throw new helpers_1.AppError(types_1.DefaultMessages.NOT_PERMITED, types_1.StatusCode.BAD_REQUEST);
            }
            if (!game)
                throw new helpers_1.AppError(types_1.DefaultMessages.GAME_NOT_EXISTS, types_1.StatusCode.BAD_REQUEST);
            await config_1.prisma.game.update({
                where: { id },
                data: { isActive: activate }
            });
            return { id: id, Status: activate, updatedAt: game?.updatedAt };
        }
        catch (error) {
            if (error instanceof helpers_1.AppError)
                throw new helpers_1.AppError(String(error.message), error.statusCode);
            throw new helpers_1.AppError(String(error.message), types_1.StatusCode.INTERNAL_SERVER_ERROR);
        }
    }
    async delete(params = this.params) {
        const { id, nick, role } = validations_1.deleteGamesValidation.parse(params);
        try {
            const [user, game] = await config_1.prisma.$transaction([
                config_1.prisma.users.findUnique({
                    where: { nick }
                }),
                config_1.prisma.game.findFirst({
                    where: { id }
                })
            ]);
            if (!game)
                throw new helpers_1.AppError(types_1.DefaultMessages.GAME_NOT_EXISTS, types_1.StatusCode.NOT_FOUND);
            if (user?.id !== game.ownerId || role !== types_1.UserTypes.ADMIN) {
                throw new helpers_1.AppError(types_1.DefaultMessages.NOT_PERMITED, types_1.StatusCode.BAD_REQUEST);
            }
            await config_1.prisma.game.delete({
                where: { id },
            });
            return { message: `GAME ${String(game.name).toUpperCase()} DELETED` };
        }
        catch (error) {
            if (error instanceof helpers_1.AppError)
                throw new helpers_1.AppError(String(error.message), error.statusCode);
            throw new helpers_1.AppError(String(error.message), types_1.StatusCode.INTERNAL_SERVER_ERROR);
        }
    }
    async sort(params = this.params) {
        const { id, nick, role } = validations_1.sortValidation.parse(params);
        const [game, user] = await config_1.prisma.$transaction([
            config_1.prisma.game.findUnique({
                where: { id }
            }),
            config_1.prisma.users.findUnique({
                where: { nick }
            })
        ]);
        if (game?.ownerId === user?.id || role === types_1.UserTypes.ADMIN) {
            const sortedNumber = await new generators_1.default(game?.numbers).numberGenerator();
            const winner = await config_1.prisma.bets.findMany({
                where: {
                    AND: [
                        { gameId: id },
                        { bet: sortedNumber },
                        { status: types_1.DefaultStatus.CREATED }
                    ]
                }
            });
            for (const win of winner) {
                await config_1.prisma.bets.update({
                    where: { id: win.id },
                    data: { winner: true }
                });
            }
            return { message: `SORTED NUMBER HAS ${sortedNumber}`, winners: winner };
        }
    }
    catch(error) {
        if (error instanceof helpers_1.AppError)
            throw new helpers_1.AppError(String(error.message), error.statusCode);
        throw new helpers_1.AppError(String(error.message), types_1.StatusCode.INTERNAL_SERVER_ERROR);
    }
}
exports.default = GamesService;
//# sourceMappingURL=game.service.js.map