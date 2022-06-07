import {
  AddressFinder,
  AppError,
  PasswordCrypt
} from "../helpers";
import { AddressService } from "./index";
import { prisma } from "../config";
import {
  createUserValidation,
  getUserValidation,
  userUpdateValidation,
  deleteUserValidation,
  activateUserValidation,
  PaginateValidation,
  VerifyValidation
} from "../validations";
import {
  StatusCode,
  UserCreateDTO,
  UserUpdateDTO,
  UserGetDTO,
  GetAddressDTO,
  CreateAddressDTO,
  UserTypes,
  UserDeleteDTO,
  DefaultMessages
} from "../types";

export default class UserService {
  params: UserGetDTO | UserCreateDTO | UserUpdateDTO | UserDeleteDTO
  constructor(params: UserGetDTO | UserCreateDTO | UserUpdateDTO | UserDeleteDTO) {
    this.params = params
  }

  async get(params = this.params) {
    const {
      email, nick, id
    } = getUserValidation.parse(params)
    const { page, perPage } = PaginateValidation.parse(params)
    const { role } = VerifyValidation.parse(params)
    try {
      if (email || nick || id) {
        const user = await prisma.users.findFirst({
          where: {
            OR: [
              { id },
              { email },
              { nick }
            ]
          },
        });
        return user
      } else if (role === UserTypes.ADMIN) {
        const [users, total] = await prisma.$transaction([
          prisma.users.findMany({
            skip: (Number(page) - 1) * Number(perPage) || 0,
            take: Number(perPage) || 10,
          }),
          prisma.users.count()
        ])
        return { users, Total: total }
      }
      return { message: DefaultMessages.NOT_STAFF }
    } catch (error: any) {
      if (error instanceof AppError) throw new AppError(String(error.message), error.statusCode)
      throw new AppError(String(error.message), StatusCode.INTERNAL_SERVER_ERROR)
    }
  }

  async create(params = this.params) {
    try {
      const {
        name,
        nick,
        password,
        phone,
        email,
        address,
      } = createUserValidation.parse(params)

      const { zipCode, streetNumber } = address

      const query = {
        name,
        nick,
        password: await new PasswordCrypt(password).crypt(),
        phone,
        email
      }

      const [existUser, existAddress] = await Promise.all([
        await this.get({ email, nick } as UserGetDTO),
        await new AddressService({ zipCode, streetNumber } as GetAddressDTO).get()
      ])

      if (existUser) {
        throw new AppError(DefaultMessages.USER_EXISTS, StatusCode.BAD_REQUEST)
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
            ...query,
            addressId: addressCreated.id
          }
        });
        return userCreated
      }

      const userCreated = await prisma.users.create({
        data: {
          ...query,
          addressId: existAddress.id,
        }
      });

      return userCreated
    } catch (error: any) {
      if (error instanceof AppError) throw new AppError(String(error.message), error.statusCode)
      throw new AppError(String(error.message), StatusCode.INTERNAL_SERVER_ERROR)
    }
  }
  async update(params = this.params) {
    try {
      const {
        id,
        name,
        nick,
        email,
        password,
        isActive,
        isConfirmed,
        isStaff,
        phone,
        photo,
        address
      } = userUpdateValidation.parse(params)

      const query = {
        name,
        nick,
        email,
        password: await new PasswordCrypt(password).crypt(),
        isActive,
        isConfirmed,
        isStaff,
        phone,
        photo
      }

      const [userExists, addressExists] = await Promise.all([
        await this.get({ id } as UserGetDTO),
        await new AddressService(address as GetAddressDTO).get()
      ])

      if (!userExists) throw new AppError(DefaultMessages.USER_NOT_EXISTS, StatusCode.NOT_FOUND)
      if (!addressExists) {
        const createdAddress = await new AddressService(address as CreateAddressDTO).create()
        const userUpdated = await prisma.users.update({
          where: {
            id
          },
          data: {
            ...query,
            addressId: createdAddress.id
          }
        })

        return userUpdated
      }

      const userUpdated = await prisma.users.update({
        where: {
          id
        },
        data: {
          ...query,
          addressId: addressExists.id
        }
      })

      return userUpdated

    } catch (error: any) {
      if (error instanceof AppError) throw new AppError(String(error.message), error.statusCode)
      throw new AppError(String(error.message), StatusCode.INTERNAL_SERVER_ERROR)
    }
  }

  async activateUser(params = this.params) {
    try {
      const { id, isConfirmed } = activateUserValidation.parse(params)
      const user = await prisma.users.findFirst({
        where: { id },
      });

      if (!user) throw new AppError(DefaultMessages.USER_NOT_EXISTS, StatusCode.BAD_REQUEST)

      await prisma.users.update({
        where: { id },
        data: { isConfirmed }
      })

      return { id, isConfirmed }

    } catch (error: any) {
      if (error instanceof AppError) throw new AppError(String(error.message), error.statusCode)
      throw new AppError(String(error.message), StatusCode.INTERNAL_SERVER_ERROR)
    }
  }

  async delete(params = this.params) {
    const {
      id,
      email,
      password
    } = deleteUserValidation.parse(params)

    const { role } = VerifyValidation.parse(params)

    try {
      const user = await prisma.users.findUnique({
        where: { id },
      });

      if (!user) throw new AppError(DefaultMessages.USER_NOT_EXISTS, StatusCode.NOT_FOUND)

      const verifyPass = await new PasswordCrypt(String(password), user?.password).compare()

      if (!verifyPass || user?.email != email || role !== UserTypes.ADMIN) {
        throw new AppError(DefaultMessages.NOT_PERMITED, StatusCode.BAD_REQUEST)
      }

      await prisma.users.delete({
        where: {
          id
        }
      })
      return `USER ${user?.nick} DELETED`
    } catch (error: any) {
      if (error instanceof AppError) throw new AppError(String(error.message), error.statusCode)
      throw new AppError(String(error.message), StatusCode.INTERNAL_SERVER_ERROR)
    }
  }
}
