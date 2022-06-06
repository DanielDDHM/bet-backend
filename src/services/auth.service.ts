import 'dotenv/config';
import jwt from 'jsonwebtoken';
// import fs from 'fs';
import { prisma } from '../config';
import { StatusCode, Login, UserTypes } from '../types';
import { PasswordCrypt, AppError } from '../helpers';

export default class Auth {
  payload: Login
  headers?: any
  body?: any
  AUTH_SECRET?: any

  constructor(payload?: any, headers?: any) {
    this.payload = payload
    this.headers = headers
    this.AUTH_SECRET = process.env.AUTH_SECRET
    // TODO: verificar para colocar pela pem fs.readFileSync('../../security/public.pem')
  }

  async login(payload = this.payload) {
    const { email, nick, password } = payload
    const date = new Date()

    // O fator de expiracao setado em 2 horas
    const expTime = (1000 * 60 * 60 * 2);
    try {
      const user = await prisma.users.findFirst({
        where: {
          OR: [
            { email },
            { nick }
          ]
        }
      })

      const tokenOnDb = await prisma.token.findFirst({
        where: {
          usersId: user?.id
        }
      })

      if (!user) throw new AppError('USER NOT FOUND', StatusCode.NOT_FOUND);
      const passMatch = await new PasswordCrypt(password, user.password).compare();
      if (!passMatch) throw new AppError('WRONG PASS', StatusCode.BAD_REQUEST);

      const data = {
        data: nick,
        iat: date.getTime(),
        exp: date.setTime(date.getTime() + expTime),
      }

      const token = jwt.sign(data, String(this.AUTH_SECRET))

      if (!tokenOnDb) {
        const tokenCreated = await prisma.token.create({
          data: {
            usersId: user.id,
            token,
            expDate: new Date(data.exp)
          }
        })
        return { auth: true, tokenCreated };
      } else if (tokenOnDb) {
        const tokenUpdated = await prisma.token.update({
          where: {
            id: tokenOnDb.id
          },
          data: {
            token,
            expDate: new Date(data.exp)
          }
        })
        return { auth: true, tokenUpdated };
      }

    } catch (error: any) {
      throw new AppError(String(error.message), StatusCode.BAD_REQUEST)
    }
  }

  async verifyToken(headers = this.headers) {
    try {
      const { token } = headers
      if (!token) throw new AppError('NO TOKEN PROVIDED', StatusCode.UNAUTHORIZED);

      const tokenOnDb = await prisma.token.findFirst({
        where: {
          token
        }
      })

      if (!tokenOnDb) throw new AppError('INVALID TOKEN', StatusCode.BAD_REQUEST);
      const verify = jwt.verify(token, this.AUTH_SECRET)

      if (!verify) {
        await this.logout(token)
        throw new AppError('YOUR LOGIN HAS EXPIRED', StatusCode.BAD_REQUEST);
      }

      return { auth: true, decodedToken: verify }
    } catch (error: any) {
      throw new AppError(String(error.message), StatusCode.INTERNAL_SERVER_ERROR)
    }
  }

  async logout(body: any) {
    try {
      const { token } = body
      await prisma.token.delete({
        where: {
          token
        }
      })
      return { auth: false, token: null };
    } catch (error: any) {
      throw new AppError(String(error.message), StatusCode.INTERNAL_SERVER_ERROR)
    }
  }

  async checkRole(headers = this.headers) {
    try {
      const { nick } = headers

      const user = await prisma.users.findFirst({
        where: {
          nick
        }
      })

      if (user?.isActive && user?.isConfirmed && user?.isStaff) {
        return UserTypes.ADMIN;
      } else if (user?.isActive && user?.isConfirmed && !user.isStaff) {
        return UserTypes.USER
      } else {
        throw new AppError('USER NOT FIND', StatusCode.BAD_REQUEST)
      }

    } catch (error: any) {
      throw new AppError(String(error.message), StatusCode.INTERNAL_SERVER_ERROR)
    }
  }
}
