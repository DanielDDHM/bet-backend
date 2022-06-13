import { Request, Response } from 'express';
import { AppError } from '../helpers';
import { UserService } from "../services";
import {
  UserCreateDTO,
  UserGetDTO,
  UserUpdateDTO,
  StatusCode,
  DefaultMessages,
  CrudOperations
} from "../types";
export default class UsersController {

  async get(req: Request, res: Response) {
    const { params: { id }, body, role, query } = req;
    const data = { id, role, ...body, ...query }
    try {
      const user = await new UserService(data as UserGetDTO).get()
      return res.status(StatusCode.OK).send({ data: user, message: DefaultMessages.USER_FIND })
    } catch (error) {
      if (error instanceof AppError) res.status(error.statusCode).json(error.message)
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }

  async create(req: Request, res: Response) {
    const { body } = req;
    try {
      const userCreated = await new UserService(body as UserCreateDTO).create()
      return res.status(StatusCode.OK).send({ data: userCreated, message: DefaultMessages.USER_CREATED })
    } catch (error: any) {
      if (error instanceof AppError) res.status(error.statusCode).json(error.message)
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }

  async update(req: Request, res: Response) {
    const { params: { id }, body, role } = req
    const data = { id, ...body, role }

    try {
      if (req.method === CrudOperations.PUT) {
        const updatedUser = await new UserService(data as UserUpdateDTO).update()
        return res.status(StatusCode.OK)
          .send({ data: updatedUser, message: DefaultMessages.USER_UPDATED })
      }

      if (req.method === CrudOperations.PATCH) {
        const confirmedUser = await new UserService({ id } as UserUpdateDTO).confirmUser()
        return res.status(StatusCode.OK)
          .send({ data: confirmedUser, message: DefaultMessages.USER_CONFIRMED })
      }

    } catch (error: any) {
      if (error instanceof AppError) res.status(error.statusCode).json(error.message)
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }

}
