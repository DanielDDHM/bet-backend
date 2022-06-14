import { prisma } from "../../config"
import { AppError } from "../../helpers"
import BetsService from "../../services/bets.service"

describe('[BETS CREATE]', () => {

  it('CREATE BETS WITH SUCCESS', async () => {
    const betCreated = await new BetsService({
      usersId: "62a85fab4388090db5a93b45",
      gameId: "62a8c454a07d46691ace262a",
      bet: 24,
      value: "100",
      nick: "teste"
    }).create()
    expect(betCreated).toHaveProperty("id")
  })

  it('CREATE BETS WITH FAIL', async () => {
    try {
      const betCreated = await new BetsService({
        usersId: "62a85fab4388090db5a93b45",
        gameId: "62a8c454a06691ace262a",
        bet: 24,
        value: "100",
        nick: "teste"
      }).create()
      expect(betCreated).toHaveProperty("id")
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError)
    }
  })

  afterAll(async () => {
    await prisma.bets.deleteMany()
  })
})
