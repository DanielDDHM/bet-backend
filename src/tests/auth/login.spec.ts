import { AuthService } from "../../services"

describe('[login test]', () => {
  it('Login to return Auth', async () => {
    const login = await new AuthService(
      {
        nick: "picas",
        email: "rolamoles@teste.com.br",
        password: "teste"
      }
    ).login()
    console.log(login)
    expect(login).toHaveProperty('auth')
  })
})
