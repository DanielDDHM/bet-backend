import { StatusCode } from "../types";
import { Request, Response } from 'express';
// import { BetsInterface } from "../types";

export default class BetsController {
  async create(req: Request, res: Response) {
    console.log(`entrou no create`)
    const { body } = req;
    try {
      console.log(body)
    } catch (error) {
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json(error)
    }
  }
  // TODO: terminar Controllers
  // async update(req: Request, res: Response) { }

  // async patch(req: Request, res: Response) { }

  // async delete(req: Request, res: Response) { }

  // async get(req: Request, res: Response) { }
}
