import { prisma } from "../../config"
import { AppError } from "../../helpers"
import { BetService } from "../../services";

describe('[BETS DELETE]', () => {
  afterAll(async () => {
    await prisma.bets.create({
      data: {
        gameId: "62aaf673c02eb14dcbfe0cde",
        usersId: "62aaf4cf5a66de846e8990b2",
        bet: 24,
        value: "100",
      }
    })
  });

  it('DELETE BET WITH SUCCESS', async () => {

    const bet = await prisma.bets.findFirst({
      where: {
        gameId: "62aaf673c02eb14dcbfe0cde"
      },
      orderBy: {
        createdAt: 'asc'
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
