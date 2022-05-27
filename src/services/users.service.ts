import { AddressFinder, AppError, PasswordCrypt } from "../helpers";
import { prisma } from "../config";
import { usersCreateValidation } from "../validations";
import { UserCreateDTO, UserUpdateDTO, UserPatchDTO, UserDeleteDTO, UserGetDTO, StatusCode } from "../types";
export default class UserService {
  params: UserCreateDTO | UserUpdateDTO
  constructor(params: UserCreateDTO | UserUpdateDTO) {
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

      console.log(password)

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
        const { data } = await new AddressFinder(address.zipCode).check()
        const { logradouro, bairro, localidade, uf } = data
        const addressCreated = await prisma.address.create({
          data: {
            ...address,
            street: logradouro,
            neighborhood: bairro,
            city: localidade,
            state: uf
          }
        });
        const userCreated = await prisma.users.create({
          data: {
            name,
            nick,
            password: await new PasswordCrypt(password).crypt(),
            email,
            contact,
            addressId: addressCreated.id
          }
        });
        console.log(password)
        return userCreated
      }

      const userCreated = await prisma.users.create({
        data: {
          name,
          nick,
          password: await new PasswordCrypt(password).crypt(),
          email,
          contact,
          addressId: existAddress.id
        }
      });
      return userCreated
    } catch (error: any) {
      if (error instanceof AppError) throw new AppError(String(error.message), error.statusCode)
      throw new AppError(String(error.message), StatusCode.INTERNAL_SERVER_ERROR)
    }
  }

  // TODO: Terminar user services
  async create(params = this.params) {
    console.log('create')
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

  async get(params = this.params) {
    console.log('get')
  }
}
