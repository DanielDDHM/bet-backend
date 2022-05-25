import AppError from "../../helpers/AppError";
import { StatusCode } from "../../types";
import { prisma } from '../../helpers';
import { UserParam } from "../../types";

export default class CreateService {
  //Atribuindo tipagens
  params: UserParam
  //Criando Constructor
  constructor(params: UserParam) {
    this.params = params
  }

  async createService(params = this.params) {
    try {
      const registerCreated = await prisma.users.create({
        data: {
          ...params
        }
      })
      return [registerCreated]
    } catch (error: any) {
      throw new AppError(String(error.messages), StatusCode.INTERNAL_SERVER_ERROR)
    }
  }
}
