import { StatusCode, UserInterface } from "../types";
import { Request, Response } from 'express';
import { UserService } from "../services";

export default class UsersController {
  async create(req: Request, res: Response) {
    const { body } = req;
    try {
      const userCreated = await new UserService(body as UserInterface).createService()
      return res.status(StatusCode.OK).send({ data: [userCreated], message: 'USER_CREATED' })
    } catch (error: any) {
      res.status(Number(error.statusCode)).json(error)
    }
  }

  // async update(req: Request, res: Response) { }

  // async patch(req: Request, res: Response) { }

  // async delete(req: Request, res: Response) { }

  // async get(req: Request, res: Response) { }
}
