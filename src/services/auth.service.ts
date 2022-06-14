import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { prisma } from '../config';
import { StatusCode, Login, DefaultMessages } from '../types';
import { PasswordCrypt, AppError } from '../helpers';
import { LoginValidation } from '../validations';
export default class Auth {
  payload: Login
  headers?: any
  AUTH_SECRET?: string

  constructor(payload?: any, headers?: any) {
    this.payload = payload
    this.headers = headers
    this.AUTH_SECRET = process.env.AUTH_SECRET
  }

  async login(payload = this.payload) {
    const { email, nick, password } = LoginValidation.parse(payload)

    try {
      const user = await prisma.users.findFirst({
        where: {
          OR: [
            { email },
            { nick }
          ]
        }
      })

      if (!user) throw new AppError(DefaultMessages.USER_NOT_EXISTS, StatusCode.NOT_FOUND);

      const passMatch = await new PasswordCrypt(String(password), user.password).compare();

      if (!passMatch || user.email != email) throw new AppError('WRONG DATA', StatusCode.BAD_REQUEST);

      const data = {
        data: { nick, message: DefaultMessages.CURIOSITY },
      }

      const token = jwt.sign(data, String(this.AUTH_SECRET), { expiresIn: '1h' })

      return { auth: true, token };

    } catch (error: any) {
      if (error instanceof AppError) throw new AppError(String(error.message), error.statusCode)
      throw new AppError(String(error.message), StatusCode.INTERNAL_SERVER_ERROR)
    }
  }

  async logout(body: any) {
    try {
      //TODO: implementar invalidacao do token apos login
      return { auth: false, token: null };
    } catch (error: any) {
      throw new AppError(String(error.message), StatusCode.INTERNAL_SERVER_ERROR)
    }
  }
}
