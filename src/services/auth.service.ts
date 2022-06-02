import jwt from 'jsonwebtoken';
import { prisma } from '../config';
import { StatusCode, Login } from '../types';
import AppError from '../helpers/AppError';
import 'dotenv/config';
import { PasswordCrypt } from '../helpers';

export default class Auth {
  payload: Login
  headers?: any
  AUTH_SECRET?: any

  constructor(payload?: any, headers?: any) {
    this.payload = payload
    this.headers = headers
    this.AUTH_SECRET = process.env.AUTH_SECRET
  }

  async login(payload = this.payload) {
    const { email, nick, password } = payload

    console.log(payload)
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
      const passMatch = await new PasswordCrypt(password, user.password).compare()
      if (!passMatch) throw new AppError('WRONG PASS', StatusCode.BAD_REQUEST);

      const data = {
        data: nick,
        iat: Date.now(),
        exp: Date.now() + exp,
      }
      const token = jwt.sign(data, String(this.AUTH_SECRET))

      console.log(token)

      return { auth: true, token };
    } catch (error: any) {
      throw new AppError(String(error.message), StatusCode.BAD_REQUEST)
    }
  }

  // TODO: AJUSTAR VERIFICACAO DE TOKEN
  async verifyToken(headers = this.headers) {
    const { token } = headers
    console.log(token)
    if (!token) throw new AppError('NO TOKEN PROVIDED', StatusCode.UNAUTHORIZED);

    const verify = jwt.verify(token, this.AUTH_SECRET)

    if (!verify) throw new AppError('FAILED TO AUTH CODE', StatusCode.INTERNAL_SERVER_ERROR)

    console.log(verify)

    return { auth: true, decodedToken: verify }
  }
}
