import { Generator } from "../../helpers"
import { UserService } from "../../services"

describe('[USERS CREATE]', () => {
  jest.setTimeout(15000)

  it('CREATE USERS WITH SUCCESS', async () => {
    const data = {
      name: "confuso",
      nick: new Generator('').makeid(),
      email: new Generator('').makeid() + "@teste.com.br",
      password: "teste",
      phone: "71996421369",
      address: {
        zipCode: "41310355",
        streetNumber: 69
      }
    }

    const userCreated = await new UserService(data).create()
    expect(userCreated).toHaveProperty("id")
  })

  it('CREATE USERS WITH FAIL', async () => {
    try {
      const betCreated = await new UserService({
        name: "confuso",
        nick: 'dsasdasd',
        email: "br",
        password: "teste",
        phone: "71996421369",
        address: {
          zipCode: "41310355",
          streetNumber: 69
        }
      }).create()
      expect(betCreated).toBe(Error)
    } catch (error: any) {
      expect(error)
    }
  })
})
