import AppError from "../../helpers/AppError";
import { StatusCode } from "../../types";
import { Request, Response } from 'express';
import { prisma } from '../../helpers';
export interface CustomRequestBody<T> extends Request {
  body: T
}
export default class CreateService {
  //Atribuindo tipagens
  req: Request
  //Criando Constructor
  constructor(req: Request) {
    this.req = req
  }

  async createService(req: Request, res: Response) {
    try {
      const { body } = req
      return res.status(StatusCode.OK).send(body)
    } catch (error: any) {
      throw new AppError(String(error.messages), StatusCode.INTERNAL_SERVER_ERROR)
    }
  }
}
