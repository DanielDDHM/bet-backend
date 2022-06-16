import { AppError, } from "../../helpers";
import { AuthService } from "../../services"

describe('[LOGIN TEST]', () => {

  // afterAll(async () => {
  //   const address = await new AddressService({
  //     zipCode: "41310355",
  //     streetNumber: 68
  //   }).create()
  //   const user = await prisma.users.create({
  //     data: {
  //       nick: "teste",
  //       email: "teste@teste.com.br",
  //       password: await new PasswordCrypt("teste").crypt(),
  //       name: "testando",
  //       phone: "71996421369",
  //       addressId: address.id,
  //       isActive: true,
  //       isConfirmed: true,
  //       isStaff: true,
  //     }
  //   })
  //   console.log(user)
  // });

  it('SUCESSFULL LOGIN', async () => {
    const login = await new AuthService(
      {
        nick: "teste",
        email: "teste@teste.com.br",
        password: "teste"
      }
    ).login()
    expect(login).toHaveProperty('auth')
  })


  it('ERROR ON LOGIN', async () => {
    try {
      const login = await new AuthService(
        {
          nick: "teste",
          email: "teste@tes",
          password: "teste"
        }
      ).login()
      expect(login).toBe(Error)
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError)
    }
  })
})
