import { AppError } from "../../helpers";
import { BetService } from "../../services"

describe('[BET GET]', () => {
  beforeAll(async () => {
    await new BetService({
      usersId: "62a85fab4388090db5a93b45",
      gameId: "62a8c454a07d46691ace262a",
      bet: 24,
      value: "100",
      nick: "teste"
    }).create()
  });

  it('GET BET WITH GAMEID ', async () => {
    const bet = await new BetService({
      gameId: "62a8c454a07d46691ace262a",
      role: 'ADMIN'
    }).get()
    expect(bet).toHaveProperty("bets")
  });

  it('GET BET WITH USERID ', async () => {
    const bet = await new BetService({
      usersId: "62a85fab4388090db5a93b45",
      role: 'ADMIN'
    }).get()
    expect(bet).toHaveProperty("bets")
  });

  it('GET BET WITH FAIL ', async () => {
    try {
      const bet = await new BetService({
        usersId: "41310355",
        role: 'USER'
      }).get()
      expect(bet).toBe(Error)
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError)
    }
  });
})
