import { StatusCode } from "../types";
import { Request, Response } from 'express';
import { UserService } from "../services";
import {
  UserCreateDTO,
  UserGetDTO,
  UserUpdateDTO
} from "../types";
import { AppError } from "../helpers";
export default class UsersController {

  async get(req: Request, res: Response) {
    const { params, body } = req;
    const { id } = params
    try {
      if (id) { body.id = params.id }
      const user = await new UserService(body as UserGetDTO).get()
      return res.status(StatusCode.OK).send({ data: user, message: 'USER FINDED' })
    } catch (error) {
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }

  async create(req: Request, res: Response) {
    const { body } = req;
    try {
      const userCreated = await new UserService(body as UserCreateDTO).create()
      console.log(userCreated)
      return res.status(StatusCode.OK).send({ data: userCreated, message: 'USER CREATED' })
    } catch (error: any) {
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }

  async update(req: Request, res: Response) {
    const { params, body } = req
    const { id } = params
    try {
      if (!id) throw new AppError('INVALID ID', StatusCode.BAD_REQUEST)
      body.id = params.id
      const updatedUser = await new UserService(body as UserUpdateDTO).update()
      return res.status(StatusCode.OK).send({ data: updatedUser, message: 'USER UPDATED' })
    } catch (error: any) {
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }
  // TODO: terminar Controllers

  // async patch(req: Request, res: Response) { }

  // async delete(req: Request, res: Response) { }

}
