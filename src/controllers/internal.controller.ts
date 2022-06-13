import { Request, Response } from "express"
import { AppError } from "../helpers"
import { BetService, GameService, UserService } from "../services"
import {
  DefaultMessages,
  GamesUpdateDTO,
  GenericDeleteDTO,
  StatusCode,
  UserDeleteDTO,
  UserUpdateDTO
} from "../types"

export class InternalUsersController {

  async update(req: Request, res: Response) {
    const { params: { id }, body, role } = req
    const data = { id, ...body, role }

    try {
      const updatedUser = await new UserService(data as UserUpdateDTO).activateUser()
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
    const { id } = req.params
    try {
      const betDeleted = await new BetService(id as GenericDeleteDTO).delete

      return res.status(StatusCode.OK)
        .send({ data: betDeleted, message: DefaultMessages.BET_DELETED })
    } catch (error: any) {
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }
}

export class InternalGameController {

  async update(req: Request, res: Response) {
    const { params: { id }, body, role } = req
    const data = { id, ...body, role }

    try {
      const updatedGame = await new GameService(data as GamesUpdateDTO).activateGame()
      return res.status(StatusCode.OK)
        .send({ data: updatedGame, message: DefaultMessages.GAME_ACTIVATED })
    } catch (error: any) {
      if (error instanceof AppError) res.status(error.statusCode).json(error.message)
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params
    try {
      const deletedGame = await new GameService(id as GenericDeleteDTO).delete()
      return res.status(StatusCode.OK).send(deletedGame)
    } catch (error: any) {
      if (error instanceof AppError) res.status(error.statusCode).json(error.message)
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }
}
