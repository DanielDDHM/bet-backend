import { prisma } from "../../config"
import { AppError } from "../../helpers"
import { GameService } from "../../services";

describe('[GAME SORT]', () => {
  afterAll(async () => {
    const game = await prisma.game.create({
      data: {
        name: "teste",
        prize: "10000",
        sortDate: new Date("06/14/2023"),
        ownerId: "62aaf4cf5a66de846e8990b2",
        numbers: 24
      }
    })

    let i = 0;
    while (i <= 5) {
      await prisma.bets.create({
        data: {
          usersId: "62a855d398e56bd3e29691d3",
          bet: 1,
          gameId: game.id,
          value: "100"
        }
      })
      i++
    }
  });

  it('SORT GAME WITH SUCCESS', async () => {

    const game = await prisma.game.findFirst({
      orderBy: {
        createdAt: 'desc'
      }
    })

    const gameSort = await new GameService({ id: game?.id, nick: "teste", role: 'ADMIN' }).sort()
    expect(gameSort).toHaveProperty("winners")
  });

  it('SORT GAME WITH FAIL ', async () => {
    try {
      const game = await prisma.game.findFirst({
        orderBy: {
          createdAt: 'desc'
        }
      })

      const gameSort = await new GameService({ id: game?.id, nick: "tetttt", role: 'USER' }).sort()
      expect(gameSort).toBe(Error)
    } catch (error: any) {
      expect(error)
    }
  });
})
