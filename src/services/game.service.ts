import {
  StatusCode,
  GameParams,
  UserTypes,
  DefaultMessages
} from "../types"
import {
  getGamesValidation,
  createGamesValidation,
  updateGamesValidation,
  deleteGamesValidation,
  activateGameValidation
} from "../validations"
import { prisma } from "../config"
import { AppError } from "../helpers"

export default class GamesService {
  params: GameParams
  constructor(params: GameParams) {
    this.params = params
  }

  async get(params = this.params) {
    try {
      const { id, page, perPage } = getGamesValidation.parse(params)

      if (id) {
        const game = await prisma.game.findFirst({
          where: { id }
        })
        return game
      }

      const [total, games] = await prisma.$transaction([
        prisma.game.count(),
        prisma.game.findMany({
          skip: (Number(page) - 1) * Number(perPage) || 0,
          take: Number(perPage) || 10,
        })
      ])

      return { games, Total: total }

    } catch (error: any) {
      if (error instanceof AppError) throw new AppError(String(error.message), error.statusCode)
      throw new AppError(String(error.message), StatusCode.INTERNAL_SERVER_ERROR)
    }
  }

  async create(params = this.params) {
    try {
      const {
        name,
        ownerId,
        prize,
        sortDate,
        nick
      } = createGamesValidation.parse(params)

      const user = await prisma.users.findUnique({
        where: { nick }
      })

      if (!user) throw new AppError(DefaultMessages.USER_NOT_EXISTS, StatusCode.NOT_FOUND)

      if (user.id !== ownerId) throw new AppError(DefaultMessages.NOT_PERMITED, StatusCode.BAD_REQUEST)

      const gameCreated = await prisma.game.create({
        data: {
          name,
          ownerId,
          prize,
          sortDate
        }
      })

      return gameCreated
    } catch (error: any) {
      if (error instanceof AppError) throw new AppError(String(error.message), error.statusCode)
      throw new AppError(String(error.message), StatusCode.INTERNAL_SERVER_ERROR)
    }
  }

  async update(params = this.params) {
    try {
      const {
        id,
        prize,
        sortDate,
        winner,
        prizePhoto,
        isActive,
        role,
        nick
      } = updateGamesValidation.parse(params)

      const [user, game] = await prisma.$transaction([
        prisma.users.findUnique({
          where: { nick }
        }),
        prisma.game.findFirst({
          where: { id }
        })
      ])

      if (!game) throw new AppError(DefaultMessages.GAME_NOT_EXISTS, StatusCode.NOT_FOUND)

      if (user?.id !== game.ownerId || role !== UserTypes.ADMIN) {
        throw new AppError(DefaultMessages.NOT_PERMITED, StatusCode.BAD_REQUEST)
      }

      const gameUpdate = await prisma.game.update({
        where: {
          id
        },
        data: {
          prize,
          sortDate,
          winner,
          prizePhoto,
          isActive
        }
      })

      return gameUpdate

    } catch (error: any) {
      if (error instanceof AppError) throw new AppError(String(error.message), error.statusCode)
      throw new AppError(String(error.message), StatusCode.INTERNAL_SERVER_ERROR)
    }
  }

  async activateGame(params = this.params) {
    try {
      const { id, nick, role } = activateGameValidation.parse(params)

      const [game, user] = await prisma.$transaction([
        prisma.game.findUnique({
          where: { id },
        }),
        prisma.users.findUnique({
          where: { nick },
        })
      ])

      let activate;
      switch (game?.isActive) {
        case false: activate = true
          break;
        case true: activate = false
          break;
      }

      if (game?.ownerId !== user?.id || role !== UserTypes.ADMIN) {
        throw new AppError(DefaultMessages.NOT_PERMITED, StatusCode.BAD_REQUEST)
      }

      if (!game) throw new AppError(DefaultMessages.GAME_NOT_EXISTS, StatusCode.BAD_REQUEST)

      const gameActivated = await prisma.game.update({
        where: { id },
        data: { isActive: activate }
      })

      return gameActivated

    } catch (error: any) {
      if (error instanceof AppError) throw new AppError(String(error.message), error.statusCode)
      throw new AppError(String(error.message), StatusCode.INTERNAL_SERVER_ERROR)
    }
  }

  async delete(params = this.params) {
    const { id, nick, role } = deleteGamesValidation.parse(params)

    try {
      const [user, game] = await prisma.$transaction([
        prisma.users.findUnique({
          where: { nick }
        }),
        prisma.game.findFirst({
          where: { id }
        })
      ])

      if (!game) throw new AppError(DefaultMessages.GAME_NOT_EXISTS, StatusCode.NOT_FOUND)

      if (user?.id !== game.ownerId || role !== UserTypes.ADMIN) {
        throw new AppError(DefaultMessages.NOT_PERMITED, StatusCode.BAD_REQUEST)
      }
      await prisma.game.delete({
        where: { id },
      });

      return `GAME ${game.name} DELETED`
    } catch (error: any) {
      if (error instanceof AppError) throw new AppError(String(error.message), error.statusCode)
      throw new AppError(String(error.message), StatusCode.INTERNAL_SERVER_ERROR)
    }
  }

}
