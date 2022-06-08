import 'dotenv/config';
import { prisma } from '../config';
import { AppError } from '../helpers';
import { Request, Response, NextFunction } from 'express';
import { DefaultMessages, StatusCode, UserTypes } from '../types';
export default class CheckRole {

  async checkRole(req: Request, res: Response, next: NextFunction) {
    try {
      const nick = req.nick
      const user = await prisma.users.findUnique({
        where: { nick }
      })

      if (user?.isActive === true && user?.isConfirmed === true) {
        if (user.isStaff === true) {
          req.role = UserTypes.ADMIN;
          return next();
        }
        else if (user.isStaff === false) {
          req.role = UserTypes.USER;
          return next();
        }
        else {
          throw new AppError(`${DefaultMessages.NOT_PERMITED}`, StatusCode.BAD_REQUEST)
        }
      }
      else {
        let problem;
        user?.isActive === false ? problem = DefaultMessages.USER_NOT_ACTIVE :
          user?.isConfirmed === false ? problem = DefaultMessages.USER_NOT_CONFIRMED :
            problem = DefaultMessages.USER_NOT_SAME;

        throw new AppError(`${DefaultMessages.USER_PROBLEM}: ${problem}`, StatusCode.BAD_REQUEST)
      }

    } catch (error: any) {
      if (error instanceof AppError) res.status(error.statusCode).send(error)
      res.status(StatusCode.INTERNAL_SERVER_ERROR).send(error)
    }
  }
}

