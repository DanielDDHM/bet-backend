import bcrypt from 'bcrypt';
import { StatusCode } from '../types';
import AppError from './AppError';

export default class PasswordCrypt {
  pass: string
  userP?: string
  salt: number

  constructor(pass: string, userP?: string) {
    this.pass = pass
    this.userP = userP
    this.salt = Number(bcrypt.genSalt(7))
  }
  async crypt(userP = this.userP, salt = this.salt) {
    try {
      const encryptPass = await bcrypt.hash(String(userP), salt)
      return encryptPass
    } catch (error) {
      throw new AppError('ERROR ON CRYPT PASSWORD', StatusCode.FAILED_DEPENDENCY)
    }
  }

  // TODO: Ajustar erro de comparacao do password /sempre retornando false/
  async compare(pass = this.pass, userP = this.userP as string) {
    try {
      const comparePass = bcrypt.compareSync(pass, String(userP))
      return comparePass
    } catch (error) {
      throw new AppError('WRONG PASS', StatusCode.NOT_FOUND)
    }
  }

}
