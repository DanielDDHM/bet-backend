import { AppError } from "../helpers";
import { StatusCode } from "../types";
import { prisma } from "../config";
import { GetAddressDTO, CreateAddressDTO } from "../types";
import { getAddressValidation, createAddressValidation } from "../validations";

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
