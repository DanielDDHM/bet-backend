import { AppError } from "../helpers";
import { StatusCode } from "../types";
import { prisma } from "../config";

export default class AddressService {
  params: any
  constructor(params: any) {
    this.params = params
  }

  async get(params = this.params) {
    const { zipCode, streetNumber } = params
    try {
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
}
