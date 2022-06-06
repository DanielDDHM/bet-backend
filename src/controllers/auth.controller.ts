
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
      const nick = req.headers['x-access-nick'] || req.body || req.query

      if (!token) return res.status(StatusCode.UNAUTHORIZED)
        .send({ auth: false, message: 'NO TOKEN PROVIDED' });

      const auth = await new Auth(null, { token }).verifyToken();

      if (auth?.decodedToken?.data != nick) {
        res.status(StatusCode.BAD_REQUEST).send('THIS IS NOT YOUR CODE')
      }

      return next()
    } catch (error: any) {
      res.status(Number(error.statusCode)).json(error)
    }
  }

  async logout(req: Request, res: Response) {
    try {
      const token = req.headers['x-access-token'] || req.body;
      const userLogout = await new Auth().logout({ token })
      res.status(StatusCode.OK).send(userLogout);
    } catch (error: any) {
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }

  async checkRole(req: Request, res: Response, next: NextFunction) {
    try {
      const nick = req.headers['x-access-nick'];
      const role = await new Auth().checkRole(nick);
      return next()
    } catch (error: any) {
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }
}
