import { prisma } from "../../config"
import { AppError } from "../../helpers"
import { AddressService } from "../../services"

describe('[ADDRESS CREATE]', () => {
  it('CREATE ADDRESS WITH SUCCESS', async () => {
    const address = await new AddressService({
      zipCode: "41310355",
      streetNumber: 100
    }).create()
    expect(address).toHaveProperty("id")
  })

  it('CREATE ADDRESS WITH FAIL', async () => {
    try {
      const address = await new AddressService({
        zipCode: "ABC",
        streetNumber: 100
      }).create()
      expect(address).toBe(Error)
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError)
    }
  })

  afterAll(async () => {
    await prisma.address.deleteMany()
  })
})
