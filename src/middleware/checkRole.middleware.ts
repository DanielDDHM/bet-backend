import 'dotenv/config';
import { prisma } from '../config';
import { StatusCode, UserTypes } from '../types';
import { AppError } from '../helpers';
import { Request, Response, NextFunction } from 'express';

export default class CheckRole {
  async checkRole(req: Request, res: Response, next: NextFunction) {
    try {
      const nick = req.nick
      const user = await prisma.users.findUnique({
        where: {
          nick
        }
      })

      if (user?.isActive === true && user?.isConfirmed === true && user?.isStaff === true) {
        req.role = UserTypes.ADMIN;
        return next()
      } else if (user?.isActive === true && user?.isConfirmed === true && !user.isStaff) {
        req.role = UserTypes.USER;
        return next()
      } else {
        throw new AppError('PROBLEM WITH USER', StatusCode.BAD_REQUEST)
      }

    } catch (error: any) {
      if (error instanceof AppError) res.status(error.statusCode).send(error)
      res.status(StatusCode.INTERNAL_SERVER_ERROR).send(error)
    }
  }
}

