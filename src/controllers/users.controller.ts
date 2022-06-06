import { StatusCode, UserDeleteDTO } from "../types";
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
    const { params: { id }, body } = req;
    try {
      if (id) { body.id = id }
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
      return res.status(StatusCode.OK).send({ data: userCreated, message: 'USER CREATED' })
    } catch (error: any) {
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }

  async update(req: Request, res: Response) {
    const { params: { id }, body } = req
    try {
      if (!id) throw new AppError('INVALID ID', StatusCode.BAD_REQUEST)
      body.id = id
      const updatedUser = await new UserService(body as UserUpdateDTO).update()
      return res.status(StatusCode.OK).send({ data: updatedUser, message: 'USER UPDATED' })
    } catch (error: any) {
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }

  async delete(req: Request, res: Response) {
    const { params: { id }, body } = req
    try {
      if (!id) throw new AppError('INVALID ID', StatusCode.BAD_REQUEST)
      body.id = id
      const deletedUser = await new UserService(body as UserDeleteDTO).delete()
      return res.status(StatusCode.OK).send(deletedUser)
    } catch (error: any) {
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }

}
