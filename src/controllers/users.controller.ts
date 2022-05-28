import { StatusCode } from "../types";
import { Request, Response } from 'express';
import { UserService } from "../services";
import {
  UserCreateDTO,
  UserGetDTO
} from "../types";
export default class UsersController {

  async get(req: Request, res: Response) {
    const { params, body } = req;
    const { id } = params
    try {
      if (id) { body.id = params.id }
      const user = await new UserService(body as UserGetDTO).get()
      return res.status(StatusCode.OK).send(user)
    } catch (error) {
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }

  async create(req: Request, res: Response) {
    const { body } = req;
    try {
      const userCreated = await new UserService(body as UserCreateDTO).create()
      console.log(userCreated)
      return res.status(StatusCode.OK).send({ data: userCreated, message: 'USER_CREATED' })
    } catch (error: any) {
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }

  // TODO: terminar Controllers
  // async update(req: Request, res: Response) { }

  // async patch(req: Request, res: Response) { }

  // async delete(req: Request, res: Response) { }

}
