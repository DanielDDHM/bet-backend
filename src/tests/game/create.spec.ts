import { AppError } from "../../helpers"
import { GameService } from "../../services"
import { UserTypes } from "../../types"

describe('[GAMES CREATE]', () => {

  it('CREATE GAMES WITH SUCCESS', async () => {
    const data = {
      name: "teste",
      prize: "10000",
      sortDate: new Date("06/14/2023"),
      ownerId: "62aaf4cf5a66de846e8990b2",
      numbers: 24,
      nick: 'teste'
    }
    const gameCreated = await new GameService(data).create()
    expect(gameCreated).toHaveProperty("id")
  })

  it('CREATE BETS WITH FAIL', async () => {
    try {
      const betCreated = await new GameService({
        name: "teste",
        prize: "10000",
        sortDate: new Date("06/14/2023"),
        ownerId: "62aaf4cf5a66de846e8990b2",
        numbers: 24,
        nick: 'tesasdte',
        role: UserTypes.ADMIN
      }).create()
      expect(betCreated).toHaveProperty("id")
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError)
    }
  })
})
