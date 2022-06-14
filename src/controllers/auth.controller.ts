
import { Request, Response } from 'express';
import { AuthService } from '../services';
import { Login, StatusCode } from '../types';

export default class AuthController {

  async login(req: Request, res: Response) {
    const { body } = req;
    try {
      const userLogin = await new AuthService({ ...body } as Login).login()
      return res.status(StatusCode.OK).send(userLogin)
    } catch (error: any) {
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }

  async logout(req: Request, res: Response) {
    try {
      const token = req.headers['x-access-token'];
      const userLogout = await new AuthService().logout(token)
      res.status(StatusCode.OK).send(userLogout);
    } catch (error: any) {
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }
}
