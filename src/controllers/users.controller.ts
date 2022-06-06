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
      if (error instanceof AppError) res.status(error.statusCode).send(error)
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }

  async create(req: Request, res: Response) {
    const { body } = req;
    try {
      const userCreated = await new UserService(body as UserCreateDTO).create()
      return res.status(StatusCode.OK).send({ data: userCreated, message: 'USER CREATED' })
    } catch (error: any) {
      if (error instanceof AppError) res.status(error.statusCode).send(error)
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }

  async update(req: Request, res: Response) {
    const { params: { id }, body } = req
    if (!id) throw new AppError('INVALID ID', StatusCode.BAD_REQUEST)
    const data = { id, ...body }
    try {
      if (req.method === 'PUT') {
        const updatedUser = await new UserService(data as UserUpdateDTO).update()
        return res.status(StatusCode.OK).send({ data: updatedUser, message: 'USER UPDATED' })
      }

      if (req.method === 'PATCH') {
        const confirmedUser = await new UserService(data as UserUpdateDTO).activateUser()
        return res.status(StatusCode.OK).send({ data: confirmedUser, message: 'USER CONFIRMED' })
      }

    } catch (error: any) {
      if (error instanceof AppError) res.status(error.statusCode).send(error)
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }

  async delete(req: Request, res: Response) {
    const { params: { id }, body } = req
    if (!id) throw new AppError('INVALID ID', StatusCode.BAD_REQUEST)
    body.id = id

    try {
      const deletedUser = await new UserService(body as UserDeleteDTO).delete()
      return res.status(StatusCode.OK).send(deletedUser)
    } catch (error: any) {
      if (error instanceof AppError) res.status(error.statusCode).send(error)
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }

}
