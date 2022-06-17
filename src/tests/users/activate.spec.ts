import { AppError } from "../../helpers"
import { UserService } from "../../services"
import { UserTypes } from "../../types"

describe('[USERS ACTIVATE]', () => {

  it('ACTIVATE USERS WITH SUCCESS', async () => {
    const data = { id: "62aaf4cf5a66de846e8990b2", role: UserTypes.ADMIN }
    const gameActivated = await new UserService(data).activateUser()
    expect(gameActivated).toHaveProperty("id")
  })

  it('ACTIVATE USERS WITH FAIL', async () => {
    try {
      const data = { id: "62aaf4cf5a66de846e8990b2", role: UserTypes.USER }
      const gameActivated = await new UserService(data).activateUser()
      expect(gameActivated).toHaveProperty("id")
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError)
    }
  })
})
