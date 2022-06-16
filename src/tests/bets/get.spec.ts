import { AppError } from "../../helpers";
import { BetService } from "../../services"

describe('[BET GET]', () => {
  beforeAll(async () => {
    await new BetService({
      usersId: "62aaf4cf5a66de846e8990b2",
      gameId: "62aaf673c02eb14dcbfe0cde",
      bet: 24,
      value: "100",
      nick: "teste"
    }).create()
  });

  it('GET ALL BET WITH GAMEID ', async () => {
    const bet = await new BetService({
      gameId: "62aaf673c02eb14dcbfe0cde",
      role: 'ADMIN'
    }).get()
    expect(bet).toHaveProperty("bets")
  });

  it('GET ALL BET WITH USERID ', async () => {
    const bet = await new BetService({
      usersId: "62aaf4cf5a66de846e8990b2",
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
