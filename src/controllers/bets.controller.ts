import {
  StatusCode,
  BetsCreateDTO,
  BetsGetDTO,
  DefaultMessages,
} from "../types";
import { Request, Response } from 'express';
import { BetService } from "../services";
import { AppError } from "../helpers";

export default class BetsController {

  async get(req: Request, res: Response) {
    const { query: { usersId, gameId, page, perPage }, role } = req;
    const data = {
      usersId,
      gameId,
      page: page ? Number(page) : page,
      perPage: perPage ? Number(perPage) : perPage,
    }
    console.log(data)
    try {
      const bet = await new BetService({ ...data, role } as BetsGetDTO).get()

      return res.status(StatusCode.OK)
        .send({ data: bet, message: DefaultMessages.BET_FIND })
    } catch (error: any) {
      if (error instanceof AppError) res.status(error.statusCode).json(error.message)
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }

  async create(req: Request, res: Response) {
    const { body, nick } = req;
    try {
      const betCreated = await new BetService({ ...body, nick } as BetsCreateDTO).create()

      return res.status(StatusCode.OK)
        .send({ data: betCreated, message: DefaultMessages.BET_CREATED })
    } catch (error: any) {
      if (error instanceof AppError) res.status(error.statusCode).json(error.message)
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }

}
