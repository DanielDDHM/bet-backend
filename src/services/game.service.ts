import {
  StatusCode,
  GamesCreateDTO,
  GamesGetDTO,
  GamesUpdateDTO
} from "../types"
import { AppError } from "../helpers"
import {
  getGamesValidation,
  createGamesValidation,
  updateGamesValidation
} from "../validations"
import { prisma } from "../config"

// TODO: Terminar bets services
export default class GamesService {
  params: GamesCreateDTO | GamesGetDTO | GamesUpdateDTO
  constructor(params: GamesCreateDTO | GamesGetDTO | GamesUpdateDTO) {
    this.params = params
  }

  async get(params = this.params) {
    try {
      const { id } = getGamesValidation.parse(params)
      if (id) {
        const game = await prisma.game.findFirst({
          where: { id }
        })
        return game
      }

      const [total, games] = await Promise.all([
        await prisma.game.count(),
        await prisma.game.findMany()
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
        sortDate
      } = createGamesValidation.parse(params)

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
        isActive
      } = updateGamesValidation.parse(params)

      console.log(params)
      const gameExists = await prisma.game.findFirst({
        where: { id }
      })

      if (!gameExists) throw new AppError('GAME NOT EXISTS', StatusCode.NOT_FOUND)

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

  //   async patch(params = this.params) {
  //   console.log('patch')
  // }

  //   async delete (params = this.params) {
  //   console.log('delete')
  // }

}
