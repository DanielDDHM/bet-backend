import { StatusCode, UserInterface } from "../types";
import { AppError, prisma } from '../helpers';
export default class UserService {
  params: UserInterface
  constructor(params: UserInterface) {
    this.params = params
  }
  async createService(params = this.params) {
    console.log(`bateu`, params)
    try {
      const registerCreated = await prisma.users.create({
        data: {
          ...params
        }
      })
      return [registerCreated]
    } catch (error: any) {
      throw new AppError(String(error.message), StatusCode.INTERNAL_SERVER_ERROR)
    }
  }
}
