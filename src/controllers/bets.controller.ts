import {
  StatusCode,
  BetsCreateDTO,
  BetsGetDTO,
  BetsDeleteDTO,
} from "../types";
import { Request, Response } from 'express';
import { BetService } from "../services";
import { AppError } from "../helpers";

export default class BetsController {

  async get(req: Request, res: Response) {
    const { body } = req;
    try {
      const bet = await new BetService(body as BetsGetDTO).get()
      return res.status(StatusCode.OK).send({ data: bet, message: 'BETS' })
    } catch (error: any) {
      if (error instanceof AppError) res.status(error.statusCode).send(error)
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }

  async create(req: Request, res: Response) {
    const { body } = req;
    try {
      const betCreated = await new BetService(body as BetsCreateDTO).create()
      return res.status(StatusCode.OK).send({ data: betCreated, message: 'BET CREATED' })
    } catch (error: any) {
      if (error instanceof AppError) res.status(error.statusCode).send(error)
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params
    try {
      const betDeleted = await new BetService(id as BetsDeleteDTO).delete
      return res.status(StatusCode.OK).send({ data: betDeleted, message: 'BET DELETED' })
    } catch (error: any) {
      if (error instanceof AppError) res.status(error.statusCode).send(error)
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }

}
