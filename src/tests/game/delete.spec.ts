import { prisma } from "../../config"
import { AppError } from "../../helpers"
import { GameService } from "../../services";

describe('[GAME DELETE]', () => {
  afterAll(async () => {
    await prisma.game.create({
      data: {
        name: "teste",
        prize: "10000",
        sortDate: new Date("06/14/2023"),
        ownerId: "62aaf4cf5a66de846e8990b2",
        numbers: 24
      }
    })
  });

  it('DELETE GAME WITH SUCCESS', async () => {

    const game = await prisma.game.findFirst({
      orderBy: {
        createdAt: 'desc'
      }
    })

    const gameDel = await new GameService({ id: game?.id, nick: "teste", role: 'ADMIN' }).delete()
    expect(gameDel).toHaveProperty("message")
  });

  it('DELETE GAME WITH FAIL ', async () => {
    try {
      const game = await new GameService({ id: "sdasdasd", nick: "teste", role: 'ADMIN' }).delete()
      expect(game).toBe(Error)
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError)
    }
  });
})
