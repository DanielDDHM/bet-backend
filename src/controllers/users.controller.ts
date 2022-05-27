import { StatusCode } from "../types";
import { Request, Response } from 'express';
import { UserService } from "../services";
import { UserCreateDTO, UserDeleteDTO, UserGetDTO, UserPatchDTO, UserUpdateDTO } from "../types";
export default class UsersController {
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

  // async get(req: Request, res: Response) { }
}
