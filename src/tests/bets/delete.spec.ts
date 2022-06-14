import { prisma } from "../../config"
import { AppError } from "../../helpers"
import { BetService } from "../../services";

describe('[BETS DELETE]', () => {
  beforeAll(async () => {
    await prisma.bets.create({
      data: {
        gameId: "62a8c454a07d46691ace262a",
        usersId: "62a85fab4388090db5a93b45",
        bet: 24,
        value: "100",
      }
    })
  });

  it('DELETE BET WITH SUCCESS', async () => {

    const bet = await prisma.bets.findFirst({
      where: {
        gameId: "62a8c454a07d46691ace262a"
      }
    })

    const betDel = await new BetService({ id: bet?.id, role: 'ADMIN' }).delete()
    expect(betDel).toHaveProperty("message")
  });

  it('GET BET WITH FAIL ', async () => {
    try {
      const bet = await new BetService({
        usersId: "41310355",
        role: 'USER'
      }).delete()
      expect(bet).toBe(Error)
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError)
    }
  });
})
