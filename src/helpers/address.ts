import axios from 'axios'
import { DefaultMessages, StatusCode } from '../types'
import AppError from './apperror.exception'

export default class AddressFinder {
  zipCode: string
  constructor(zipCode: string) {
    this.zipCode = zipCode
  }

  async check(zipCode = this.zipCode) {
    try {
      const address = await axios.get(`https://viacep.com.br/ws/${zipCode}/json/`)
      if (!address) throw new AppError(DefaultMessages.CPF_API_NOT_WORKING,
        StatusCode.SERVICE_UNAVAILABLE)
      return address
    } catch (error: any) {
      throw new AppError(String(error.message), error.statusCode)
    }
  }
}
