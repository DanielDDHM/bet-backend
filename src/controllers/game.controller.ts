import {
  StatusCode,
  GamesCreateDTO,
  GamesGetDTO,
  GamesUpdateDTO,
  GenericDeleteDTO,
  DefaultMessages
} from "../types";
import { Request, Response } from 'express';
import { GameService } from "../services";

export default class GamesController {

  async get(req: Request, res: Response) {
    const { params } = req;
    try {
      const game = await new GameService(params as GamesGetDTO).get()
      return res.status(StatusCode.OK).send(game)
    } catch (error: any) {

      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }

  async create(req: Request, res: Response) {
    const { body } = req;
    try {
      body.sortDate = new Date(body.sortDate)
      const gameCreated = await new GameService(body as GamesCreateDTO).create()
      return res.status(StatusCode.OK)
        .send({ data: gameCreated, message: DefaultMessages.GAME_CREATED })
    } catch (error: any) {

      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }

  //TODO: Colocar funcao de ativar e desativar game
  async update(req: Request, res: Response) {
    const { params: { id }, body, nick } = req
    if (typeof body.sortDate as string) body.sortDate = new Date(body.sortDate)
    try {
      const updatedGame = await new GameService({ id, nick, ...body } as GamesUpdateDTO).update()
      return res.status(StatusCode.OK)
        .send({ data: updatedGame, message: DefaultMessages.GAME_UPDATED })
    } catch (error: any) {

      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params
    try {
      const deletedGame = await new GameService(id as GenericDeleteDTO).delete()
      return res.status(StatusCode.OK).send(deletedGame)
    } catch (error: any) {

      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }
}
