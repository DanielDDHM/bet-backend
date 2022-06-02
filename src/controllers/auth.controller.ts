
import { Request, Response } from 'express';
import { Auth } from '../helpers';
import { StatusCode } from '../types';

export default class AuthController {

  async login(req: Request, res: Response) {
    const { body } = req;
    try {
      const userLogin = await new Auth(body).login()
      return res.status(StatusCode.OK).send(userLogin)
    } catch (error: any) {
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }

  async verifyLogin(req: Request, res: Response) {
    try {
      const token = req.headers['x-access-token'];

      if (!token) return res.status(StatusCode.UNAUTHORIZED)
        .send({ auth: false, message: 'NO TOKEN PROVIDED' });

      const userVerify = await new Auth(null, { token }).verifyToken();

      return userVerify
    } catch (error: any) {
      res.status(Number(error.statusCode)).json(error)
    }
  }

  async logout(req: Request, res: Response) {
    try {
      res.status(200).send({ auth: false, token: null });
    } catch (error: any) {
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }
}
