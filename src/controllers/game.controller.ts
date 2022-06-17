import {
  StatusCode,
  GamesCreateDTO,
  GamesGetDTO,
  GamesUpdateDTO,
  DefaultMessages,
  GameSortDTO
} from "../types";
import { Request, Response } from 'express';
import { GameService } from "../services";
import { AppError } from "../helpers";

export default class GamesController {

  async get(req: Request, res: Response) {
    const { params: { id }, query } = req;
    try {
      const game = await new GameService({ id, ...query } as GamesGetDTO).get()
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

    if (typeof body.sortDate as string) {
      body.sortDate = new Date(body.sortDate)
    }

    const data = { id, nick, ...body, role }

    try {
      const updatedGame = await new GameService(data as GamesUpdateDTO).update()
      return res.status(StatusCode.OK)
        .send({ data: updatedGame, message: DefaultMessages.GAME_UPDATED })

    } catch (error: any) {
      if (error instanceof AppError) res.status(error.statusCode).json(error.message)
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }

  async sort(req: Request, res: Response) {
    try {
      const { params: { id }, nick, role } = req
      const data = { id, nick, role }
      const numberSorted = await new GameService(data as GameSortDTO).sort()

      return res.status(StatusCode.OK)
        .send({ data: numberSorted })
    } catch (error: any) {
      if (error instanceof AppError) res.status(error.statusCode).json(error.message)
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }

}
