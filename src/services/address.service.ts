import { AddressFinder, AppError } from "../helpers";
import { prisma } from "../config";
import {
  GetAddressDTO,
  CreateAddressDTO,
  StatusCode
} from "../types";
import {
  getAddressValidation,
  createAddressValidation
} from "../validations";

export default class AddressService {
  params: GetAddressDTO | CreateAddressDTO
  constructor(params: GetAddressDTO | CreateAddressDTO) {
    this.params = params
  }

  async get(params = this.params) {
    try {
      const { zipCode, streetNumber } = getAddressValidation.parse(params)
      const address = await prisma.address.findFirst({
        where: {
          zipCode,
          streetNumber
        }
      });
      return address
    } catch (error: any) {
      throw new AppError(String(error.message), StatusCode.INTERNAL_SERVER_ERROR)
    }
  }

  async create(params = this.params) {
    try {
      const {
        zipCode,
        streetNumber
      } = createAddressValidation.parse(params)

      const addressFinded = await new AddressFinder(zipCode).check()
      const { logradouro, bairro, localidade, uf } = addressFinded.data

      const addressCreated = await prisma.address.create({
        data: {
          zipCode,
          streetNumber,
          street: logradouro,
          neighborhood: bairro,
          city: localidade,
          state: uf
        }
      });

      return addressCreated

    } catch (error: any) {
      if (error instanceof AppError) throw new AppError(String(error.message), error.statusCode)
      throw new AppError(String(error.message), StatusCode.INTERNAL_SERVER_ERROR)
    }
  }
}
