import jwt from 'jwt-simple';
import { prisma } from '../config';
import { StatusCode, Login } from '../types';
import AppError from './AppError';
import bcrypt from 'bcrypt';
import 'dotenv/config';

export default class Auth {
  payload: Login
  headers?: any
  AUTH_SECRET?: any

  constructor(payload: Login, headers: any) {
    this.payload = payload
    this.headers = headers
    this.AUTH_SECRET = process.env.AUTH_SECRET
  }

  // TODO: Verificar o Auth
  async signIn(payload = this.payload) {
    const { email, nick, password } = payload
    const exp = (60 * 60 * 24 * 3);
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

      const passMatch = bcrypt.compareSync(password, user.password)

      if (!passMatch) throw new AppError('WRONG PASS', StatusCode.BAD_REQUEST);

      const data = {
        ...payload,
        iat: Date.now(),
        exp: Date.now() + exp,
        token: jwt.encode(payload, String(this.AUTH_SECRET))
      }

      return data;
    } catch (error: any) {
      throw new AppError(String(error.message), StatusCode.BAD_REQUEST)
    }
  }

  async validateToken(headers = this.headers) {
    try {
      const { token } = headers;
      if (!token) throw new AppError('MISSING TOKEN', StatusCode.BAD_REQUEST);

      const tokenValidate = await jwt.decode(token, this.AUTH_SECRET);

      if (tokenValidate?.exp > Date.now()) return true

    } catch (error: any) {
      throw new AppError(String(error.message), StatusCode.BAD_REQUEST)
    }
  }
}
