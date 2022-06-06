import 'dotenv/config';
import jwt from 'jsonwebtoken';
// import fs from 'fs';
import { prisma } from '../config';
import { StatusCode, Login } from '../types';
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

      const tokenOnDb = await prisma.token.findUnique({
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
}
