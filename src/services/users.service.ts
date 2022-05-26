import { StatusCode, UserInterface } from "../types";
import { AppError } from '../helpers';
import { prisma } from "../config";
import { usersCreateValidation } from "../validations";
export default class UserService {
  params: UserInterface
  constructor(params: UserInterface) {
    this.params = params
  }
  async createService(params = this.params) {
    try {
      const {
        name,
        nick,
        password,
        contact,
        email,
        address,
        // photo,
        // isActive,
        // isConfirmed,
        // isStaff,
      } = usersCreateValidation.parse(params)

      const [existNick, existUser, existAddress] = await Promise.all([
        await prisma.users.findFirst({
          where: {
            nick
          }
        }),
        await prisma.users.findFirst({
          where: {
            email
          }
        }),
        await prisma.address.findFirst({
          where: address
        })
      ])

      if (existUser || existNick) {
        throw new AppError('USER EXISTS', StatusCode.BAD_REQUEST)
      }

      if (!existAddress) {
        const addressCreated = await prisma.address.create({
          data: address
        });
        const userCreated = await prisma.users.create({
          data: {
            name,
            nick,
            password,
            email,
            contact,
            addressId: addressCreated.id
          }
        });
        return userCreated
      }

      const userCreated = await prisma.users.create({
        data: {
          name,
          nick,
          password,
          email,
          contact,
          addressId: existAddress.id
        }
      });
      return userCreated
    } catch (error: any) {
      throw new AppError(String(error.message), error.statusCode)
    }
  }

  // async updateService(params = this.params) { }
  // async patchService(params = this.params) { }
  // async deleteeService(params = this.params) { }
  // async getService(params = this.params) { }
}
