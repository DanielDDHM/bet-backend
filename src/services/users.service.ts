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
  confirmUserValidation,
} from "../validations";
import {
  UserGetDTO,
  AddressGetDTO,
  AddressCreateDTO,
  StatusCode,
  UserTypes,
  DefaultMessages,
  UserParams
} from "../types";

export default class UserService {
  params: UserParams
  constructor(params: UserParams) {
    this.params = params
  }

  async get(params = this.params) {

    const {
      id, email, nick, page, perPage, role
    } = getUserValidation.parse(params)

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
        return { users, total: total }
      }

      throw new AppError(DefaultMessages.NOT_PERMITED, StatusCode.NOT_ACCEPTABLE)

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
        address: { zipCode, streetNumber },
      } = createUserValidation.parse(params)

      const query = {
        name,
        nick,
        password: await new PasswordCrypt(password).crypt(),
        phone,
        email
      }

      const [existUser, existAddress] = await prisma.$transaction([
        prisma.users.findUnique({
          where: { nick }
        }),
        prisma.address.findFirst({
          where: {
            zipCode,
            streetNumber
          }
        })
      ])

      if (existUser) {
        throw new AppError(DefaultMessages.USER_EXISTS, StatusCode.BAD_REQUEST)
      }

      if (!existAddress) {
        const {
          data: {
            logradouro, bairro, localidade, uf
          } } = await new AddressFinder(zipCode).check()

        const addressCreated = await new AddressService({
          zipCode,
          streetNumber,
          street: logradouro,
          neighborhood: bairro,
          city: localidade,
          state: uf
        } as AddressCreateDTO).create();

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
        phone,
        photo,
        address
      } = userUpdateValidation.parse(params)

      const query = {
        name,
        nick,
        email,
        password: await new PasswordCrypt(password).crypt(),
        phone,
        photo
      }

      const userExists = await prisma.users.findUnique({
        where: { id }
      })

      if (!userExists) throw new AppError(DefaultMessages.USER_NOT_EXISTS, StatusCode.NOT_FOUND)

      if (address) {
        const addressFind = await prisma.address.findFirst({
          where: {
            OR: [
              { zipCode: address.zipCode },
              { streetNumber: address.streetNumber }
            ]
          }
        })

        const userUpdated = await prisma.users.update({
          where: {
            id: userExists.id
          },
          data: {
            ...query,
            addressId: addressFind?.id
          }
        })

        return userUpdated
      }

      const userUpdated = await prisma.users.update({
        where: {
          id
        },
        data: {
          ...query
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
      const { id, role } = activateUserValidation.parse(params)
      const user = await prisma.users.findUnique({
        where: { id },
      });

      if (!user) throw new AppError(DefaultMessages.USER_NOT_EXISTS, StatusCode.BAD_REQUEST)

      if (role !== UserTypes.ADMIN) {
        throw new AppError(DefaultMessages.NOT_PERMITED, StatusCode.BAD_REQUEST)
      }

      let activate;
      switch (user.isActive) {
        case true: activate = false
          break;
        case false: activate = true
          break;
      }

      const userActivated = await prisma.users.update({
        where: { id },
        data: { isActive: activate }
      })

      return userActivated

    } catch (error: any) {
      if (error instanceof AppError) throw new AppError(String(error.message), error.statusCode)
      throw new AppError(String(error.message), StatusCode.INTERNAL_SERVER_ERROR)
    }
  }

  async confirmUser(params = this.params) {
    try {
      const { id } = confirmUserValidation.parse(params)
      const user = await prisma.users.findUnique({
        where: { id },
      });

      if (!user) throw new AppError(DefaultMessages.USER_NOT_EXISTS, StatusCode.BAD_REQUEST)

      let confirm;
      switch (user.isConfirmed) {
        case false: confirm = true
          break;
        case true: break;
      }

      const userConfirmed = await prisma.users.update({
        where: { id },
        data: { isConfirmed: confirm }
      })

      return userConfirmed

    } catch (error: any) {
      if (error instanceof AppError) throw new AppError(String(error.message), error.statusCode)
      throw new AppError(String(error.message), StatusCode.INTERNAL_SERVER_ERROR)
    }
  }

  async delete(params = this.params) {
    const {
      id,
      email,
      password,
      role
    } = deleteUserValidation.parse(params)

    try {
      const user = await prisma.users.findUnique({
        where: { id },
      });

      if (!user) throw new AppError(DefaultMessages.USER_NOT_EXISTS, StatusCode.NOT_FOUND)

      if (role === UserTypes.ADMIN) {
        await prisma.users.delete({
          where: { id }
        })
        return `USER ${user?.nick} DELETED by ADMIN`
      }

      const verifyPass = await new PasswordCrypt(String(password), user?.password).compare()

      if (!verifyPass || user?.email !== email) {
        throw new AppError(DefaultMessages.NOT_PERMITED, StatusCode.BAD_REQUEST)
      }

      await prisma.users.delete({
        where: { id }
      })
      return `USER ${user?.nick} DELETED`
    } catch (error: any) {
      if (error instanceof AppError) throw new AppError(String(error.message), error.statusCode)
      throw new AppError(String(error.message), StatusCode.INTERNAL_SERVER_ERROR)
    }
  }

}
