import { AppError } from "../../helpers";
import { AddressService } from "../../services"

describe('[ADDRESS GET]', () => {
  beforeAll(async () => {
    await new AddressService({
      zipCode: "41310355",
      streetNumber: 100
    }).create()
  });

  it('GET ADDRESS WITH SUCCESS ', async () => {
    const address = await new AddressService({
      zipCode: "41310355",
      streetNumber: 100
    }).get()
    expect(address).toHaveProperty("id")
  });

  it('GET ADDRESS WITH FAIL ', async () => {
    try {
      const address = await new AddressService({
        zipCode: "41310355",
        streetNumber: 10000
      }).get()
      expect(address).toBe(Error)
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError)
    }
  });
})
