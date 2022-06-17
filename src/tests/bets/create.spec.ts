import { AppError } from "../../helpers"
import BetsService from "../../services/bets.service"

describe('[BETS CREATE]', () => {

  it('CREATE BETS WITH SUCCESS', async () => {
    const betCreated = await new BetsService({
      usersId: "62aaf4cf5a66de846e8990b2",
      gameId: "62ac712d60a2196f5420e14f",
      bet: 24,
      value: "100",
      nick: "teste"
    }).create()
    expect(betCreated).toHaveProperty("id")
  })

  it('CREATE BETS WITH FAIL', async () => {
    try {
      const betCreated = await new BetsService({
        usersId: "62aaf4cf5a66de846e8990b2",
        gameId: "62ac712d60a2196f5420e14f",
        bet: 24,
        value: "100",
        nick: "teste"
      }).create()
      expect(betCreated).toHaveProperty("id")
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError)
    }
  })
})
