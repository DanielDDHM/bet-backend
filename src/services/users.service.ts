import {
  AddressFinder,
  AppError,
  PasswordCrypt
} from "../helpers";
import { AddressService } from "./index";
import { prisma } from "../config";
import {
  createUserValidation,
  getUserValidation
} from "../validations";
import {
  StatusCode,
  UserCreateDTO,
  UserUpdateDTO,
  UserGetDTO,
  GetAddressDTO,
  CreateAddressDTO
} from "../types";
export default class UserService {
  params: UserCreateDTO | UserUpdateDTO | UserGetDTO
  constructor(params: UserCreateDTO | UserUpdateDTO | UserGetDTO) {
    this.params = params
  }

  async get(params = this.params) {
    const { email, nick, id } = getUserValidation.parse(params)
    try {
      if (email || nick || id) {
        const user = await prisma.users.findFirst({
          where: {
            OR: [
              { email },
              { nick },
              { id }
            ]
          }
        });
        return user
      } else {
        const [users, total] = await Promise.all([
          await prisma.users.findMany(),
          await prisma.users.count()
        ])
        console.log(users, total)
        return [{ users, Total: total }]
      }
    } catch (error: any) {
      throw new AppError(String(error.message), StatusCode.INTERNAL_SERVER_ERROR)
    }
  }

  async create(params = this.params) {
    try {
      const {
        name,
        nick,
        password,
        contact,
        email,
        address,
      } = createUserValidation.parse(params)

      const { zipCode, streetNumber } = address

      const [existUser, existAddress] = await Promise.all([
        await this.get({ email, nick } as UserGetDTO),
        await new AddressService({ zipCode, streetNumber } as GetAddressDTO).get()
      ])

      console.log(existAddress, existUser)

      if (existUser) {
        throw new AppError('USER EXISTS', StatusCode.BAD_REQUEST)
      }

      if (!existAddress) {
        const { data } = await new AddressFinder(address.zipCode).check()
        const { logradouro, bairro, localidade, uf } = data
        const addressCreated = await new AddressService({
          ...address,
          street: logradouro,
          neighborhood: bairro,
          city: localidade,
          state: uf
        } as CreateAddressDTO).create();

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

  // async update(params = this.params) {
  //   console.log('update')
  // }

  // async patch(params = this.params) {
  //   console.log('patch')
  // }

  // async delete(params = this.params) {
  //   console.log('delete')
  // }
}
