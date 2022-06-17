import { AppError } from "../../helpers"
import { GameService } from "../../services"
import { UserTypes } from "../../types"

describe('[GAMES ACTIVATE]', () => {

  it('ACTIVATE GAMES WITH SUCCESS', async () => {
    const data = { id: "62ac712d60a2196f5420e14f", nick: "teste", role: UserTypes.ADMIN }
    const gameActivated = await new GameService(data).activateGame()
    expect(gameActivated).toHaveProperty("id")
  })

  it('CREATE BETS WITH FAIL', async () => {
    try {
      const data = { id: "62ac712d60a2196f5420e14f", role: UserTypes.USER }
      const gameActivated = await new GameService(data).activateGame()
      expect(gameActivated).toHaveProperty("id")
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError)
    }
  })
})
