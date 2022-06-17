import { AppError } from "../../helpers";
import { GameService } from "../../services";

describe('[GAME GET]', () => {

  it('GET ALL GAMES', async () => {
    const game = await new GameService({}).get()
    expect(game).toHaveProperty("games")
  });

  it('GET GAME WITH ID ', async () => {
    const game = await new GameService({
      id: "62ac712d60a2196f5420e14f",
    }).get()
    expect(game).toHaveProperty("id")
  });

  it('GET GAME WITH FAIL ', async () => {
    try {
      const bet = await new GameService({
        id: "41310355",
      }).get()
      expect(bet).toBe(Error)
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError)
    }
  });
})
