import { Request, Response } from 'express';
import { UserService } from "../services";
import {
  UserCreateDTO,
  UserGetDTO,
  UserUpdateDTO,
  StatusCode,
  UserDeleteDTO,
  DefaultMessages
} from "../types";
export default class UsersController {

  async get(req: Request, res: Response) {
    const { params: { id }, body, role, query } = req;
    const data = { id, role, ...body, ...query }
    try {
      console.log(data)
      const user = await new UserService(data as UserGetDTO).get()
      return res.status(StatusCode.OK).send({ data: user, message: DefaultMessages.USER_FIND })
    } catch (error) {
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }

  async create(req: Request, res: Response) {
    const { body } = req;
    try {
      const userCreated = await new UserService(body as UserCreateDTO).create()
      return res.status(StatusCode.OK).send({ data: userCreated, message: DefaultMessages.USER_CREATED })
    } catch (error: any) {
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }

  async update(req: Request, res: Response) {
    const { params: { id }, body, role } = req
    const data = { id, ...body, role }
    try {
      if (req.method === 'PUT') {
        const updatedUser = await new UserService(data as UserUpdateDTO).update()
        return res.status(StatusCode.OK)
          .send({ data: updatedUser, message: DefaultMessages.USER_UPDATED })
      }

      if (req.method === 'PATCH') {
        const confirmedUser = await new UserService(data as UserUpdateDTO).activateUser()
        return res.status(StatusCode.OK)
          .send({ data: confirmedUser, message: DefaultMessages.USER_ACTIVATED })
      }

    } catch (error: any) {
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }

  async delete(req: Request, res: Response) {
    const { params: { id }, role } = req
    try {
      const deletedUser = await new UserService({ id, role } as UserDeleteDTO).delete()
      return res.status(StatusCode.OK).send(deletedUser)
    } catch (error: any) {
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }

}
