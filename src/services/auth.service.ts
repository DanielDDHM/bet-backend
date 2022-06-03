import jwt from 'jsonwebtoken';
import { prisma } from '../config';
import { StatusCode, Login } from '../types';
import AppError from '../helpers/AppError';
import 'dotenv/config';
import { PasswordCrypt } from '../helpers';

export default class Auth {
  payload: Login
  headers?: any
  body?: any
  AUTH_SECRET?: any

  constructor(payload?: any, headers?: any) {
    this.payload = payload
    this.headers = headers
    this.AUTH_SECRET = process.env.AUTH_SECRET
  }

  async login(payload = this.payload) {
    const { email, nick, password } = payload

    const exp = (1000 * 60 * 60 * 2);  // O fator de expiracao setado em 2 horas
    try {
      const user = await prisma.users.findFirst({
        where: {
          OR: [
            { email },
            { nick }
          ]
        }
      })

      if (!user) throw new AppError('USER NOT FOUND', StatusCode.NOT_FOUND);
      const passMatch = await new PasswordCrypt(password, user.password).compare();
      if (!passMatch) throw new AppError('WRONG PASS', StatusCode.BAD_REQUEST);

      const data = {
        data: nick,
        iat: Date.now(),
        exp: Date.now() + exp,
      }
      const token = jwt.sign(data, String(this.AUTH_SECRET))

      // TODO: Verificar a possibilidade de mudar para o token cacheado em REDIS
      await prisma.users.update({
        where: {
          id: user?.id
        },
        data: {
          token
        }
      })

      return { auth: true, token };
    } catch (error: any) {
      throw new AppError(String(error.message), StatusCode.BAD_REQUEST)
    }
  }

  async verifyToken(headers = this.headers) {
    try {
      const { token } = headers
      if (!token) throw new AppError('NO TOKEN PROVIDED', StatusCode.UNAUTHORIZED);

      const tokenOnDb = await prisma.users.findFirst({
        where: {
          token
        }
      })

      if (!tokenOnDb) throw new AppError('INVALID TOKEN', StatusCode.BAD_REQUEST)

      const verify = jwt.verify(token, this.AUTH_SECRET)

      if (verify) {
        const { data, exp } = verify;
        if (Date.now() > exp) await this.logout(data)
      } else {
        throw new AppError('FAILED TO AUTH CODE', StatusCode.BAD_REQUEST)
      }

      return { auth: true, decodedToken: verify }
    } catch (error: any) {

      throw new AppError(String(error.message), StatusCode.INTERNAL_SERVER_ERROR)
    }
  }

  async logout(nick: any) {
    try {
      await prisma.users.update({
        where: {
          nick
        },
        data: {
          token: null
        }
      })
      return { auth: false, token: null };
    } catch (error: any) {
      throw new AppError(String(error.message), StatusCode.INTERNAL_SERVER_ERROR)
    }
  }
}
