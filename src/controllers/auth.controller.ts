
import { Request, Response } from 'express';
import { AppError, Auth } from '../helpers';
import { StatusCode } from '../types';

export default class AuthController {

  async login(req: Request, res: Response) {
    const { body } = req;
    console.log(body)
    try {
      const userLogin = await new Auth(body).login()
      return res.status(StatusCode.OK).send(userLogin)
    } catch (error: any) {
      if (error instanceof AppError) res.status(error.statusCode).json(error)
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }

  async logout(req: Request, res: Response) {
    try {
      const token = req.headers['x-access-token'];
      const userLogout = await new Auth().logout({ token })
      res.status(StatusCode.OK).send(userLogout);
    } catch (error: any) {
      if (error instanceof AppError) res.status(error.statusCode).send(error)
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }
}
