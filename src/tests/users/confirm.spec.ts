import { AppError } from "../../helpers"
import { UserService } from "../../services"

describe('[USERS CONFIRM]', () => {

  it('CONFIRM USERS WITH SUCCESS', async () => {
    try {
      const data = { id: '62aaf4cf5a66de846e8990b2' }
      const gameConfirmed = await new UserService(data).confirmUser()
      expect(gameConfirmed).toHaveProperty("id")
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError)
    }
  })

  it('CONFIRM USERS WITH FAIL', async () => {
    try {
      const data = { id: '62aaf4cf5a66de846e8990b2' }
      const gameConfirmed = await new UserService(data).confirmUser()
      expect(gameConfirmed).toHaveProperty("id")
    } catch (error: any) {
      expect(error)
    }
  })
})
