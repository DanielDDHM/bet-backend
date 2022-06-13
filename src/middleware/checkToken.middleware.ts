import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { DefaultMessages, StatusCode } from '../types';
import { AppError } from '../helpers';
import { Request, Response, NextFunction } from 'express';

export default class AuthUserMiddleware {
  async verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token = String(req.headers['x-access-token'])
      if (!token) throw new AppError(DefaultMessages.MISSING_TOKEN, StatusCode.UNAUTHORIZED);

      const verify = jwt.verify(token, String(process.env.AUTH_SECRET))
      console.log(verify)

      if (verify) {
        req.nick = verify?.data
        return next()
      }

    } catch (error: any) {
      res.status(error.statusCode).send(error)
    }
  }
}

