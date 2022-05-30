import axios from 'axios'
import { StatusCode } from '../types'
import AppError from './AppError'

export default class AddressFinder {
  zipCode: string
  constructor(zipCode: string) {
    this.zipCode = zipCode
  }

  async check(zipCode = this.zipCode) {
    try {
      console.log('entrou no finder address')
      const address = await axios.get(`https://viacep.com.br/ws/${zipCode}/json/`)
      if (!address) throw new AppError('API CPF NAO ESTA EM FUNCIONAMENTO', StatusCode.SERVICE_UNAVAILABLE)
      return address
    } catch (error: any) {
      throw new AppError(String(error.message), error.statusCode)
    }
  }
}
