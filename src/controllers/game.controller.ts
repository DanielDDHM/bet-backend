import {
  StatusCode,
  GamesCreateDTO,
  GamesGetDTO,
  GamesUpdateDTO,
  DefaultMessages
} from "../types";
import { Request, Response } from 'express';
import { GameService } from "../services";
import { AppError } from "../helpers";

export default class GamesController {

  async get(req: Request, res: Response) {
    const { params } = req;
    try {
      const game = await new GameService(params as GamesGetDTO).get()
      return res.status(StatusCode.OK).send(game)
    } catch (error: any) {
      if (error instanceof AppError) res.status(error.statusCode).json(error.message)
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }

  async create(req: Request, res: Response) {
    const { body, nick } = req;
    try {
      body.sortDate = new Date(body.sortDate)
      const gameCreated = await new GameService({ ...body, nick } as GamesCreateDTO).create()
      return res.status(StatusCode.OK)
        .send({ data: gameCreated, message: DefaultMessages.GAME_CREATED })
    } catch (error: any) {
      if (error instanceof AppError) res.status(error.statusCode).json(error.message)
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }

  async update(req: Request, res: Response) {

    const { params: { id }, body, nick, role } = req
    const data = { id, nick, ...body, role }
    if (typeof body.sortDate as string) body.sortDate = new Date(body.sortDate)

    try {
      const updatedGame = await new GameService(data as GamesUpdateDTO).update()
      return res.status(StatusCode.OK)
        .send({ data: updatedGame, message: DefaultMessages.GAME_UPDATED })

    } catch (error: any) {
      if (error instanceof AppError) res.status(error.statusCode).json(error.message)
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }

}
