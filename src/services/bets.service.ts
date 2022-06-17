import {
  StatusCode,
  DefaultMessages,
  UserTypes,
  BetParams,
} from "../types"
import { AppError } from "../helpers"
import {
  betsCreateValidation,
  getBetsValidation,
  betsDeleteValidation
} from "../validations"
import { prisma } from "../config"
export default class BetsService {
  params: BetParams
  constructor(params: BetParams) {
    this.params = params
  }

  async get(params = this.params) {
    const {
      usersId,
      gameId,
      page,
      perPage,
      role
    } = getBetsValidation.parse(params)
    try {
      if (usersId || gameId) {
        const [bets, total] = await prisma.$transaction([
          prisma.bets.findMany({
            where: {
              usersId,
              gameId
            },
            skip: (Number(page) - 1) * Number(perPage) || 0,
            take: Number(perPage) || 10,
          }),
          prisma.bets.count({
            where: {
              usersId,
              gameId
            }
          }),
        ])

        return { bets, Total: total, page: page, perPage: perPage }
      } else if (role === UserTypes.ADMIN) {
        const [bets, total] = await prisma.$transaction([
          prisma.bets.findMany({
            skip: (Number(page) - 1) * Number(perPage) || 0,
            take: Number(perPage) || 10,
          }),
          prisma.bets.count()
        ])
        return { bets, Total: total, page: page, perPage: perPage }
      }

    } catch (error: any) {
      if (error instanceof AppError) throw new AppError(String(error.message), error.statusCode)
      throw new AppError(String(error.message), StatusCode.INTERNAL_SERVER_ERROR)
    }
  }

  async create(params = this.params) {
    try {
      const {
        usersId,
        gameId,
        bet,
        value,
        nick
      } = betsCreateValidation.parse(params)

      const [user, game] = await prisma.$transaction([
        prisma.users.findUnique({
          where: { nick }
        }),
        prisma.game.findUnique({
          where: { id: gameId }
        })
      ])

      if (user && game) {
        if (user.id !== usersId) throw new AppError(DefaultMessages.NOT_PERMITED, StatusCode.BAD_REQUEST)

        const betCreated = await prisma.bets.create({
          data: {
            usersId,
            bet,
            value,
            gameId
          }
        });

        return betCreated
      }
    } catch (error: any) {
      if (error instanceof AppError) throw new AppError(String(error.message), error.statusCode)
      throw new AppError(String(error.message), StatusCode.INTERNAL_SERVER_ERROR)
    }
  }

  async delete(params = this.params) {
    try {
      const { id, role } = betsDeleteValidation.parse(params)

      if (role !== UserTypes.ADMIN) {
        throw new AppError(DefaultMessages.NOT_PERMITED, StatusCode.BAD_REQUEST)
      }

      const bet = await prisma.bets.findUnique({
        where: { id }
      });

      if (!bet) throw new AppError(DefaultMessages.BET_NOT_EXISTS, StatusCode.NOT_FOUND)

      await prisma.bets.delete({
        where: { id }
      })

      return { message: `BET ${id} HAS DELETED` }
    } catch (error: any) {
      if (error instanceof AppError) throw new AppError(String(error.message), error.statusCode)
      throw new AppError(String(error.message), StatusCode.INTERNAL_SERVER_ERROR)
    }
  }

}
