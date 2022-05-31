import {
  StatusCode,
  BetsCreateDTO,
  BetsGetDTO,
  BetsDeleteDTO,
  GamesGetDTO
} from "../types"
import { AppError } from "../helpers"
import {
  betsCreateValidation,
  getBetsValidation,
  betsDeleteValidation
} from "../validations"
import { prisma } from "../config"
import GamesService from "./game.service"

// TODO: Terminar bets services
export default class BetsService {
  params: BetsCreateDTO | BetsDeleteDTO | BetsGetDTO
  constructor(params: BetsCreateDTO | BetsDeleteDTO | BetsGetDTO) {
    this.params = params
  }

  async get(params = this.params) {
    const {
      usersId,
      gameId
    } = getBetsValidation.parse(params)
    try {
      if (usersId || gameId) {
        const [bets, total] = await Promise.all([
          await prisma.bets.findMany({
            where: {
              usersId,
              gameId
            }
          }),
          await prisma.bets.count({
            where: {
              usersId,
              gameId
            }
          }),
        ])
        return { bets, Total: total }
      } else {
        const [bets, total] = await Promise.all([
          await prisma.bets.findMany(),
          await prisma.bets.count()
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
        value
      } = betsCreateValidation.parse(params)

      const [userExist, gameExist] = await Promise.all([
        await prisma.users.findFirst({
          where: {
            id: usersId
          }
        }),
        await new GamesService(gameId as GamesGetDTO).get()
      ])
      // TODO: Implementar verificar se o game existe ou esta ativo

      if (userExist && gameExist) {
        const betCreated = await prisma.bets.create({
          data: {
            usersId,
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

      if (existBet) throw new AppError('BET DOENSN`T EXISTS', StatusCode.NOT_FOUND)

      await prisma.bets.delete({
        where: {
          id
        }
      })

      return { message: 'BET HAS DELETED' }
    } catch (error: any) {
      if (error instanceof AppError) throw new AppError(String(error.message), error.statusCode)
      throw new AppError(String(error.message), StatusCode.INTERNAL_SERVER_ERROR)
    }
  }

}
