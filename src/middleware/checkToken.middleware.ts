import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { prisma } from '../config';
import { StatusCode } from '../types';
import { AppError } from '../helpers';
import { Request, Response, NextFunction } from 'express';

export default class AuthUserMiddleware {
  async verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token = String(req.headers['x-access-token'])
      if (!token) throw new AppError('NO TOKEN PROVIDED', StatusCode.UNAUTHORIZED);

      const tokenOnDb = await prisma.token.findUnique({
        where: {
          token
        }
      })

      if (!tokenOnDb) throw new AppError('INVALID TOKEN', StatusCode.BAD_REQUEST);
      const verify = jwt.verify(token, String(process.env.AUTH_SECRET))

      if (verify) {
        req.nick = verify?.data
        return next()
      }

    } catch (error: any) {
      res.status(error.statusCode).send(error)
    }
  }
}

