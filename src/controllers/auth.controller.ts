
import { NextFunction, Request, Response } from 'express';
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

  async verifyLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers['x-access-token'] || req.body;

      if (!token) return res.status(StatusCode.UNAUTHORIZED)
        .send({ auth: false, message: 'NO TOKEN PROVIDED' });

      await new Auth(null, { token }).verifyToken();

      return next()
    } catch (error: any) {
      res.status(Number(error.statusCode)).json(error)
    }
  }

  async logout(req: Request, res: Response) {
    try {
      const { nick } = req.body || req.query;
      const userLogout = await new Auth().logout(nick)
      res.status(StatusCode.OK).send(userLogout);
    } catch (error: any) {
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }
}
