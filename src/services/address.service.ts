import { AddressFinder, AppError } from "../helpers";
import { prisma } from "../config";
import {
  GetAddressDTO,
  CreateAddressDTO,
  UpdateAddressDTO,
  StatusCode
} from "../types";
import {
  getAddressValidation,
  createAddressValidation,
  updateAddressValidation
} from "../validations";

export default class AddressService {
  params: GetAddressDTO | CreateAddressDTO | UpdateAddressDTO
  constructor(params: GetAddressDTO | CreateAddressDTO | UpdateAddressDTO) {
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
      return [{ address, message: 'THIS ADDRESS CONSTS IN OUR DATABASE' }]
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

      return [{ addressCreated, message: 'ADDRESS CREATED' }]

    } catch (error: any) {
      if (error instanceof AppError) throw new AppError(String(error.message), error.statusCode)
      throw new AppError(String(error.message), StatusCode.INTERNAL_SERVER_ERROR)
    }
  }

  async update(params = this.params) {
    try {
      const {
        id
      } = updateAddressValidation.parse(params)

      await prisma.address.update({
        where: {
          id
        },
        data: {
          ...params
        }
      })
    } catch (error: any) {
      if (error instanceof AppError) throw new AppError(String(error.message), error.statusCode)
      throw new AppError(String(error.message), StatusCode.INTERNAL_SERVER_ERROR)
    }
  }
}
