import { AuthService } from "../../services"

describe('[LOGIN TEST]', () => {
  it('SUCESSFULL LOGIN', async () => {
    const login = await new AuthService(
      {
        nick: "picas",
        email: "rolamoles@teste.com.br",
        password: "teste"
      }
    ).login()
    expect(login).toHaveProperty('auth')
  })
})
