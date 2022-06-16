import bcrypt from 'bcryptjs';
import { StatusCode } from '../types';
import AppError from './appError';

export default class PasswordCrypt {
  pass: string
  userP?: string
  salt: number

  constructor(pass: string, userP?: string) {
    this.pass = pass
    this.userP = userP
    this.salt = 10
  }
  async crypt(pass = this.pass, salt = this.salt) {
    try {
      const encryptPass = await bcrypt.hash(String(pass), salt)
      return encryptPass
    } catch (error) {
      throw new AppError('ERROR ON CRYPT PASSWORD', StatusCode.FAILED_DEPENDENCY)
    }
  }

  async compare(pass = this.pass, userP = this.userP) {
    try {
      const comparePass = await bcrypt.compare(pass, String(userP))
      return comparePass
    } catch (error: any) {
      throw new AppError(String(error.message), StatusCode.INTERNAL_SERVER_ERROR)
    }
  }

}
