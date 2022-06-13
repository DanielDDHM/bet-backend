import {
  StatusCode,
  BetsCreateDTO,
  BetsGetDTO,
  DefaultMessages,
} from "../types";
import { Request, Response } from 'express';
import { BetService } from "../services";

export default class BetsController {

  async get(req: Request, res: Response) {
    const { body, query } = req;
    try {
      const bet = await new BetService({ ...body, query } as BetsGetDTO).get()

      return res.status(StatusCode.OK)
        .send({ data: bet, message: DefaultMessages.BET_FIND })
    } catch (error: any) {
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }

  async create(req: Request, res: Response) {
    const { body } = req;
    try {
      const betCreated = await new BetService(body as BetsCreateDTO).create()

      return res.status(StatusCode.OK)
        .send({ data: betCreated, message: DefaultMessages.BET_CREATED })
    } catch (error: any) {
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }

}
