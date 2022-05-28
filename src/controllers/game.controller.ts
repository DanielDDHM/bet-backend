import {
  StatusCode,
  GamesCreateDTO,
  GamesGetDTO
} from "../types";
import { Request, Response } from 'express';
import { GameService } from "../services";

export default class GamesController {

  async get(req: Request, res: Response) {
    const { params } = req;
    console.log(params)
    try {
      const game = await new GameService(params as GamesGetDTO).get()
      return res.status(StatusCode.OK).send(game)
    } catch (error: any) {
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }

  async create(req: Request, res: Response) {
    const { body, query: { id } } = req;
    try {

      // Auxiliar if to manage body of request
      if (id) body.ownerId = id;
      if (typeof body.sortDate as string) body.sortDate = new Date(body.sortDate)


      const gameCreated = await new GameService(body as GamesCreateDTO).create()
      return res.status(StatusCode.OK).send({ data: gameCreated, message: 'GAME CREATED' })
    } catch (error: any) {
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }
  // TODO: terminar Controllers
  // async update(req: Request, res: Response) { }

  // async patch(req: Request, res: Response) { }

  // async delete(req: Request, res: Response) { }
}
