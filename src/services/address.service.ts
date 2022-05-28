import { AppError } from "../helpers";
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
      if (!address) return null
      return address
    } catch (error: any) {
      throw new AppError(String(error.message), StatusCode.INTERNAL_SERVER_ERROR)
    }
  }

  async create(params = this.params) {
    try {
      const {
        zipCode,
        streetNumber,
        street,
        neighborhood,
        city,
        state,
      } = createAddressValidation.parse(params)

      const addressCreated = await prisma.address.create({
        data: {
          zipCode,
          streetNumber,
          street,
          neighborhood,
          city,
          state,
        }
      });

      return addressCreated
    } catch (error: any) {
      throw new AppError(String(error.message), StatusCode.INTERNAL_SERVER_ERROR)
    }
  }
}
