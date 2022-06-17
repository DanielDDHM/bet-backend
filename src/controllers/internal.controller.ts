import { Request, Response } from "express"
import { AppError } from "../helpers"
import { BetService, GameService, UserService } from "../services"
import {
  DefaultMessages,
  GameActivateDTO,
  GenericDeleteDTO,
  StatusCode,
  UserActivateDTO,
  UserDeleteDTO
} from "../types"

export class InternalUsersController {

  async activate(req: Request, res: Response) {
    const { params: { id }, role } = req
    const data = { id, role }

    try {
      const updatedUser = await new UserService(data as UserActivateDTO).activateUser()
      return res.status(StatusCode.OK)
        .send({ data: updatedUser, message: DefaultMessages.USER_ACTIVATED })
    } catch (error: any) {
      if (error instanceof AppError) res.status(error.statusCode).json(error.message)
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }

  async delete(req: Request, res: Response) {
    const { params: { id }, role } = req
    try {
      const deletedUser = await new UserService({ id, role } as UserDeleteDTO).delete()
      return res.status(StatusCode.OK).send(deletedUser)
    } catch (error: any) {
      if (error instanceof AppError) res.status(error.statusCode).json(error.message)
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }
}

export class InternalBetsController {
  async delete(req: Request, res: Response) {
    console.log(req)
    const { params: { id }, role } = req
    try {
      const betDeleted = await new BetService({ id, role } as GenericDeleteDTO).delete()

      return res.status(StatusCode.OK)
        .send({ data: betDeleted, message: DefaultMessages.BET_DELETED })
    } catch (error: any) {
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }
}

export class InternalGameController {

  async activate(req: Request, res: Response) {
    const { params: { id }, nick, role } = req
    const data = { id, nick, role }

    try {
      const updatedGame = await new GameService(data as GameActivateDTO).activateGame()
      return res.status(StatusCode.OK)
        .send({ data: updatedGame, message: DefaultMessages.GAME_ACTIVATED })

    } catch (error: any) {
      if (error instanceof AppError) res.status(error.statusCode).json(error.message)
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }

  async delete(req: Request, res: Response) {
    const { params: { id }, nick, role } = req
    try {
      const deletedGame = await new GameService({ id, nick, role } as GenericDeleteDTO).delete()
      return res.status(StatusCode.OK).send(deletedGame)
    } catch (error: any) {
      if (error instanceof AppError) res.status(error.statusCode).json(error.message)
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }
}
