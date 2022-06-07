import {
  StatusCode,
  BetsCreateDTO,
  BetsGetDTO,
  GenericDeleteDTO,
  GamesGetDTO,
  DefaultMessages
} from "../types"
import { AppError } from "../helpers"
import {
  betsCreateValidation,
  getBetsValidation,
  betsDeleteValidation
} from "../validations"
import { prisma } from "../config"
export default class BetsService {
  params: BetsCreateDTO | GenericDeleteDTO | BetsGetDTO
  constructor(params: BetsCreateDTO | GenericDeleteDTO | BetsGetDTO) {
    this.params = params
  }

  async get(params = this.params) {
    const {
      usersId,
      gameId,
      page,
      perPage
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
        return { bets, Total: total }
      } else {
        const [bets, total] = await prisma.$transaction([
          prisma.bets.findMany({
            skip: (Number(page) - 1) * Number(perPage) || 0,
            take: Number(perPage) || 10,
          }),
          prisma.bets.count()
        ])
        return { bets, Total: total }
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
        value
      } = betsCreateValidation.parse(params)

      const [userExist, gameExist] = await Promise.all([
        await prisma.users.findFirst({
          where: {
            id: usersId
          }
        }),
        await this.get({ gameId } as GamesGetDTO)
      ])

      if (userExist && gameExist) {
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
      const { id } = betsDeleteValidation.parse(params)
      const existBet = await prisma.bets.findFirst({
        where: {
          id
        }
      })

      if (!existBet) throw new AppError(DefaultMessages.BET_NOT_EXISTS, StatusCode.NOT_FOUND)

      await prisma.bets.delete({
        where: {
          id
        }
      })

      return { message: `BET ${id} HAS DELETED` }
    } catch (error: any) {
      if (error instanceof AppError) throw new AppError(String(error.message), error.statusCode)
      throw new AppError(String(error.message), StatusCode.INTERNAL_SERVER_ERROR)
    }
  }

}
