import { AppError } from "../../helpers"
import { AuthService } from "../../services"

describe('[LOGIN TEST]', () => {
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
