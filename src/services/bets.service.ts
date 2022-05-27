import { StatusCode, BetsCreateDTO, BetsDeleteDTO, BetsGetDTO, BetsPatchDTO, BetsUpdateDTO } from "../types"
import { AppError } from "../helpers"
import { betsCreateValidation } from "../validations"
import { prisma } from "../config"

// TODO: Terminar bets services
export default class BetsService {
  params: BetsCreateDTO | BetsUpdateDTO
  constructor(params: BetsCreateDTO | BetsUpdateDTO) {
    this.params = params
  }

  async get(params = this.params) {
    console.log('get')
  }

  async create(params = this.params) {
    try {
      const {
        usersId,
        gameId,
        value
      } = betsCreateValidation.parse(params)

      // TODO: Utilizar um service de get futuramente
      const userExist = await prisma.users.findFirst({
        where: {
          id: usersId
        }
      });
      // TODO: Implementar verificar se o game existe ou esta ativo

      if (userExist) {
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

  async update(params = this.params) {
    console.log('update')
  }

  async patch(params = this.params) {
    console.log('patch')
  }

  async delete(params = this.params) {
    console.log('delete')
  }

}
